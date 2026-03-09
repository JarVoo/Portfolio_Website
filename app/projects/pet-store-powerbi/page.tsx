import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Commerce Performance Analysis – Online Pet Store in Power BI — Jarred Voorneveld",
};

export default function PetStorePowerBIPage() {
  return (
    <>
      {/* 1. Hero image */}
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

        {/* 2. Date + tags */}
        <div className="post-meta">
          <span>Sep 4, 2024</span>
          <span>8 min read</span>
          <span className="post-tag">E-Commerce</span>
          <span className="post-tag">Power BI</span>
          <span className="post-tag">Data Analysis</span>
        </div>

        <h1>E-Commerce Performance Analysis in Power BI</h1>

        {/* 3. Links */}
        <p>
          <a href="https://app.powerbi.com/groups/me/reports/e5b67d3c-86ff-4f81-b2ec-026dbcbbe837/61ce4acc7ad3141b2006?experience=power-bi" target="_blank" rel="noopener noreferrer">
            Power BI Dashboard
          </a>
          {" | "}
          <a href="https://github.com/JarVoo/E-Commerce-Sales-Project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>

        {/* 4. Dashboard home screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/dashboard-home.png"
          alt="Whiskique Dashboard – Home page"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1rem 0 1.5rem" }}
        />

        {/* 5. Problem Statement */}
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

        {/* 6. Data Collection and Understanding */}
        <h2>Data Collection and Understanding</h2>
        <p>
          The data was sourced from Whiskique&apos;s internal systems and includes sales transactions,
          product catalogue details, customer records, state mapping, and shipping cost data. Before
          building the report, the data was cleaned and transformed in Power Query and the following
          data model was established:
        </p>

        {/* 7. Data schema tables */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/data-schema.png"
          alt="Whiskique data model – Sales, State, Product, and Customer tables"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          The data model consists of four tables: a central <strong>Sales</strong> fact table linked to
          a <strong>Product</strong> dimension table, a <strong>Customer</strong> dimension table, and a
          <strong> State</strong> mapping table. Relationships were defined in Power BI to enable filtering
          across all pages.
        </p>

        {/* 8. Customer LTV by State */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/customer-ltv.png"
          alt="Customer LTV (avg) by State – horizontal bar chart"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        {/* 9. Total Customers by Region & State */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/customer-region.png"
          alt="Total Customers by Region & State – horizontal bar chart"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Customer lifetime value (LTV) varies significantly by state, with the highest average LTV
          concentrated in larger metropolitan states. The West and Northeast regions account for the
          largest share of total customers, reflecting the urban-skewed distribution of Whiskique&apos;s
          customer base.
        </p>

        {/* 10. Exploratory Data Analysis */}
        <h2>Exploratory Data Analysis</h2>

        {/* 11. EDA quantity + treemap + shipping table */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/eda-quantity-treemap.png"
          alt="Average Quantity by Description, Sum of Sales by Category treemap, and Shipping Cost table"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Food dominates sales by category, followed by Disposables and Electronics. The treemap
          reveals that a small number of SKUs — particularly wet cat food and dog food staples —
          account for the majority of revenue. Average shipping cost per 1,000 miles is highest for
          bulky items such as large pet beds ($20) and dry dog food ($12), highlighting the margin
          pressure on heavy products.
        </p>

        {/* 12. Quantity distribution charts */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/eda-quantity-dist.png"
          alt="% GT Sum of Sales by Quantity and % GT Sum of Total Sales by Total Quantity"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          The quantity distribution analysis shows that the vast majority of orders are for single
          items (quantity = 1), with multi-item orders dropping off sharply above a quantity of 2.
          This pattern informed the design of the What-if shipping cost model, where bulk discounts
          are modelled as a cost multiplier applied at order level.
        </p>

        {/* 13. Executive Summary */}
        <h2>Executive Summary</h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/dashboard-executive.png"
          alt="Whiskique Executive Summary Dashboard"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Total sales across the period were <strong>$1.55M</strong> with an average order value of
          <strong> $427.34K</strong> and a profit margin of <strong>27.50%</strong>. The Executive
          Summary page breaks down total sales by description and category, profit by category, and
          total sales by state — enabling management to identify the highest and lowest performing
          product lines and geographies at a glance.
        </p>

        {/* 14. Shipping Metrics */}
        <h2>Shipping Metrics</h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/dashboard-shipping.png"
          alt="Whiskique Shipping Metrics Dashboard"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Total shipping cost across the period was <strong>$385,149.70</strong>, with a shipping
          difference of <strong>$326,054.50</strong> and a shipping difference of
          <strong> $59,095.20</strong>. The Shipping Metrics page includes a What-if parameter that
          allows management to model the impact of shipping quantity changes on total cost and by
          product — a key input for pricing and fulfilment strategy decisions.
        </p>

        {/* 15. Market Basket Analysis */}
        <h2>Market Basket Analysis</h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/dashboard-market-basket.png"
          alt="Whiskique Market Basket Analysis Dashboard"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          The Market Basket Analysis page identifies which products are most frequently purchased
          together. The combination of purchased items visual shows the top product pairings, enabling
          targeted cross-sell recommendations. Total sales and profit by description are plotted over
          time to show seasonality in purchasing patterns.
        </p>

        {/* 16. What-if quantity table */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/pet-store/whatif-table.png"
          alt="What-if quantity value and cost multiplier table"
          style={{ width: "50%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0", display: "block" }}
        />

        <p>
          The What-if model uses a step-function cost multiplier based on order quantity. Orders of
          1 unit carry the full cost (multiplier = 1.0), while orders of 9 or more benefit from a
          0.4 multiplier — reflecting the economies of scale available through bulk fulfilment. The
          &quot;else&quot; condition applies a 0.3 multiplier for quantities beyond the defined tiers.
        </p>

        {/* 17. Conclusions */}
        <h2>Conclusions</h2>
        <p>
          This project demonstrated how Power BI can be used to build a multi-page, fully interactive
          report that gives an e-commerce business end-to-end visibility into its performance. The
          combination of the Executive Summary, Shipping Metrics, and Market Basket Analysis pages
          provides a comprehensive toolkit for management decision-making.
        </p>
        <p>
          The most actionable finding was the concentration of shipping costs in a small number of
          bulky SKUs — specifically large pet beds and heavy dry dog food. The What-if shipping model
          makes it straightforward for the operations team to model the cost impact of introducing
          minimum order quantities or tiered flat-rate shipping on these lines.
        </p>
      </div>
    </>
  );
}
