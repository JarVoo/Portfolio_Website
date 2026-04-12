import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Retail Inventory Intelligence — Jarred Voorneveld",
};

export default function InventoryAnalysisPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/projects/inventory-analysis/2148767163.jpg" alt="Retail Inventory Intelligence – S3, Snowflake, dbt & Power BI" className="post-hero" style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }} />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Apr 8, 2026</span>
          <span className="post-tag">Operations Analysis</span>
          <span className="post-tag">SQL</span>
          <span className="post-tag">Snowflake</span>
          <span className="post-tag">dbt</span>
          <span className="post-tag">Power BI</span>
        </div>

        <h1>Retail Inventory Intelligence</h1>
        <p><strong>An end-to-end analytics pipeline built on S3, Snowflake, dbt Core, and Power BI to identify stockout risk, overstock patterns, and reorder optimisation opportunities across a 20-product retail catalogue.</strong></p>

        <p>
          <a href="https://github.com/JarVoo/inventory_analysis_project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
          {" | "}
          <a href="/dbt-docs/index.html" target="_blank" rel="noopener noreferrer">
            dbt Documentation
          </a>
        </p>

        <h2>Introduction</h2>
        <p>
          Retailers face two costly inventory problems simultaneously: stock that sits unsold tying up cash, and stock that runs out before replenishment arrives losing sales. This project builds a full analytical pipeline to identify which products are affected, quantify the impact, and surface data-driven reorder recommendations.
        </p>
        <p>
          Data is ingested via S3 and stored in Snowflake. The data is transformed in dbt, documentation recorded, and testing procedures put in place to export to Power BI where stockout rates, overstock patterns, inventory turnover, and reorder gaps are visualised in a single operational dashboard.
        </p>
        <p>
          The dataset is sourced from <a href="https://www.kaggle.com/datasets/anirudhchauhan/retail-store-inventory-forecasting-dataset" target="_blank" rel="noopener noreferrer">Kaggle</a> and is composed of synthetic data for a fictitious company. However it is realistic for analysing and forecasting retail store inventory demand: containing over 73,000 rows across five stores and twenty products.
        </p>

        <h2>Going Beyond the Dataset</h2>
        <p>
          This dataset was published as a machine learning challenge, designed for demand forecasting models, LSTM networks, and dynamic pricing experiments typically explored in Jupyter notebooks.
        </p>
        <p>
          Rather than following that path, I took the same data and built something closer to a production analytics environment: a fully layered data warehouse with RAW, CORE, and MART separation, 39 automated data quality tests, and documented models. The kind of infrastructure a real retail analytics team would operate on.
        </p>
        <p>
          The analysis focused not on prediction but on diagnosis: identifying where the inventory system is failing today, why it is failing, and what specific changes would fix it. The findings around reorder point misconfiguration, systematic forecast bias, and replenishment timing are immediately actionable without a single machine learning model.
        </p>

        <h2>Problem Statement</h2>
        <p>Retailers get caught between two inventory failures:</p>
        <p><strong>Too little stock (stockout):</strong></p>
        <ul>
          <li>Lost sales when the customer wants the item but the shelf is empty</li>
          <li>Repeat customers who can&apos;t get a repeat order choose another company</li>
          <li>Higher costs for faster shipping or inflated prices at short notice to recover the gap</li>
        </ul>
        <p><strong>Too much stock (overstock):</strong></p>
        <ul>
          <li>Cash tied up in products that are not moving off the shelf</li>
          <li>Markdowns and discounts needed to clear away stock</li>
          <li>Perishable or seasonal goods may need to be thrown away completely</li>
          <li>Storage costs accumulate on slow-moving items</li>
        </ul>
        <p>
          These two errors often have the same root cause: reorder points and demand forecasts that don&apos;t reflect actual sales patterns. You order too late and run out, or you over-correct and order too much.
        </p>

        <h2>Architecture</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/dbt-lineage.png" alt="dbt Lineage Graph" className="post-img" />
        <p>Data flows through three layers:</p>
        <ul>
          <li><strong>RAW</strong>: source tables loaded directly from S3 into Snowflake via COPY INTO. No transformations applied.</li>
          <li><strong>CORE</strong>: one view per source table. Casts data types, adds boolean flags, and derives basic fields. Built as views so they always reflect current RAW data.</li>
          <li><strong>MART</strong>: aggregated tables built on CORE models. Each mart answers a specific business question and is materialised as a table for query performance.</li>
        </ul>

        <h2>Tech Stack</h2>
        <table>
          <thead>
            <tr><th>Tool</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>Amazon S3</td><td>Cloud storage: raw CSV file landing zone</td></tr>
            <tr><td>Snowflake</td><td>Cloud data warehouse: RAW, CORE, and MART layers</td></tr>
            <tr><td>dbt Core</td><td>Transformation, testing, and documentation</td></tr>
            <tr><td>Power BI</td><td>Dashboard and visualisation layer</td></tr>
            <tr><td>Git &amp; GitHub</td><td>Version control</td></tr>
          </tbody>
        </table>

        <h2>Data Model</h2>

        <h3>RAW Layer: Source Tables</h3>
        <table>
          <thead>
            <tr><th>Table</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>dim_product_master</code></td><td>Dimension table containing all unique products, their categories, suppliers, unit cost, base price, reorder points, reorder quantities, and supplier lead times.</td></tr>
            <tr><td><code>fct_daily_sales</code></td><td>Daily sales transactions across all stores. Contains transaction ID, date, store, units sold, unit price, discounts applied, weather conditions, seasonality, competitor pricing, gross revenue, and net revenue.</td></tr>
            <tr><td><code>fct_inventory_snapshot</code></td><td>Daily stock level snapshot per product per store. Contains opening and closing stock, units ordered, demand forecast, days of supply, and inventory value.</td></tr>
            <tr><td><code>fct_purchase_orders</code></td><td>Supplier-facing purchase order records. Contains order and expected receipt dates, quantities ordered, unit cost, total order value, supplier ID, and order status.</td></tr>
          </tbody>
        </table>

        <h3>CORE Layer: Cleaned Source Tables (Views)</h3>
        <table>
          <thead>
            <tr><th>Model</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>core_inventory_snapshot</code></td><td>Cleans and types the raw inventory snapshot. Casts date strings to DATE, integer flags to BOOLEAN, and currency columns to DECIMAL(10,2). Foundation for inventory health and reorder analysis.</td></tr>
            <tr><td><code>core_daily_sales</code></td><td>Cleans and types the raw sales data. Casts date strings to DATE, holiday promo flag to BOOLEAN, and price/revenue columns to DECIMAL(10,2). Primary source for velocity and turnover analysis.</td></tr>
            <tr><td><code>core_purchase_orders</code></td><td>Cleans and types the raw purchase order data. Adds a derived planned_lead_time column. Retained as a foundation for future supplier performance analysis.</td></tr>
          </tbody>
        </table>

        <h3>MART Layer: BI-Ready Aggregated Tables</h3>
        <table>
          <thead>
            <tr><th>Model</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>mart_product_velocity</code></td><td>Classifies products as High or Low Velocity based on average daily units sold relative to the overall product average.</td></tr>
            <tr><td><code>mart_inventory_health</code></td><td>Calculates stockout and overstock rates per product per store as a percentage of total trading days.</td></tr>
            <tr><td><code>mart_inventory_turnover</code></td><td>Measures how efficiently stock is converted to sales by comparing average daily COGS against average daily inventory value.</td></tr>
            <tr><td><code>mart_reorder_analysis</code></td><td>Compares current reorder points against data-driven suggestions based on actual average daily demand multiplied by supplier lead time.</td></tr>
          </tbody>
        </table>

        <h2>Key Findings</h2>

        <h3>Finding 1: Reorder Points Are Critically Underset</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-1.png" alt="Reorder Analysis" className="post-img" />
        <p>
          Every product in the catalogue has a current reorder point set far below what actual sales data suggests it should be. The worst case is Casual T-Shirt, currently configured to trigger a reorder at 113 units but based on average daily sales multiplied by supplier lead time, the correct trigger point is 1,943 units: a gap of 1,830 units.
        </p>
        <p>
          This means that by the time a reorder is placed, there is not enough stock remaining to last through the supplier&apos;s delivery window. Stockouts are structurally inevitable under the current configuration. This is not a product-specific issue: every single product shows a positive reorder gap, indicating a systemic misconfiguration across the entire inventory system.
        </p>

        <h3>Finding 2: Demand Forecasts Systematically Overestimate Sales</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-2.png" alt="Forecast Accuracy" className="post-img" />
        <p>
          Across all 20 products, the demand forecast consistently overestimates actual sales by approximately 3.5%. While this may appear minor, the consistency across every product suggests the forecasting inputs or assumptions are uniformly optimistic.
        </p>
        <p>
          In practice this leads to ordering slightly more stock than demand requires, which compounds the overstock problem. A well-calibrated forecast should show deviations distributed around zero: some products over, some under. A one-directional bias across the entire catalogue signals the forecast model needs recalibration.
        </p>

        <h3>Finding 3: Products Are Simultaneously Overstocked and Experiencing Stockouts</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-3.png" alt="Overstock vs Stockout" className="post-img" />
        <p>
          The most counterintuitive finding is that products can be overstocked and stockout at the same time. Canned Tomatoes, for example, is overstocked on 50% of trading days yet still experiences stockouts.
        </p>
        <p>
          Stock arrives in large batches creating a temporary overstock, sells down over time, runs out before the next order arrives, and then the cycle repeats. The root cause is not the reorder quantity but the reorder timing. Products in the high overstock and high stockout quadrant are the highest priority for replenishment cycle redesign: adjusting order frequency rather than order size.
        </p>

        <h3>Finding 4: Inventory Turnover Is Below Benchmark</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-4.png" alt="Inventory Turnover" className="post-img" />
        <p>
          Inventory turnover measures how efficiently stock is being converted into sales. A healthy retail operation typically targets a turnover ratio of 4-12x per year. In this dataset, turnover ratios range from 0.72 to 1.25: well below any retail benchmark.
        </p>
        <p>
          This means stock is sitting in the warehouse longer than it should be relative to the value being sold. Action Figure Set and Classic LEGO Set have the lowest turnover at 0.72 and 0.78 respectively, indicating these products tie up the most cash relative to their sales velocity.
        </p>

        <h2>Recommendations</h2>
        <p>
          Reorder points across all 20 products should be recalculated immediately using actual average daily sales multiplied by supplier lead time. The current configuration is underset across the entire catalogue, with Casual T-Shirt, Organic Oats, and USB-C Hub carrying the largest gaps. Until this is corrected, stockouts are structurally unavoidable regardless of how much stock is ordered.
        </p>
        <p>
          The demand forecasting model requires recalibration. A consistent 3.5% overestimate across every product is not random error: it is a systematic bias that compounds overstock levels over time.
        </p>
        <p>
          For products simultaneously experiencing high overstock and stockout rates: particularly Canned Tomatoes, Smart Home Speaker, and Dining Table Oak: the solution is not to order more but to order more frequently in smaller batches. The replenishment cycle is the problem, not the volume.
        </p>
        <p>
          Finally, the eight products with inventory turnover below 0.85 should be reviewed for promotional intervention. Action Figure Set and Classic LEGO Set are tying up the most cash relative to their sales velocity. Targeted discounting or bundling strategies would accelerate sell-through and improve overall capital efficiency.
        </p>

        <p>
          The full dbt models and documentation are available on{" "}
          <a href="https://github.com/JarVoo/inventory_analysis_project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </div>
    </>
  );
}
