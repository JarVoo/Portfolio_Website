// Computes per-state shipping A/B data and writes ship-state-data.js
// Formula: Baseline = A + 0.7*B  |  WhatIf(f) = A + f*B
// A = Σ SC per row, B = Σ SC*(Qty-1) for Qty≠1

const fs   = require('fs');
const path = require('path');

function parseCSV(line) {
  const f = []; let cur = '', inQ = false;
  for (const ch of line) {
    if (ch === '"')        { inQ = !inQ; }
    else if (ch === ',' && !inQ) { f.push(cur); cur = ''; }
    else                   cur += ch;
  }
  f.push(cur); return f;
}

// ── state normalisation ─────────────────────────────────────────────────────
const srmLines = fs.readFileSync(path.join(__dirname, 'state_region_mapping.csv'), 'utf8')
  .trim().split('\n');
const stateNorm = {};
srmLines.slice(1).forEach(l => {
  const p = parseCSV(l);
  stateNorm[p[0].trim()] = p[1].trim().toUpperCase();
});

const VALID = new Set([
  'AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI',
  'IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN',
  'MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH',
  'OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA',
  'WI','WV','WY'
]);

function normState(raw) {
  const t = (raw || '').trim();
  return stateNorm[t] || t.toUpperCase();
}

// ── dim_customers: customer_id → state_abbr ────────────────────────────────
const custLines = fs.readFileSync(path.join(__dirname, 'dim_customers.csv'), 'utf8')
  .trim().split('\n');
const custMap = {};
custLines.slice(1).forEach(l => {
  const p = parseCSV(l);
  const id   = p[0].trim();
  const abbr = normState(p[3]);          // Order State column
  if (VALID.has(abbr)) custMap[id] = abbr;
});
console.log('Customers mapped:', Object.keys(custMap).length);

// ── dim_products: stock_code → {sc, desc, cat} ────────────────────────────
const prodLines = fs.readFileSync(path.join(__dirname, 'dim_products.csv'), 'utf8')
  .trim().split('\n');
const prodMap = {};
prodLines.slice(1).forEach(l => {
  const p = parseCSV(l);
  let cat = (p[5] || '').trim().replace(/^"|"$/g, '');
  if (/clean/i.test(cat)) cat = 'Cleaning Supplies'; // fix "Cleanig Supplies" typo
  prodMap[p[0].trim()] = { sc: parseFloat(p[3]), desc: p[4].trim().replace(/^"|"$/g, ''), cat };
});

// canonical category order (matches SHIP_AVG_CAT in HTML)
const CAT_ORDER = ['Pet Food','Cleaning Supplies','Disposables','Food','Supplements','Grooming','Electronics'];

// ── month index: Dec20=0 … Dec21=12 ────────────────────────────────────────
function monthIdx(dateStr) {
  const parts = dateStr.split(' ')[0].split('/');
  const m = parseInt(parts[0]), y = parseInt(parts[2]);
  if (y === 2020 && m === 12) return 0;
  if (y === 2021 && m >= 1 && m <= 12) return m;
  return -1;
}

// ── accumulators ────────────────────────────────────────────────────────────
const stateData = {};
function getSD(st) {
  if (!stateData[st]) stateData[st] = {
    mon_a: new Array(13).fill(0), mon_b: new Array(13).fill(0),
    prod_a: {}, prod_b: {},
    cat_sum: {}, cat_cnt: {}   // for avg qty by category
  };
  return stateData[st];
}
function addRow(sd, sc, desc, cat, qty, mi) {
  sd.prod_a[desc] = (sd.prod_a[desc] || 0) + sc;
  if (qty !== 1) sd.prod_b[desc] = (sd.prod_b[desc] || 0) + sc * (qty - 1);
  if (mi >= 0) {
    sd.mon_a[mi] += sc;
    if (qty !== 1) sd.mon_b[mi] += sc * (qty - 1);
  }
  // avg qty: only count positive quantities (exclude returns)
  if (qty > 0) {
    sd.cat_sum[cat] = (sd.cat_sum[cat] || 0) + qty;
    sd.cat_cnt[cat] = (sd.cat_cnt[cat] || 0) + 1;
  }
}

// ── process fact_sales ───────────────────────────────────────────────────────
const salesLines = fs.readFileSync(path.join(__dirname, 'fact_sales.csv'), 'utf8')
  .trim().split('\n');
let skipped = 0;
salesLines.slice(1).forEach(l => {
  const p      = parseCSV(l);
  const dateS  = p[0].trim();
  const custId = p[1].trim();
  const code   = p[3].trim();
  const qty    = parseInt(p[5]);

  const prod = prodMap[code];
  if (!prod || isNaN(qty)) { skipped++; return; }

  const { sc, desc, cat } = prod;
  const mi    = monthIdx(dateS);
  const state = custMap[custId];

  addRow(getSD('ALL'), sc, desc, cat, qty, mi);
  if (state) addRow(getSD(state), sc, desc, cat, qty, mi);
});
console.log('Skipped rows:', skipped);

// ── product order (ALL baseline desc, top 15) ────────────────────────────────
const allSD = stateData['ALL'];
const PROD_ORDER = Object.keys(allSD.prod_a)
  .map(d => ({ d, bl: (allSD.prod_a[d] || 0) + 0.7 * (allSD.prod_b[d] || 0) }))
  .sort((a, b) => b.bl - a.bl)
  .slice(0, 15)
  .map(x => x.d);
console.log('Product order:\n', PROD_ORDER.map((d,i) => `  ${i+1}. ${d}`).join('\n'));

// ── build output ─────────────────────────────────────────────────────────────
const output = {};
['ALL', ...Array.from(VALID)].forEach(st => {
  const sd = stateData[st];
  if (!sd) return;
  output[st] = {
    ma: sd.mon_a.map(Math.round),
    mb: sd.mon_b.map(Math.round),
    pr: PROD_ORDER.map(d => [Math.round(sd.prod_a[d] || 0), Math.round(sd.prod_b[d] || 0)]),
    ac: CAT_ORDER.map(cat => {
      const sum = sd.cat_sum[cat] || 0, cnt = sd.cat_cnt[cat] || 0;
      return cnt ? parseFloat((sum / cnt).toFixed(2)) : 0;
    })
  };
});

// ── verify ───────────────────────────────────────────────────────────────────
const allBL = output.ALL.ma.reduce((s,a,i) => s + Math.round(a + 0.7*output.ALL.mb[i]), 0);
console.log(`\nALL baseline: $${allBL.toLocaleString()} (expected ~$381,320)`);
const states = Object.keys(output);
console.log('States with data:', states.length, '(expected 52 = ALL + 51 states)');

const f16bl = output.ALL.pr.reduce((s,[a,b])=>s+Math.round(a+0.7*b),0);
const f16wi = output.ALL.pr.reduce((s,[a,b])=>s+Math.round(a+0.3*b),0);
console.log(`WhatIf factor=0.3 (qty>=10): baseline=$${f16bl.toLocaleString()} → whatif=$${f16wi.toLocaleString()}`);

// ── write JS file ─────────────────────────────────────────────────────────────
const js = `window.SHIP_STATE = ${JSON.stringify(output)};\n`;
const outPath = path.join(__dirname, 'ship-state-data.js');
fs.writeFileSync(outPath, js);
const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`\nWritten ship-state-data.js (${kb} KB)`);
