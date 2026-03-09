import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Olist E-Commerce Project — Jarred Voorneveld",
};

export default function OlistPage() {
  return (
    <>
      <div className="post-hero-placeholder">[ Project Header Image ]</div>

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
          I was excited to find a real-world ecommerce dataset with multiple relatable tables. I was bored of
          working on datasets that didn&apos;t seem to add any value to my learning. I wanted to develop skills that
          would directly translate to a real work environment. The Olist dataset provided exactly that — a
          genuine Brazilian ecommerce platform with orders, products, sellers, customers, reviews, and payments.
        </p>

        <h2>Dataset Schema</h2>
        <p>The dataset consisted of 9 relational tables:</p>

        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>Description</th>
              <th>Rows (approx.)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>olist_orders</td><td>Order-level information</td><td>99,441</td></tr>
            <tr><td>olist_order_items</td><td>Items within each order</td><td>112,650</td></tr>
            <tr><td>olist_products</td><td>Product catalog</td><td>32,951</td></tr>
            <tr><td>olist_sellers</td><td>Seller information</td><td>3,095</td></tr>
            <tr><td>olist_customers</td><td>Customer data</td><td>99,441</td></tr>
            <tr><td>olist_order_reviews</td><td>Customer review scores</td><td>99,224</td></tr>
            <tr><td>olist_order_payments</td><td>Payment records</td><td>103,886</td></tr>
            <tr><td>olist_geolocation</td><td>Zip code geolocation</td><td>1,000,163</td></tr>
            <tr><td>product_category_name_translation</td><td>Category name translations (PT → EN)</td><td>71</td></tr>
          </tbody>
        </table>

        <h2>Objectives</h2>
        <ul>
          <li>Understand sales trends and seasonal patterns</li>
          <li>Identify top-performing product categories and sellers</li>
          <li>Analyse customer satisfaction through review scores</li>
          <li>Explore delivery performance and its impact on reviews</li>
          <li>Build summary visualizations to communicate findings</li>
        </ul>

        <h2>Sales Trends</h2>
        <p>
          Monthly order volumes showed strong growth through 2017 and into 2018, with a notable spike in
          November 2017 corresponding to Black Friday. The dataset covers orders from September 2016 through
          August 2018.
        </p>

        <h2>Top Product Categories</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Orders</th>
              <th>Revenue (BRL)</th>
              <th>Avg Review Score</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Bed, Bath &amp; Table</td><td>11,115</td><td>1,711,330</td><td>4.12</td></tr>
            <tr><td>Health &amp; Beauty</td><td>9,670</td><td>1,258,682</td><td>4.08</td></tr>
            <tr><td>Sports &amp; Leisure</td><td>8,641</td><td>1,003,411</td><td>4.17</td></tr>
            <tr><td>Furniture &amp; Decor</td><td>8,334</td><td>1,148,296</td><td>3.97</td></tr>
            <tr><td>Computers &amp; Accessories</td><td>7,827</td><td>1,534,001</td><td>4.02</td></tr>
          </tbody>
        </table>

        <h2>Delivery Performance</h2>
        <p>
          On-time delivery had a strong positive correlation with review scores. Orders delivered more than
          5 days late saw average review scores drop below 2.5, compared to 4.3+ for on-time deliveries.
        </p>

        <table>
          <thead>
            <tr>
              <th>Delivery Status</th>
              <th>Orders</th>
              <th>Avg Review Score</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Early (&gt;3 days ahead)</td><td>12,407</td><td>4.48</td></tr>
            <tr><td>On time (±3 days)</td><td>54,291</td><td>4.31</td></tr>
            <tr><td>Late (1–5 days)</td><td>18,662</td><td>3.52</td></tr>
            <tr><td>Very late (&gt;5 days)</td><td>8,234</td><td>2.43</td></tr>
          </tbody>
        </table>

        <h2>Payment Methods</h2>
        <p>
          Credit card was by far the most popular payment method, used in over 73% of transactions. Boleto
          (a Brazilian bank slip) accounted for approximately 19%.
        </p>

        <h2>Tools Used</h2>
        <ul>
          <li><strong>SQL (PostgreSQL)</strong> — data cleaning, joins, aggregations, window functions</li>
          <li><strong>Python (pandas, matplotlib)</strong> — exploratory data analysis and charting</li>
          <li><strong>Power BI</strong> — dashboard and final visualizations</li>
        </ul>

        <h2>Conclusions</h2>
        <p>
          The Olist dataset provided rich, multi-dimensional data that mirrored real ecommerce business
          questions. Key takeaways were that delivery speed is the single biggest driver of customer
          satisfaction, and that a relatively small number of product categories drive the majority of revenue.
        </p>
        <p>
          Working across 9 related tables reinforced the importance of data modelling and building clean joins
          before jumping into analysis.
        </p>
      </div>
    </>
  );
}
