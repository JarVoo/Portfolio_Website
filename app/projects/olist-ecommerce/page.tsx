import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Olist E-Commerce Project — Jarred Voorneveld",
};

export default function OlistPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/olist-ecommerce/hero.png"
        alt="E-Commerce Project – Olist Brazilian Online Marketplace"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Jul 28, 2024</span>
          <span className="post-tag">E-Commerce</span>
        </div>

        <h1>E-Commerce Project – Olist Brazilian Online Marketplace</h1>

        <h2>Project Overview</h2>
        <p>
          I was excited to find a real-world e-commerce dataset with multiple relatable tables. I was bored of
          working on datasets that didn&apos;t return any value to my learning. I wanted to develop a project that
          hiring managers will see that I can do real-world analysis.
        </p>
        <p>
          The Olist dataset is a very comprehensive public resource. It contains transactional data from a
          Brazilian online marketplace connecting small sellers to customers nationwide. This dataset spans
          September 2016 to October 2018. Its not a large dataset in terms of time, but there are over
          90,000 orders to work with and over 32,000 products being sold by 3000 sellers.
        </p>
        <p>
          Each table captures a different part of the retail lifecycle - from order creation, payments, processing
          and logistics. You can even track delays in delivery, not to mention cancellations. The reviews table
          can be used to observe seller performance.
        </p>
        <p>
          All of this data will be used to analyze revenue trends, customer behaviour, product performance
          and lifecycle, delivery efficiency, cohort retention, drop-off and delivery funnel analysis, customer
          engagement and satisfaction and many more.
        </p>
        <p>
          In this project, I will use MySQL to build a clean analytical model and solve these real-world
          E-Commerce challenges.
        </p>

        <h2>Dataset Schema</h2>
        <p>
          Below is the EER diagram showing the relationships and primary keys of each table. Each of the
          CSV documents were loaded into their own tables in a schema in MySQL and this diagram was
          created using reverse engineering in the software.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/olist-ecommerce/data-schema.png"
          alt="Dataset Schema Diagram"
          style={{ width: "100%", margin: "1.5rem 0" }}
        />

        <p>I then continued with data cleaning and validity checks.</p>
        <ol>
          <li>I ensured primary/foreign keys exist</li>
          <li>All tables date ranges (min, max) were verified - 2016 -&gt; 2018</li>
          <li>610 rows in products table were NULL for product_category_name, these were changed to a string value &apos;unknown&apos;</li>
          <li>I used the translation table to translate all the product_category_name rows.</li>
          <li>Checked for duplicates - no duplicates detected</li>
          <li>All categorical text was standardized using lower and strip to remove any empty spaces.</li>
          <li>I created various flags to check:
            <ul>
              <li>Unrealistically long delivery times</li>
              <li>Undelivered orders - filtering out created, invoiced, processing steps</li>
            </ul>
          </li>
          <li>I added columns for:
            <ul>
              <li>Volume of products for shipping</li>
              <li>Actual Delivery Days - the time it took to go from purchase to delivery to customer.</li>
              <li>Total Item Value = Value + Freight cost</li>
            </ul>
          </li>
          <li>I created a new table - seller performance:
            <ul>
              <li>Measuring the total orders and average review score</li>
              <li>Used to track seller performance</li>
            </ul>
          </li>
        </ol>

        <p>Next I will go through EDA steps to get to know more about this dataset.<br />
        How many unique orders, customers, sellers, and products are there?</p>
        <ul>
          <li>99,441 unique orders</li>
          <li>96,096 unique customers</li>
          <li>3,095 unique sellers</li>
          <li>32,951 unique products</li>
        </ul>

        <p>The datasets time period starts 04 Sept 2016 and ends 17 Oct 2018, just over 2 years of transactional data.</p>

        <h2>Sales &amp; Operations Performance</h2>
        <ul>
          <li>Average cart size - 1.14 items</li>
          <li>Average cart value - 137.75 not including freight</li>
          <li>Average cart freight - 22.82</li>
          <li>Total number of items bought - 112,650</li>
        </ul>

        <table>
          <thead>
            <tr>
              <th>Order Status</th>
              <th>Total Orders</th>
              <th>Perc of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>delivered</td><td>96,478</td><td>97.02%</td></tr>
            <tr><td>unavailable</td><td>609</td><td>0.61%</td></tr>
            <tr><td>shipped</td><td>1,107</td><td>1.11%</td></tr>
            <tr><td>canceled</td><td>625</td><td>0.63%</td></tr>
            <tr><td>invoiced</td><td>314</td><td>0.32%</td></tr>
            <tr><td>processing</td><td>301</td><td>0.30%</td></tr>
            <tr><td>approved</td><td>2</td><td>0.00%</td></tr>
            <tr><td>created</td><td>5</td><td>0.01%</td></tr>
          </tbody>
        </table>

        <p>
          Above is the order status of all the orders with 97% of all orders with the status delivered. In this
          analysis, I will mostly be using the &apos;delivered&apos; status to analyse the performance of the company.
          How many active sellers do we have?
        </p>
        <ul>
          <li>2,970 sellers have sold atleast one product, leaving 125 sellers without a purchase.</li>
        </ul>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/olist-ecommerce/revenue-trend.png"
          alt="Monthly Revenue Trend"
          style={{ width: "100%", margin: "1.5rem 0" }}
        />

        <p>
          Revenue rose steadily from 2016 to mid-2018, peaking around mid-year before dropping sharply -
          likely due to missing or incomplete data rather than actual decline.
        </p>

        <h2>Revenue and Payment Analysis</h2>

        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Total Purchases</th>
              <th>Perc of Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>credit_card</td><td>76,795</td><td>73.92%</td></tr>
            <tr><td>boleto</td><td>19,784</td><td>19.04%</td></tr>
            <tr><td>voucher</td><td>5,775</td><td>5.56%</td></tr>
            <tr><td>debit_card</td><td>1,529</td><td>1.47%</td></tr>
            <tr><td>not_defined</td><td>3</td><td>0.00%</td></tr>
          </tbody>
        </table>

        <ul>
          <li>Credit card payments make up 74% of all payment, with Boleto coming second - Boleto is a popular payment method in Brazil - using barcodes to make payment.</li>
          <li>Not stated in this table - single payments makes up 95.6% of all orders, followed by 2 sequential payments with 2.9%.</li>
        </ul>

        <h2>Delivery and Logistics</h2>
        <p>
          The average delivery time from the order approval stage to the customer delivery stage took 12
          days. How often are orders delivered late (delivered date &gt; estimated date)?
        </p>
        <ul>
          <li>6.84 % of deliveries were late</li>
        </ul>
        <p>Is there a correlation between delivery delay and review score?</p>
        <ul>
          <li>I analyzed the review scores and below review scores categorized by orders with reviews.</li>
          <li>I calculated a Pearson correlation between the review scores and the delivery times and I got
            -0.27 which is due to a medium correlation so maybe this had more to do with quality of
            products or some other factor.</li>
        </ul>

        <table>
          <thead>
            <tr>
              <th>Review Score</th>
              <th>Total Orders with Reviews</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>3,411</td></tr>
            <tr><td>2</td><td>540</td></tr>
            <tr><td>3</td><td>687</td></tr>
            <tr><td>4</td><td>644</td></tr>
            <tr><td>5</td><td>1,046</td></tr>
          </tbody>
        </table>

        <h2>Customer Behavior</h2>
        <p>How many unique customers placed more than one order?</p>
        <ul>
          <li>2,997 customers placed more than one order</li>
        </ul>
        <p>What is the average time between first and second purchase?</p>
        <ul>
          <li>The average time between orders was 92 days</li>
        </ul>
        <p>What is the average customer review score?</p>
        <p>The ADV per customer:</p>
        <ul>
          <li>The AOV per customer is 125.98 BRL</li>
        </ul>
        <p>Below are the top 5 cities with the highest revenue and orders:</p>

        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Orders</th>
              <th>Total Revenue (BRL)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>São Paulo</td><td>17,146</td><td>1,836,014.38</td></tr>
            <tr><td>Rio de Janeiro</td><td>7,487</td><td>943,285.23</td></tr>
            <tr><td>Belo Horizonte</td><td>3,029</td><td>339,753.54</td></tr>
            <tr><td>Brasília</td><td>2,398</td><td>288,942.45</td></tr>
            <tr><td>Curitiba</td><td>1,700</td><td>303,404.59</td></tr>
          </tbody>
        </table>

        <h2>Product Performance</h2>
        <p>Which categories have the highest sales volume and revenue?</p>

        <table>
          <thead>
            <tr>
              <th>Product Category</th>
              <th>Sales Volume</th>
              <th>Total Revenue (BRL)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>health_beauty</td><td>9,299</td><td>1,211,683.81</td></tr>
            <tr><td>watches_gifts</td><td>5,758</td><td>1,151,762.76</td></tr>
            <tr><td>bed_bath_table</td><td>10,788</td><td>1,008,657.68</td></tr>
            <tr><td>sports_leisure</td><td>8,336</td><td>944,482.97</td></tr>
            <tr><td>computers_accessories</td><td>7,549</td><td>877,529.17</td></tr>
          </tbody>
        </table>

        <h2>Executive Summary</h2>
        <p>
          The marketplace shows steady growth and strong logistics efficiency (97% delivered orders, 12-day
          average delivery). Customer satisfaction remains high despite moderate delivery delays. Credit
          cards dominate payments, and São Paulo leads in revenue. Heath &amp; Beauty leads in sales volume
          and revenue. Future optimization lies in improving slow categories and supporting underperforming
          sellers.
        </p>

        <h2>Key Metrics</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Total Orders</td><td>99,441</td><td>Total transactions</td></tr>
            <tr><td>Delivered Orders</td><td>96,478 (97%)</td><td>Successful deliveries</td></tr>
            <tr><td>Average Delivery Time</td><td>12 days</td><td>From approval to customer</td></tr>
            <tr><td>Late Deliveries</td><td>6.84%</td><td>Beyond estimated date</td></tr>
            <tr><td>AOV</td><td>137.75 BRL</td><td>Excluding freight</td></tr>
            <tr><td>Avg Cart Freight</td><td>22.82 BRL</td><td>Avg shipping cost</td></tr>
            <tr><td>Repeat Customers</td><td>2,997 (3%)</td><td>Repeat buyers</td></tr>
            <tr><td>Avg Time Between Orders</td><td>80 days</td><td>Loyalty indicator</td></tr>
            <tr><td>Avg Review Score</td><td>4.09</td><td>Overall satisfaction</td></tr>
          </tbody>
        </table>

        <h2>Business Insights</h2>
        <ul>
          <li>Focus marketing on high-value cities (São Paulo, Rio de Janeiro).</li>
          <li>Investigate long-delivery sellers for performance improvement.</li>
          <li>Explore repeat-buyer incentives to increase retention.</li>
          <li>Continue promoting credit-card payments (fastest clearance).</li>
        </ul>

      </div>
    </>
  );
}
