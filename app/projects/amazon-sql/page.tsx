import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amazon USA Sales Analysis — Jarred Voorneveld",
};

export default function AmazonSqlPage() {
  return (
    <>
      {/* Hero image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/amazon-sql/hero.jpg"
        alt="Amazon USA Sales Analysis – warehouse with shelving and boxes"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Oct 2, 2024</span>
          <span>10 min read</span>
          <span className="post-tag">Sales Analysis</span>
          <span className="post-tag">SQL</span>
        </div>

        <h1>Amazon USA Sales Analysis Project using SQL</h1>

        <p>
          <strong>Difficulty level:</strong> Advanced &nbsp;|&nbsp;{" "}
          <a href="https://github.com/JarVoo/Amazon-Advanced-SQL-Project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/amazon-sql/one-pager-preview.png"
            alt="Amazon SQL One-Pager Preview"
            style={{
              width: "100%",
              maxWidth: "700px",
              borderRadius: "10px",
              marginBottom: "1.25rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            }}
          />
          <a
            href="/projects/amazon-sql/amazon-sql-onepager.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "rgba(40,40,40,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              color: "#f0f0f0",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            One-Pager Summary
          </a>
        </div>

        <h2>Project Overview</h2>
        <p>
          An advanced SQL analysis of over 20,000 sales records from an Amazon-like e-commerce
          platform using PostgreSQL. The project covers customer behaviour, product performance,
          revenue trends, and operational logistics — structured as a set of 18 business problems
          solved entirely through SQL.
        </p>
        <p>
          The project also includes data cleaning, null value handling, and a normalised database
          schema across 7 tables. An ERD diagram visually represents the relationships between tables.
        </p>

        {/* ERD image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/amazon-sql/database-schema.png"
          alt="Amazon sales database schema – entity relationship diagram"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <h2>Database Setup &amp; Design</h2>
        <p>
          The schema covers 7 tables: <code>category</code>, <code>customers</code>, <code>sellers</code>,{" "}
          <code>products</code>, <code>orders</code>, <code>order_items</code>, <code>payments</code>,{" "}
          and <code>shippings</code>. Foreign key constraints enforce referential integrity across all
          relationships. Full schema setup SQL is available on{" "}
          <a href="https://github.com/JarVoo/Amazon-Advanced-SQL-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>

        <h2>Data Cleaning</h2>
        <ul>
          <li><strong>Removing duplicates:</strong> Duplicates in the customer and order tables were identified and removed.</li>
          <li><strong>Handling missing values:</strong> Null values in critical fields were either filled with defaults or handled using appropriate methods.</li>
          <li><strong>Payment statuses:</strong> Orders with null payment statuses were categorised as &quot;Pending.&quot;</li>
          <li><strong>Shipping information:</strong> Null return dates were left as-is, as not all shipments are returned.</li>
        </ul>

        <h2>Business Problems Solved</h2>
        <p>18 SQL problems covering the full e-commerce operation. All queries are available on{" "}
          <a href="https://github.com/JarVoo/Amazon-Advanced-SQL-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
        <ol>
          <li>Top 10 selling products by total sales value</li>
          <li>Revenue by category with percentage contribution</li>
          <li>Average order value per customer (5+ orders)</li>
          <li>Monthly sales trend with month-over-month comparison</li>
          <li>Customers registered but never purchased</li>
          <li>Least-selling product category by state</li>
          <li>Customer lifetime value with ranking</li>
          <li>Inventory stock alerts below threshold</li>
          <li>Shipping delays beyond 3 days</li>
          <li>Payment success rate breakdown by status</li>
          <li>Top 5 sellers by total sales with order success rate</li>
          <li>Product profit margin ranking</li>
          <li>Top 10 most returned products with return rate</li>
          <li>Inactive sellers with no sales in 6 months</li>
          <li>Customer segmentation: returning vs new</li>
          <li>Top 5 customers by orders in each state</li>
          <li>Revenue by shipping provider with average delivery time</li>
          <li>Top 10 products with highest year-over-year revenue decline</li>
        </ol>

        <h2>Learning Outcomes</h2>
        <ul>
          <li>Design and implement a normalised database schema.</li>
          <li>Clean and preprocess real-world datasets for analysis.</li>
          <li>Use advanced SQL techniques including window functions, subqueries, CTEs, and joins.</li>
          <li>Conduct in-depth business analysis using SQL.</li>
          <li>Optimise query performance and handle large datasets efficiently.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          This project demonstrates end-to-end SQL proficiency across a realistic e-commerce schema —
          from schema design and data cleaning through to advanced analytical queries addressing
          inventory, logistics, customer behaviour, and revenue performance.
        </p>
        <p>
          The full SQL scripts and schema setup are available on{" "}
          <a href="https://github.com/JarVoo/Amazon-Advanced-SQL-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </div>
    </>
  );
}
