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
          Retailers face two costly inventory problems simultaneously, stock that sits unsold tying up cash, and stock that runs out before replenishment arrives losing sales. This project builds a full analytical pipeline to identify which products are affected, quantify the impact, and surface data-driven reorder recommendations. All of this is created in an end-to-end workflow, data is ingested via S3, and stored in Snowflake. The data is transformed in dbt, documentation recorded, and testing procedures put in place to export to Power BI where stockout rates, overstock patterns, inventory turnover, and reorder gaps are visualised in a single operational dashboard.
        </p>
        <p>
          The dataset is sourced from <a href="https://www.kaggle.com/datasets/anirudhchauhan/retail-store-inventory-forecasting-dataset" target="_blank" rel="noopener noreferrer">Kaggle</a> and is composed of synthetic data for a fictitious company. However this data is realistic for analysing and forecasting retail store inventory demand. It contains over 73,000 rows of data across five stores and twenty products.
        </p>

        <h2>Going Beyond the Dataset</h2>
        <p>
          This dataset was published as a machine learning challenge, designed for demand forecasting models, LSTM networks, and dynamic pricing experiments typically explored in Jupyter notebooks.
        </p>
        <p>
          Rather than following that path, I took the same data and built something closer to a production analytics environment. A fully layered data warehouse with RAW, CORE, and MART separation, 39 automated data quality tests, documented models, the kind of infrastructure a real retail analytics team would operate on.
        </p>
        <p>
          The analysis focused not on prediction but on diagnosis, identifying where the inventory system is failing today, why it is failing, and what specific changes would fix it. The findings around reorder point misconfiguration, systematic forecast bias, and replenishment timing are immediately actionable without a single machine learning model.
        </p>
        <p>
          The natural next phase would extend this pipeline with a Python-based demand forecasting layer, replacing the existing forecast column with a model built on actual historical sales patterns, and feeding improved predictions back into the reorder analysis. That work is in progress.
        </p>

        <h2>AI-Assisted Development</h2>
        <p>Claude was used for assistance on this project for:</p>
        <ul>
          <li><strong>Code review</strong> - SQL models were written independently and reviewed for logic errors, analytical correctness, and best practices</li>
          <li><strong>Analytical reasoning</strong> - business logic behind each MART model was reasoned through conversationally before any code was written, ensuring models answered real operational questions</li>
          <li><strong>Documentation</strong> - README structure and writing were developed collaboratively, with all content reflecting genuine project decisions</li>
        </ul>
        <p>
          Claude did not write this project. I asked questions, it flagged errors, explained concepts, and challenged assumptions, functioning as a senior colleague available throughout the build.
        </p>
        <p>
          This reflects how AI tools are used in modern data teams, not as code generators, but as thinking partners that accelerate learning and improve output quality. The ability to work effectively with AI assistants is increasingly a core professional skill, and this project was built with that in mind.
        </p>

        <h2>Problem Statement</h2>
        <p>Let me explain where retailers get caught, too little stock (stockout), and too much stock (overstock):</p>
        <p><strong>Too little stock:</strong></p>
        <ol>
          <li>Lost sales when the customer wants the item, but the shelf is empty, so the customer shops elsewhere.</li>
          <li>When repeat customers who can&apos;t get a repeat order, chooses another company to get their goods.</li>
          <li>When you need to recover the gap in stock, so you pay a higher cost for faster shipping or inflated costs at short notice.</li>
        </ol>
        <p><strong>Too much stock:</strong></p>
        <ol>
          <li>Cash tied up in products that are not moving off the shelf.</li>
          <li>Markdowns and/or discounts needed to clear away this stock.</li>
          <li>If goods are perishable or seasonal, they may need to be thrown away completely, wasting money.</li>
          <li>Storage costs accumulate on slow-moving items.</li>
        </ol>
        <p>
          These two errors often have the same root cause, reorder points and demand forecasts that don&apos;t reflect actual sales patterns. You order too late and run out, or you over-correct and order too much.
        </p>

        <h2>Architecture</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/dbt-lineage.png" alt="dbt Lineage Graph" className="post-img" />
        <p>Data flows through three layers:</p>
        <ul>
          <li><strong>RAW</strong> - source tables loaded directly from S3 into Snowflake via COPY INTO. No transformations applied.</li>
          <li><strong>CORE</strong> - one view per source table. Casts data types, adds boolean flags, and derives basic fields. Built as views so they always reflect current RAW data.</li>
          <li><strong>MART</strong> - aggregated tables built on CORE models. Each mart answers a specific business question and is materialised as a table for query performance.</li>
        </ul>

        <h2>Tech Stack</h2>
        <table>
          <thead>
            <tr><th>Tool</th><th>Purpose</th></tr>
          </thead>
          <tbody>
            <tr><td>Amazon S3</td><td>Cloud storage - raw CSV file landing zone</td></tr>
            <tr><td>Snowflake</td><td>Cloud data warehouse - RAW, CORE, and MART layers</td></tr>
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
            <tr><td><code>fct_purchase_orders</code></td><td>Supplier-facing purchase order records. Contains order and expected receipt dates, quantities ordered, unit cost, total order value, supplier ID, and order status (PENDING or RECEIVED).</td></tr>
          </tbody>
        </table>

        <h3>CORE Layer: Cleaned Source Tables (Views)</h3>
        <table>
          <thead>
            <tr><th>Model</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>core_inventory_snapshot</code></td><td>Cleans and types the raw inventory snapshot. Casts date strings to DATE, integer flags to BOOLEAN, and currency columns to DECIMAL(10,2). Serves as the foundation for inventory health and reorder analysis.</td></tr>
            <tr><td><code>core_daily_sales</code></td><td>Cleans and types the raw sales data. Casts date strings to DATE, holiday promo flag to BOOLEAN, and price/revenue columns to DECIMAL(10,2). Primary source for velocity and turnover analysis.</td></tr>
            <tr><td><code>core_purchase_orders</code></td><td>Cleans and types the raw purchase order data. Adds a derived <code>planned_lead_time</code> column calculated from order and expected receipt dates. Not consumed by any MART model in this project, retained as a foundation for future supplier performance analysis.</td></tr>
          </tbody>
        </table>

        <h3>MART Layer: BI-Ready Aggregated Tables</h3>
        <table>
          <thead>
            <tr><th>Model</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>mart_product_velocity</code></td><td>Classifies products as High or Low Velocity based on average daily units sold relative to the overall product average. Identifies fast and slow movers across the catalogue.</td></tr>
            <tr><td><code>mart_inventory_health</code></td><td>Calculates stockout and overstock rates per product per store as a percentage of total trading days. Surfaces which product-store combinations have the most critical inventory imbalances.</td></tr>
            <tr><td><code>mart_inventory_turnover</code></td><td>Measures how efficiently stock is converted to sales by comparing average daily COGS against average daily inventory value. A ratio below 1.0 indicates stock is not moving fast enough relative to holding costs.</td></tr>
            <tr><td><code>mart_reorder_analysis</code></td><td>Compares current reorder points against data-driven suggestions based on actual average daily demand multiplied by supplier lead time. Also validates demand forecast accuracy against actual sales.</td></tr>
            <tr><td><code>mart_gross_margin</code></td><td>Calculates gross margin per product and classifying products into a 2x2 quadrant combining margin segment and velocity segment. Gross margin calculated as (net_revenue - COGS) / net_revenue * 100.</td></tr>
            <tr><td><code>mart_stockout_revenue_lost</code></td><td>Estimates revenue lost due to stockouts per product per store. Calculated as total_stockout_days * avg_daily_units_sold * avg_unit_price. Note: revenue loss is uniformly distributed across categories due to synthetic data calibration.</td></tr>
            <tr><td><code>mart_overstock_cash_exposure</code></td><td>Estimates cash tied up in excess stock per product per store. Excess stock floored at zero using GREATEST(). Supply status classified using avg_days_of_supply relative to lead_time_days.</td></tr>
            <tr><td><code>mart_store_performance</code></td><td>Stores ranked across five metrics: stockout rate, overstock rate, revenue lost, cash tied up, and inventory turnover. An overall performance score averages the five ranks. Lower score = better performing store.</td></tr>
          </tbody>
        </table>

        <h2>Technical Decisions</h2>

        <h3>1. GREATEST() for cash exposure flooring</h3>
        <p>
          Where avg_closing_stock fell below the reorder point, the excess stock calculation would return a negative value, mathematically correct but operationally meaningless. A negative excess does not represent a problem to solve, it simply means the product is not overstocked. <code>GREATEST(avg_closing_stock - reorder_point, 0)</code> floors the result at zero, ensuring the cash exposure figure only captures genuine overstock and never misrepresents an understocked product as having tied-up capital.
        </p>

        <h3>2. Window functions over subqueries for segmentation</h3>
        <p>
          Velocity, margin, and store ranking classifications were built using window functions rather than subqueries or CTEs with cross joins. Window functions calculate the comparison value in a single pass over the data without materialising intermediate results, making them more efficient and readable at scale.
        </p>

        <h3>3. Views for CORE, tables for MART</h3>
        <p>
          CORE models are materialised as views so they always reflect the latest RAW data without storing redundant copies. MART models are materialised as physical tables because aggregation logic is expensive to recompute on every query, pre-computing and storing results keeps dashboard response times fast.
        </p>

        <h3>4. Important notes on the data</h3>
        <p>This is synthetic data generated with perfect regularity, every product appears on every date at every store with no gaps. This limits what I found:</p>
        <ul>
          <li>days_with_sales is identical for every product</li>
          <li>Revenue loss is uniformly distributed across categories</li>
          <li>Store performance variation is narrow</li>
          <li>Inventory values are calibrated lower than sales volumes, making turnover ratios unrealistically high</li>
        </ul>

        <h2>Key Findings</h2>

        <h3>Finding 1: Reorder Points Are Critically Underset</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-1.png" alt="Reorder Analysis" className="post-img" />
        <p>
          Every product in the catalogue has a current reorder point set far below what actual sales data suggests it should be. The worst case is Casual T-Shirt, currently configured to trigger a reorder at 113 units but based on average daily sales multiplied by supplier lead time, the correct trigger point is 1,943 units. This gap of 1,830 units means that by the time a reorder is placed, there is not enough stock remaining to last through the supplier&apos;s delivery window. Stockouts are structurally inevitable under the current configuration. This is not a product-specific issue, every single product shows a positive reorder gap, indicating a systemic misconfiguration across the entire inventory system.
        </p>

        <h3>Finding 2: Demand Forecasts Systematically Overestimate Sales</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-2.png" alt="Forecast Accuracy" className="post-img" />
        <p>
          Across all 20 products, the demand forecast consistently overestimates actual sales by approximately 3.5%. While a 3.5% deviation may appear minor, the consistency across every product suggests the forecasting inputs or assumptions are uniformly optimistic. In practice this leads to ordering slightly more stock than demand requires, which compounds the overstock problem identified elsewhere in this analysis. A well-calibrated forecast should show deviations distributed around zero, some products over, some under. A one-directional bias across the entire catalogue signals the forecast model needs recalibration and points to the issue of this dataset being synthetic in nature.
        </p>

        <h3>Finding 3: Products Are Simultaneously Overstocked and Experiencing Stockouts</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-3.png" alt="Overstock vs Stockout" className="post-img" />
        <p>
          The most counterintuitive finding in this analysis is that products can be overstocked and stockout at the same time. Canned Tomatoes, for example, is overstocked on 50% of trading days yet still experiences stockouts. Stock arrives in large batches creating a temporary overstock, sells down over time, runs out before the next order arrives, and then the cycle repeats. The root cause is not the reorder quantity but the reorder timing. Products sitting in the high overstock and high stockout quadrant of the scatter plot are the highest priority for replenishment cycle redesign, adjusting order frequency rather than order size.
        </p>

        <h3>Finding 4: Inventory Turnover Is Below Benchmark Across the Catalogue</h3>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/inventory-analysis/finding-4.png" alt="Inventory Turnover" className="post-img" />
        <p>
          Inventory turnover measures how efficiently stock is being converted into sales. A healthy retail operation typically targets a turnover ratio of 4-12x per year. In this dataset, turnover ratios range from 0.72 to 1.25, well below any retail benchmark. This means stock is sitting in the warehouse longer than it should be relative to the value being sold. Action Figure Set and Classic LEGO Set have the lowest turnover at 0.72 and 0.78 respectively, indicating these products tie up the most cash relative to their sales velocity. It is important to note that this finding is partially a consequence of synthetic data calibration, inventory values were generated at a lower scale than sales volumes. In real operational data, this metric would provide a more reliable signal of cash efficiency.
        </p>

        <h3>Finding 5: The Financial Consequence</h3>
        <p>
          Estimated revenue lost to stockouts across all stores totals $2.77M, with a further $20.7M in cash tied up in excess stock, both direct consequences of the reorder misconfiguration identified in this analysis.
        </p>

        <h3>Finding 6: The 2x2 Margin Quadrant</h3>
        <p>
          Cross-referencing margin with velocity reveals that several high-margin products sit in the Low Velocity quadrant, sleeping giants with strong profit potential that promotional intervention could unlock.
        </p>

        <h3>Finding 7: Store Performance Ranking</h3>
        <p>
          Store-level ranking across five operational metrics identifies S002 as the best performing store and S005 as the worst, providing a starting point for targeted operational intervention.
        </p>

        <h2>Recommendations</h2>
        <p>
          Reorder points across all 20 products should be recalculated immediately using actual average daily sales multiplied by supplier lead time. The current configuration is underset across the entire catalogue, with Casual T-Shirt, Organic Oats, and USB-C Hub carrying the largest gaps. Until this is corrected, stockouts are structurally unavoidable regardless of how much stock is ordered, and the financial consequence is real: estimated revenue lost to stockouts totals $2.77M across the dataset period.
        </p>
        <p>
          The demand forecasting model requires recalibration. A consistent 3.5% overestimate across every product is not random error, it is a systematic bias that compounds overstock levels over time. Adjusting the model inputs to reduce this directional bias will improve order accuracy and reduce the $20.7M currently tied up in excess stock across all stores and products.
        </p>
        <p>
          For products simultaneously experiencing high overstock and stockout rates, particularly Canned Tomatoes, Smart Home Speaker, and Dining Table Oak, the solution is not to order more but to order more frequently in smaller batches. The replenishment cycle is the problem, not the volume. Smoother, more consistent deliveries will reduce the boom-and-bust pattern currently driving both metrics in the wrong direction.
        </p>
        <p>
          Cross-referencing gross margin with velocity reveals an additional strategic opportunity. Several high-margin products, including Classic LEGO Set and Building Blocks 100pc sit in the Low Velocity quadrant. These are not dead weight, they are sleeping giants with strong profit potential that targeted promotional intervention could unlock without adding inventory risk.
        </p>
        <p>
          Store-level analysis ranks S002 as the best performing store and S005 as the worst across five operational metrics: stockout rate, overstock rate, revenue lost, cash tied up, and inventory turnover. Rather than applying catalogue-wide fixes uniformly, operational interventions should be prioritised at S005 and S004 where the financial exposure is highest.
        </p>
        <p>
          Finally, the eight products with inventory turnover below 0.85 should be reviewed for promotional intervention. Action Figure Set and Classic LEGO Set are tying up the most cash relative to their sales velocity. Targeted discounting or bundling strategies would accelerate sell-through and improve overall capital efficiency across the catalogue.
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
