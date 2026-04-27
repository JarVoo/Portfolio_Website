// Computes per-product and per-month A/B components for the DAX shipping formula:
// Baseline = A + 0.7*B  (factor=0.7 for baseline)
// WhatIf(f) = A + f*B   (dynamic factor from slider)
// where A = Σ SC (every row), B = Σ SC*(Q-1) for rows with Q>1

const fs = require('fs');
const path = require('path');

function parseCSV(line) {
  const fields = [];
  let cur = '', inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { fields.push(cur); cur = ''; }
    else cur += ch;
  }
  fields.push(cur);
  return fields;
}

// ── dim_products ──────────────────────────────────────────
const prodLines = fs.readFileSync(path.join(__dirname, 'dim_products.csv'), 'utf8').trim().split('\n');
const prodMap = {}; // StockCode → { sc, desc }
prodLines.slice(1).forEach(line => {
  const p = parseCSV(line);
  const code = p[0].trim();
  const sc   = parseFloat(p[3]);
  // Description may be quoted
  const desc = p[4].trim().replace(/^"|"$/g, '');
  prodMap[code] = { sc, desc };
});

// ── month index ──────────────────────────────────────────
// Dec20=0, Jan21=1, … Dec21=12
function monthIdx(dateStr) {
  const [md, ,] = dateStr.split(' ');
  const parts = md.split('/');
  const m = parseInt(parts[0]), y = parseInt(parts[2]);
  if (y === 2020 && m === 12) return 0;
  if (y === 2021 && m >= 1 && m <= 12) return m;
  return -1;
}

// ── fact_sales ────────────────────────────────────────────
const salesLines = fs.readFileSync(path.join(__dirname, 'fact_sales.csv'), 'utf8').trim().split('\n');

const PROD_A = {}, PROD_B = {};
const MON_A = new Array(13).fill(0), MON_B = new Array(13).fill(0);
let skipped = 0;

salesLines.slice(1).forEach(line => {
  // Transaction Date,Customer ID,Description,Stock Code,Invoice No,Quantity,Sales,Unit Price
  const p = parseCSV(line);
  const dateStr = p[0].trim();
  const desc    = p[2].trim().replace(/^"|"$/g, '');
  const code    = p[3].trim();
  const qty     = parseInt(p[5]);

  const prod = prodMap[code];
  if (!prod || isNaN(qty)) { skipped++; return; }

  const sc = prod.sc;
  const mi = monthIdx(dateStr);

  if (!PROD_A[desc]) { PROD_A[desc] = 0; PROD_B[desc] = 0; }
  PROD_A[desc] += sc;
  if (mi >= 0) MON_A[mi] += sc;

  // All non-unit quantities (including returns Q<0 and Q=0) contribute to B
  if (qty !== 1) {
    const extra = sc * (qty - 1); // negative for returns
    PROD_B[desc] += extra;
    if (mi >= 0) MON_B[mi] += extra;
  }
});

// ── per-product results ───────────────────────────────────
const products = Object.entries(PROD_A).map(([desc, a]) => {
  const b        = PROD_B[desc] || 0;
  const baseline = a + 0.7 * b;
  return { desc, a: Math.round(a), b: Math.round(b), baseline: Math.round(baseline) };
}).sort((x, y) => y.baseline - x.baseline);

console.log('\nTop 20 by baseline:');
products.slice(0, 20).forEach(p =>
  console.log(`  ${p.desc}: baseline=$${p.baseline}  a=${p.a}  b=${p.b}`)
);

const totalBL = products.reduce((s, p) => s + p.baseline, 0);
console.log(`\nTotal baseline: $${totalBL}  (PBI ref: $385,150)`);
console.log(`Skipped rows: ${skipped}`);

// ── monthly results ───────────────────────────────────────
const monthlyBL = MON_A.map((a, i) => Math.round(a + 0.7 * MON_B[i]));
console.log('\nMonthly baseline:');
console.log(monthlyBL.join(', '));
console.log('Monthly A (raw):');
console.log(MON_A.map(Math.round).join(', '));
console.log('Monthly B (extra):');
console.log(MON_B.map(Math.round).join(', '));

// ── blended factor lookup (matches DAX) ──────────────────
// qtyParam → factor
// <=1: 1.0  <=2: 0.8  <=4: 0.6  <=7: 0.5  <=9: 0.4  else: 0.3
function getFactor(q) {
  if (q <= 1) return 1.0;
  if (q <= 2) return 0.8;
  if (q <= 4) return 0.6;
  if (q <= 7) return 0.5;
  if (q <= 9) return 0.4;
  return 0.3;
}

// Verify at qty=16 (factor=0.3)
const f16 = getFactor(16);
const wi16 = products.reduce((s, p) => s + p.a + f16 * p.b, 0);
console.log(`\nWhat-If at qty=16 (factor=0.3): $${Math.round(wi16)}  diff=$${Math.round(totalBL - wi16)}  (PBI: $266,959 / $118,191)`);

// Output JS constants
const top15 = products.slice(0, 15);
const prodConst = `const SHIP_BY_PROD = [\n${top15.map(p =>
  `  {d:${JSON.stringify(p.desc.length > 20 ? p.desc.slice(0,20)+'…' : p.desc)}, a:${p.a}, b:${p.b}}`
).join(',\n')}\n];`;

const monthConst = `const SHIP_MON_A = [${MON_A.map(Math.round).join(',')}];\n` +
                   `const SHIP_MON_B = [${MON_B.map(Math.round).join(',')}];`;

console.log('\n// ── paste into HTML ──────────────────────────────────');
console.log(prodConst);
console.log(monthConst);
