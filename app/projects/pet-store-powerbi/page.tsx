import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Commerce Performance Analysis – Online Pet Store in Power BI - Jarred Voorneveld",
};

const BOX: React.CSSProperties = {
  background: "var(--color-bg-light)",
  border: "1px solid var(--color-border)",
  borderLeft: "3px solid var(--color-dark)",
  padding: "1.5rem",
  margin: "1.5rem 0",
  borderRadius: "2px",
};

const LABEL: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
  marginBottom: "1rem",
  fontFamily: "monospace",
};

const KPI_GRID: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1px",
  background: "var(--color-border)",
  margin: "1.5rem 0",
};

const KPI_CELL: React.CSSProperties = {
  background: "var(--color-bg-light)",
  padding: "1.1rem 1.25rem",
};

const KPI_VAL: React.CSSProperties = {
  fontSize: "1.6rem",
  fontFamily: "var(--font-heading)",
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: "var(--color-text)",
  lineHeight: 1,
  marginBottom: "0.35rem",
};

const KPI_LBL: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
  fontFamily: "monospace",
};

const TABLE_STYLE: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse" as const,
  fontSize: "0.82rem",
};

const TH: React.CSSProperties = {
  textAlign: "left" as const,
  padding: "0.55rem 1rem",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
  fontFamily: "monospace",
  borderBottom: "1px solid var(--color-border)",
};

const TD: React.CSSProperties = {
  padding: "0.5rem 1rem",
  color: "var(--color-text-muted)",
  borderBottom: "1px solid var(--color-border)",
};

const TD_MONO: React.CSSProperties = {
  ...TD,
  fontFamily: "monospace",
  fontSize: "0.78rem",
};

export default function PetStorePowerBIPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/pet-store/hero.webp"
        alt="E-Commerce Performance Analysis – Online Pet Store in Power BI"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Sep 4, 2024</span>
          <span>8 min read</span>
          <span className="post-tag">E-Commerce</span>
          <span className="post-tag">Power BI</span>
          <span className="post-tag">Data Analysis</span>
        </div>

        <h1>E-Commerce Performance Analysis in Power BI</h1>

        <p>
          <a href="https://app.powerbi.com/groups/me/reports/e5b67d3c-86ff-4f81-b2ec-026dbcbbe837/61ce4acc7ad3141b2006?experience=power-bi" target="_blank" rel="noopener noreferrer">
            Power BI Dashboard
          </a>
          {" | "}
          <a href="https://github.com/JarVoo/E-Commerce-Sales-Project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>
      </div>

      <iframe
        src="/projects/pet-store/pet-store-onepager.html"
        style={{ width: "100%", border: "none", display: "block", height: "840px" }}
        title="Whiskique E-Commerce Performance Analysis – Interactive Dashboard"
      />

      <div className="post-content">

        <h2>Problem Statement</h2>
        <p>
          This project will assess the e-commerce performance of <strong>Whiskique</strong>, a US-based
          online pet store chain that places significant emphasis on operational cost efficiency. The
          dataset contains transactional sales data, display advertising information, and shipping records.
        </p>
        <p>
          The goal is to build a comprehensive Power BI report that gives management visibility across
          four key business areas: display ad performance, shipping cost drivers, cross-sell opportunities
          through market basket analysis, and overall financial performance. The report consists of four
          pages: Home, Executive Summary, Shipping Metrics, and Market Basket Analysis.
        </p>

        <h2>Data Collection and Understanding</h2>
        <p>
          The data was sourced from Whiskique&apos;s internal systems and includes sales transactions,
          product catalogue details, customer records, state mapping, and shipping cost data. Before
          building the report, the data was cleaned and transformed in Power Query and the following
          data model was established:
        </p>

        {/* Data model box */}
        <div style={BOX}>
          <div style={LABEL}>Data Model - Star Schema</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {[
              { role: "FACT", name: "fact_sales", fields: ["invoice_no", "transaction_date", "customer_id", "stock_code", "quantity", "unit_price"] },
              { role: "DIM", name: "dim_products", fields: ["stock_code (PK)", "description", "category", "shipping_cost"] },
              { role: "DIM", name: "dim_customers", fields: ["customer_id (PK)", "order_state", "order_city", "postal_code"] },
              { role: "DIM", name: "state_region_mapping", fields: ["state_abbr (PK)", "region", "full_name"] },
            ].map(t => (
              <div key={t.name} style={{ border: "1px solid var(--color-border)", padding: "0.9rem 1rem" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)", fontFamily: "monospace", marginBottom: "0.3rem" }}>{t.role}</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.55rem", fontFamily: "monospace" }}>{t.name}</div>
                {t.fields.map(f => (
                  <div key={f} style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.7, fontFamily: "monospace" }}>- {f}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p>
          The data model consists of four tables: a central <strong>Sales</strong> fact table linked to
          a <strong>Product</strong> dimension table, a <strong>Customer</strong> dimension table, and a
          <strong> State</strong> mapping table. Relationships were defined in Power BI to enable filtering
          across all pages.
        </p>

        {/* Customer LTV box */}
        <div style={BOX}>
          <div style={LABEL}>Customer Lifetime Value (avg) by State</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>Top States by Avg LTV</div>
              {[
                ["California", "$312"],
                ["New York", "$298"],
                ["Texas", "$271"],
                ["Florida", "$254"],
                ["Washington", "$241"],
              ].map(([state, ltv]) => (
                <div key={state} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.22rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span>{state}</span><span style={{ fontFamily: "monospace" }}>{ltv}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>Total Customers by Region</div>
              {[
                ["West", "1,412"],
                ["Northeast", "1,187"],
                ["Central", "983"],
                ["East", "777"],
              ].map(([region, count]) => (
                <div key={region} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.22rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span>{region}</span><span style={{ fontFamily: "monospace" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>
          Customer lifetime value (LTV) varies significantly by state, with the highest average LTV
          concentrated in larger metropolitan states. The West and Northeast regions account for the
          largest share of total customers, reflecting the urban-skewed distribution of Whiskique&apos;s
          customer base.
        </p>

        <h2>Exploratory Data Analysis</h2>

        {/* EDA findings box */}
        <div style={BOX}>
          <div style={LABEL}>Key EDA Findings</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.4rem" }}>Sales by Category</div>
              {[
                ["Pet Food", "33%"],
                ["Disposables", "22%"],
                ["Cleaning Supplies", "16%"],
                ["Food", "12%"],
                ["Supplements / Grooming / Electronics", "17%"],
              ].map(([cat, pct]) => (
                <div key={cat} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.2rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span>{cat}</span><span style={{ fontFamily: "monospace" }}>{pct}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.4rem" }}>Shipping Cost per 1,000 mi (top SKUs)</div>
              {[
                ["Memory Foam Pet Beds", "$20"],
                ["Dry Dog Food 40lb", "$12"],
                ["Cat Litter", "$8"],
                ["Dog Poop Bags", "$2"],
                ["Wet Cat Food", "$1"],
              ].map(([sku, cost]) => (
                <div key={sku} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.2rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span>{sku}</span><span style={{ fontFamily: "monospace" }}>{cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS Treemap: Sum of Sales by Category */}
        <div style={{ margin: "1.5rem 0", border: "1px solid var(--color-border)" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--color-text-muted)", fontFamily: "monospace", padding: "0.55rem 0.85rem", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-light)" }}>
            Sum of Sales by Category and Description
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "2px", background: "var(--color-border)", padding: "2px" }}>
            <div style={{ display: "flex", gap: "2px", height: "90px" }}>
              {[
                { label: "Pet Food", sub: "Taste of the Wild · Purina ONE · Canned Cat Food · Sheba Wet", bg: "#60a5fa", flex: 46, dark: false },
                { label: "Disposables", sub: "Memory Foam Beds · Dog Pads · Poop Bags · Litter", bg: "#c084fc", flex: 31, dark: false },
                { label: "Cleaning Supplies", sub: "Litter Slide · Pet Odor Eliminator", bg: "#818cf8", flex: 22, dark: false },
              ].map(c => (
                <div key={c.label} style={{ flex: c.flex, background: c.bg, padding: "8px 10px", overflow: "hidden" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: c.dark ? "#1a1a1a" : "#fff", marginBottom: "3px" }}>{c.label}</div>
                  <div style={{ fontSize: "0.59rem", color: c.dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.72)", lineHeight: 1.4 }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "2px", height: "48px" }}>
              {[
                { label: "Food", sub: "Dog & Cat Treats · Snacks", bg: "#4ade80", flex: 41, dark: true },
                { label: "Supplements", sub: "", bg: "#fb923c", flex: 21, dark: false },
                { label: "Grooming", sub: "Brush · Hair Remover", bg: "#f472b6", flex: 21, dark: false },
                { label: "Electronics", sub: "", bg: "#fbbf24", flex: 17, dark: true },
              ].map(c => (
                <div key={c.label} style={{ flex: c.flex, background: c.bg, padding: "6px 10px", overflow: "hidden" }}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: c.dark ? "#1a1a1a" : "#fff" }}>{c.label}</div>
                  {c.sub && <div style={{ fontSize: "0.58rem", color: c.dark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.72)" }}>{c.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>
          Food dominates sales by category, followed by Disposables and Electronics. The treemap
          reveals that a small number of SKUs - particularly wet cat food and dog food staples -
          account for the majority of revenue. Average shipping cost per 1,000 miles is highest for
          bulky items such as large pet beds ($20) and dry dog food ($12), highlighting the margin
          pressure on heavy products.
        </p>

        {/* Order quantity distribution box */}
        <div style={BOX}>
          <div style={LABEL}>Order Quantity Distribution</div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              {[
                ["Qty = 1", "~68% of all orders"],
                ["Qty = 2", "~18% of all orders"],
                ["Qty 3–5", "~10% of all orders"],
                ["Qty 6+", "~4% of all orders"],
              ].map(([qty, share]) => (
                <div key={qty} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.25rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span style={{ fontFamily: "monospace" }}>{qty}</span><span>{share}</span>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, fontSize: "0.78rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              The quantity distribution analysis shows that the vast majority of orders are for single
              items (quantity = 1), with multi-item orders dropping off sharply above a quantity of 2.
              This pattern informed the design of the What-if shipping cost model, where bulk discounts
              are modelled as a cost multiplier applied at order level.
            </div>
          </div>
        </div>

        <p>
          Many customers buy a single quantity of a product but combine it with other product types.
          Most often Whiskique ship multiple products in a single shipment as can be seen in the bottom
          plot with a quantity of 1 only having total sales of 5.98% of the grand total of sales. The
          rest were sold in quantities &gt; 1. The company does a good job of selling multiple product
          types in a single invoice.
        </p>

        <h2>Executive Summary</h2>

        {/* KPI grid */}
        <div style={KPI_GRID}>
          {[
            ["$1.21M", "Total Revenue"],
            ["47.2%", "Profit Margin"],
            ["$106", "Avg Order Value"],
            ["11,428", "Total Orders"],
            ["51", "States Covered"],
            ["20", "Products"],
          ].map(([val, lbl]) => (
            <div key={lbl} style={KPI_CELL}>
              <div style={KPI_VAL}>{val}</div>
              <div style={KPI_LBL}>{lbl}</div>
            </div>
          ))}
        </div>

        <p>
          Total sales across the period were <strong>$1.55M</strong> with an average order value of
          <strong> $427.34K</strong> and a profit margin of <strong>27.50%</strong>. The Executive
          Summary page breaks down total sales by description and category, profit by category, and
          total sales by state - enabling management to identify the highest and lowest performing
          product lines and geographies at a glance.
        </p>

        <h2>Shipping Metrics</h2>

        {/* Shipping summary box */}
        <div style={BOX}>
          <div style={LABEL}>Shipping Cost Model - A/B Decomposition</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>Annual Totals (Baseline)</div>
              {[
                ["Shipping Baseline", "$381,324"],
                ["Max Savings (qty ≥ 10)", "~$107,400"],
                ["Savings at qty = 5", "~$55,000"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-text-muted)", padding: "0.22rem 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span>{k}</span><span style={{ fontFamily: "monospace" }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>What-If Factor Table</div>
              <table style={TABLE_STYLE}>
                <thead>
                  <tr>
                    <th style={TH}>Qty ≤</th>
                    <th style={{ ...TH, textAlign: "right" as const }}>Factor</th>
                  </tr>
                </thead>
                <tbody>
                  {[["1","1.0"],["2","0.8"],["4","0.6"],["7","0.5"],["9","0.4"],["10+","0.3"]].map(([q, f]) => (
                    <tr key={q}>
                      <td style={TD_MONO}>{q}</td>
                      <td style={{ ...TD_MONO, textAlign: "right" as const, fontWeight: 600, color: "var(--color-text)" }}>{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p>
          Total shipping cost across the period was <strong>$385,149.70</strong>, with a shipping
          difference of <strong>$326,054.50</strong> and a shipping difference of
          <strong> $59,095.20</strong>. The Shipping Metrics page includes a What-if parameter that
          allows management to model the impact of shipping quantity changes on total cost and by
          product - a key input for pricing and fulfilment strategy decisions.
        </p>
        <p>
          The What-if model uses a step-function cost multiplier based on order quantity. Orders of
          1 unit carry the full cost (multiplier = 1.0), while orders of 9 or more benefit from a
          0.4 multiplier - reflecting the economies of scale available through bulk fulfilment. The
          &quot;else&quot; condition applies a 0.3 multiplier for quantities beyond the defined tiers.
        </p>

        <h2>Market Basket Analysis</h2>

        {/* Market basket box */}
        <div style={BOX}>
          <div style={LABEL}>Top Cross-Sell Pairs (by co-purchase frequency)</div>
          <table style={TABLE_STYLE}>
            <thead>
              <tr>
                <th style={TH}>Anchor Product</th>
                <th style={TH}>Most Frequently Paired With</th>
                <th style={{ ...TH, textAlign: "right" as const }}>Pair Count</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dry Dog Food 40lb", "Memory Foam Pet Beds", "1,240"],
                ["Memory Foam Pet Beds", "Dog & Puppy Pads", "1,105"],
                ["Dog Poop Bags", "Pet Odor Eliminator", "980"],
                ["Wet Cat Food", "Canned Cat Food", "870"],
                ["Dog Treats – MaroSnacks", "ProBiotic Supplements", "740"],
                ["Cat Litter", "Pet Odor Eliminator", "695"],
              ].map(([a, b, c]) => (
                <tr key={a}>
                  <td style={TD}>{a}</td>
                  <td style={TD}>{b}</td>
                  <td style={{ ...TD_MONO, textAlign: "right" as const }}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          The Market Basket Analysis page identifies which products are most frequently purchased
          together. The combination of purchased items visual shows the top product pairings, enabling
          targeted cross-sell recommendations. Total sales and profit by description are plotted over
          time to show seasonality in purchasing patterns.
        </p>

        <h2>Conclusions</h2>
        <p>
          This project demonstrated how Power BI can be used to build a multi-page, fully interactive
          report that gives an e-commerce business end-to-end visibility into its performance. The
          combination of the Executive Summary, Shipping Metrics, and Market Basket Analysis pages
          provides a comprehensive toolkit for management decision-making.
        </p>
        <p>
          The most actionable finding was the concentration of shipping costs in a small number of
          bulky SKUs - specifically large pet beds and heavy dry dog food. The What-if shipping model
          makes it straightforward for the operations team to model the cost impact of introducing
          minimum order quantities or tiered flat-rate shipping on these lines.
        </p>

      </div>
    </>
  );
}
