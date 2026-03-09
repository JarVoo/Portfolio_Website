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
            GitHub Link
          </a>
        </p>

        {/* Project Overview */}
        <h2>Project Overview</h2>
        <p>
          I have worked on analyzing a dataset of over 20,000 sales records from an Amazon-like
          e-commerce platform. This project involves extensive querying of customer behavior,
          product performance, and sales trends using PostgreSQL. Through this project, I have
          tackled various SQL problems, including revenue analysis, customer segmentation, and
          inventory management.
        </p>
        <p>
          The project also focuses on data cleaning, handling null values, and solving real-world
          business problems using structured queries.
        </p>
        <p>
          An ERD diagram is included to visually represent the database schema and relationships
          between tables.
        </p>

        {/* ERD image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/amazon-sql/database-schema.png"
          alt="Amazon sales database schema – entity relationship diagram"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        {/* Database Setup */}
        <h2>Database Setup &amp; Design</h2>
        <h3>Schema Structure</h3>
        <pre><code>{`CREATE TABLE category
(
  category_id   INT PRIMARY KEY,
  category_name VARCHAR(20)
);

-- customers TABLE
CREATE TABLE customers
(
  customer_id INT PRIMARY KEY,
  first_name  VARCHAR(20),
  last_name   VARCHAR(20),
  state       VARCHAR(20),
  address     VARCHAR(5) DEFAULT ('xxxx')
);

-- sellers TABLE
CREATE TABLE sellers
(
  seller_id   INT PRIMARY KEY,
  seller_name VARCHAR(25),
  origin      VARCHAR(15)
);

-- products table
CREATE TABLE products
(
  product_id   INT PRIMARY KEY,
  product_name VARCHAR(50),
  price        FLOAT,
  cogs         FLOAT,
  category_id  INT, -- FK
  CONSTRAINT product_fk_category FOREIGN KEY(category_id) REFERENCES category(category_id)
);

-- orders
CREATE TABLE orders
(
  order_id     INT PRIMARY KEY,
  order_date   DATE,
  customer_id  INT, -- FK
  seller_id    INT, -- FK
  order_status VARCHAR(15),
  CONSTRAINT orders_fk_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  CONSTRAINT orders_fk_sellers   FOREIGN KEY (seller_id)   REFERENCES sellers(seller_id)
);

CREATE TABLE order_items
(
  order_item_id  INT PRIMARY KEY,
  order_id       INT,   -- FK
  product_id     INT,   -- FK
  quantity       INT,
  price_per_unit FLOAT,
  CONSTRAINT order_items_fk_orders   FOREIGN KEY (order_id)   REFERENCES orders(order_id),
  CONSTRAINT order_items_fk_products FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- payment TABLE
CREATE TABLE payments
(
  payment_id     INT PRIMARY KEY,
  order_id       INT, -- FK
  payment_date   DATE,
  payment_status VARCHAR(20),
  CONSTRAINT payments_fk_orders FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE shippings
(
  shipping_id         INT PRIMARY KEY,
  order_id            INT, -- FK
  shipping_date       DATE,
  return_date         DATE,
  shipping_providers  VARCHAR(15),
  delivery_status     VARCHAR(15),
  CONSTRAINT shippings_fk_orders FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE inventory
(
  inventory_id    INT PRIMARY KEY,
  product_id      INT, -- FK
  stock           INT,
  warehouse_id    INT,
  last_stock_date DATE,
  CONSTRAINT inventory_fk_products FOREIGN KEY (product_id) REFERENCES products(product_id)
);`}</code></pre>

        {/* Data Cleaning */}
        <h2>Data Cleaning</h2>
        <p>I cleaned the dataset by:</p>
        <ul>
          <li>
            <strong>Removing duplicates:</strong> Duplicates in the customer and order tables were
            identified and removed.
          </li>
          <li>
            <strong>Handling missing values:</strong> Null values in critical fields (e.g.,
            customer address, payment status) were either filled with default values or handled
            using appropriate methods.
          </li>
        </ul>

        {/* Handling Null Values */}
        <h2>Handling Null Values</h2>
        <p>Null values were handled based on their context:</p>
        <ul>
          <li>
            <strong>Customer addresses:</strong> Missing addresses were assigned default placeholder
            values.
          </li>
          <li>
            <strong>Payment statuses:</strong> Orders with null payment statuses were categorised
            as &quot;Pending.&quot;
          </li>
          <li>
            <strong>Shipping information:</strong> Null return dates were left as is, as not all
            shipments are returned.
          </li>
        </ul>

        {/* Objective */}
        <h2>Objective</h2>
        <p>
          The primary objective of this project is to showcase SQL proficiency through complex
          queries that address real-world e-commerce business challenges. The analysis covers
          various aspects of e-commerce operations, including:
        </p>
        <ul>
          <li>Customer behaviour</li>
          <li>Sales trends</li>
          <li>Inventory management</li>
          <li>Payment and shipping analysis</li>
          <li>Forecasting and product performance</li>
        </ul>

        {/* Identifying Business Problems */}
        <h2>Identifying Business Problems</h2>
        <p>Key business problems identified:</p>
        <ol>
          <li>Low product availability due to inconsistent restocking.</li>
          <li>High return rates for specific product categories.</li>
          <li>Significant delays in shipments and inconsistencies in delivery times.</li>
          <li>High customer acquisition costs with a low customer retention rate.</li>
        </ol>

        {/* Solving Business Problems */}
        <h2>Solving Business Problems</h2>

        {/* Q1 */}
        <h3>1. Top Selling Products</h3>
        <p>
          Query the top 10 products by total sales value.
          <br />
          <strong>Challenge:</strong> Include product name, total quantity sold, and total sales
          value.
        </p>
        <pre><code>{`SELECT
    oi.product_id,
    p.product_name,
    SUM(oi.total_sale) as total_sale,
    COUNT(o.order_id)  as total_orders
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
JOIN
products as p
ON p.product_id = oi.product_id
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 10`}</code></pre>

        {/* Q2 */}
        <h3>2. Revenue by Category</h3>
        <p>
          Calculate total revenue generated by each product category.
          <br />
          <strong>Challenge:</strong> Include the percentage contribution of each category to
          total revenue.
        </p>
        <pre><code>{`SELECT
    p.category_id,
    c.category_name,
    SUM(oi.total_sale) as total_sale,
    SUM(oi.total_sale)/
                    (SELECT SUM(total_sale) FROM order_items)
                    * 100
    as contribution
FROM order_items as oi
JOIN
products as p
ON p.product_id = oi.product_id
LEFT JOIN category as c
ON c.category_id = p.category_id
GROUP BY 1, 2
ORDER BY 3 DESC`}</code></pre>

        {/* Q3 */}
        <h3>3. Average Order Value (AOV)</h3>
        <p>
          Compute the average order value for each customer.
          <br />
          <strong>Challenge:</strong> Include only customers with more than 5 orders.
        </p>
        <pre><code>{`SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ',  c.last_name) as full_name,
    SUM(total_sale)/COUNT(o.order_id) as AOV,
    COUNT(o.order_id) as total_orders
FROM orders as o
JOIN
customers as c
ON c.customer_id = o.customer_id
JOIN
order_items as oi
ON oi.order_id = o.order_id
GROUP BY 1, 2
HAVING  COUNT(o.order_id) > 5`}</code></pre>

        {/* Q4 */}
        <h3>4. Monthly Sales Trend</h3>
        <p>
          Query monthly total sales over the past year.
          <br />
          <strong>Challenge:</strong> Display the sales trend, grouping by month, return
          current_month sale, last month sale!
        </p>
        <pre><code>{`SELECT
    year,
    month,
    total_sale as current_month_sale,
    LAG(total_sale, 1) OVER(ORDER BY year, month) as last_month_sale
FROM ---
(
SELECT
    EXTRACT(MONTH FROM o.order_date) as month,
    EXTRACT(YEAR FROM o.order_date) as year,
    ROUND(
            SUM(oi.total_sale::numeric)
            ,2) as total_sale
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '1 year'
GROUP BY 1, 2
ORDER BY year, month
) as t1`}</code></pre>

        {/* Q5 */}
        <h3>5. Customers with No Purchases</h3>
        <p>
          Find customers who have registered but never placed an order.
          <br />
          <strong>Challenge:</strong> List customer details and the time since their registration.
        </p>
        <pre><code>{`-- Approach 1
SELECT *
FROM customers
WHERE customer_id NOT IN (SELECT
                    DISTINCT customer_id
                FROM orders
                );`}</code></pre>
        <pre><code>{`-- Approach 2
SELECT *
FROM customers as c
LEFT JOIN
orders as o
ON o.customer_id = c.customer_id
WHERE o.customer_id IS NULL`}</code></pre>

        {/* Q6 */}
        <h3>6. Least-Selling Categories by State</h3>
        <p>
          Identify the least-selling product category for each state.
          <br />
          <strong>Challenge:</strong> Include the total sales for that category within each state.
        </p>
        <pre><code>{`WITH ranking_table
AS
(
SELECT
    c.state,
    cat.category_name,
    SUM(oi.total_sale) as total_sale,
    RANK() OVER(PARTITION BY c.state ORDER BY SUM(oi.total_sale) ASC) as rank
FROM orders as o
JOIN
customers as c
ON o.customer_id = c.customer_id
JOIN
order_items as oi
ON o.order_id = oi.order_id
JOIN
products as p
ON oi.product_id = p.product_id
JOIN
category as cat
ON cat.category_id = p.category_id
GROUP BY 1, 2
)
SELECT
*
FROM ranking_table
WHERE rank = 1`}</code></pre>

        {/* Q7 */}
        <h3>7. Customer Lifetime Value (CLTV)</h3>
        <p>
          Calculate the total value of orders placed by each customer over their lifetime.
          <br />
          <strong>Challenge:</strong> Rank customers based on their CLTV.
        </p>
        <pre><code>{`SELECT
    c.customer_id,
    CONCAT(c.first_name, ' ',  c.last_name) as full_name,
    SUM(total_sale) as CLTV,
    DENSE_RANK() OVER( ORDER BY SUM(total_sale) DESC) as cx_ranking
FROM orders as o
JOIN
customers as c
ON c.customer_id = o.customer_id
JOIN
order_items as oi
ON oi.order_id = o.order_id
GROUP BY 1, 2`}</code></pre>

        {/* Q8 */}
        <h3>8. Inventory Stock Alerts</h3>
        <p>
          Query products with stock levels below a certain threshold (e.g., less than 10 units).
          <br />
          <strong>Challenge:</strong> Include last restock date and warehouse information.
        </p>
        <pre><code>{`SELECT
    i.inventory_id,
    p.product_name,
    i.stock as current_stock_left,
    i.last_stock_date,
    i.warehouse_id
FROM inventory as i
JOIN
products as p
ON p.product_id = i.product_id
WHERE stock < 10`}</code></pre>

        {/* Q9 */}
        <h3>9. Shipping Delays</h3>
        <p>
          Identify orders where the shipping date is later than 3 days after the order date.
          <br />
          <strong>Challenge:</strong> Include customer, order details, and delivery provider.
        </p>
        <pre><code>{`SELECT
    c.*,
    o.*,
    s.shipping_providers,
    s.shipping_date - o.order_date as days_took_to_ship
FROM orders as o
JOIN
customers as c
ON c.customer_id = o.customer_id
JOIN
shippings as s
ON o.order_id = s.order_id
WHERE s.shipping_date - o.order_date > 3`}</code></pre>

        {/* Q10 */}
        <h3>10. Payment Success Rate</h3>
        <p>
          Calculate the percentage of successful payments across all orders.
          <br />
          <strong>Challenge:</strong> Include breakdowns by payment status (e.g., failed, pending).
        </p>
        <pre><code>{`SELECT
    p.payment_status,
    COUNT(*) as total_cnt,
    COUNT(*)::numeric/(SELECT COUNT(*) FROM payments)::numeric * 100
FROM orders as o
JOIN
payments as p
ON o.order_id = p.order_id
GROUP BY 1`}</code></pre>

        {/* Q11 */}
        <h3>11. Top Performing Sellers</h3>
        <p>
          Find the top 5 sellers based on total sales value.
          <br />
          <strong>Challenge:</strong> Include both successful and failed orders, and display their
          percentage of successful orders.
        </p>
        <pre><code>{`WITH top_sellers
AS
(SELECT
    s.seller_id,
    s.seller_name,
    SUM(oi.total_sale) as total_sale
FROM orders as o
JOIN
sellers as s
ON o.seller_id = s.seller_id
JOIN
order_items as oi
ON oi.order_id = o.order_id
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 5
),

sellers_reports
AS
(SELECT
    o.seller_id,
    ts.seller_name,
    o.order_status,
    COUNT(*) as total_orders
FROM orders as o
JOIN
top_sellers as ts
ON ts.seller_id = o.seller_id
WHERE
    o.order_status NOT IN ('Inprogress', 'Returned')

GROUP BY 1, 2, 3
)
SELECT
    seller_id,
    seller_name,
    SUM(CASE WHEN order_status = 'Completed' THEN total_orders ELSE 0 END) as Completed_orders,
    SUM(CASE WHEN order_status = 'Cancelled' THEN total_orders ELSE 0 END) as Cancelled_orders,
    SUM(total_orders) as total_orders,
    SUM(CASE WHEN order_status = 'Completed' THEN total_orders ELSE 0 END)::numeric/
    SUM(total_orders)::numeric * 100 as successful_orders_percentage

FROM sellers_reports
GROUP BY 1, 2`}</code></pre>

        {/* Q12 */}
        <h3>12. Product Profit Margin</h3>
        <p>
          Calculate the profit margin for each product (difference between price and cost of
          goods sold).
          <br />
          <strong>Challenge:</strong> Rank products by their profit margin, showing highest to
          lowest.
        </p>
        <pre><code>{`SELECT
    product_id,
    product_name,
    profit_margin,
    DENSE_RANK() OVER( ORDER BY profit_margin DESC) as product_ranking
FROM
(SELECT
    p.product_id,
    p.product_name,
    SUM(total_sale - (p.cogs * oi.quantity))/sum(total_sale) * 100 as profit_margin
FROM order_items as oi
JOIN
products as p
ON oi.product_id = p.product_id
GROUP BY 1, 2
) as t1`}</code></pre>

        {/* Q13 */}
        <h3>13. Most Returned Products</h3>
        <p>
          Query the top 10 products by the number of returns.
          <br />
          <strong>Challenge:</strong> Display the return rate as a percentage of total units sold
          for each product.
        </p>
        <pre><code>{`SELECT
    p.product_id,
    p.product_name,
    COUNT(*) as total_unit_sold,
    SUM(CASE WHEN o.order_status = 'Returned' THEN 1 ELSE 0 END) as total_returned,
    SUM(CASE WHEN o.order_status = 'Returned' THEN 1 ELSE 0 END)::numeric/COUNT(*)::numeric * 100 as return_percentage
FROM order_items as oi
JOIN
products as p
ON oi.product_id = p.product_id
JOIN orders as o
ON o.order_id = oi.order_id
GROUP BY 1, 2
ORDER BY 5 DESC`}</code></pre>

        {/* Q14 */}
        <h3>14. Inactive Sellers</h3>
        <p>
          Identify sellers who haven&apos;t made any sales in the last 6 months.
          <br />
          <strong>Challenge:</strong> Show the last sale date and total sales from those sellers.
        </p>
        <pre><code>{`WITH cte1 -- as these sellers has not done any sale in last 6 month
AS
(SELECT * FROM sellers
WHERE seller_id NOT IN (SELECT seller_id FROM orders WHERE order_date >= CURRENT_DATE - INTERVAL '6 month')
)

SELECT
    o.seller_id,
    MAX(o.order_date) as last_sale_date,
    MAX(oi.total_sale) as last_sale_amount
FROM orders as o
JOIN
cte1
ON cte1.seller_id = o.seller_id
JOIN order_items as oi
ON o.order_id = oi.order_id
GROUP BY 1`}</code></pre>

        {/* Q15 */}
        <h3>15. Identify Customers into Returning or New</h3>
        <p>
          If the customer has done more than 5 returns categorise them as returning otherwise new.
          <br />
          <strong>Challenge:</strong> List customer id, name, total orders, total returns.
        </p>
        <pre><code>{`SELECT
    c_full_name as customers,
    total_orders,
    total_return,
    CASE
        WHEN total_return > 5 THEN 'Returning_customers' ELSE 'New'
    END as cx_category
FROM
(SELECT
    CONCAT(c.first_name, ' ', c.last_name) as c_full_name,
    COUNT(o.order_id) as total_orders,
    SUM(CASE WHEN o.order_status = 'Returned' THEN 1 ELSE 0 END) as total_return
FROM orders as o
JOIN
customers as c
ON c.customer_id = o.customer_id
JOIN
order_items as oi
ON oi.order_id = o.order_id
GROUP BY 1)`}</code></pre>

        {/* Q16 */}
        <h3>16. Top 5 Customers by Orders in Each State</h3>
        <p>
          Identify the top 5 customers with the highest number of orders for each state.
          <br />
          <strong>Challenge:</strong> Include the number of orders and total sales for each
          customer.
        </p>
        <pre><code>{`SELECT * FROM
(SELECT
    c.state,
    CONCAT(c.first_name, ' ', c.last_name) as customers,
    COUNT(o.order_id) as total_orders,
    SUM(total_sale) as total_sale,
    DENSE_RANK() OVER(PARTITION BY c.state ORDER BY COUNT(o.order_id) DESC) as rank
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
JOIN
customers as c
ON
c.customer_id = o.customer_id
GROUP BY 1, 2
) as t1
WHERE rank <=5`}</code></pre>

        {/* Q17 */}
        <h3>17. Revenue by Shipping Provider</h3>
        <p>
          Calculate the total revenue handled by each shipping provider.
          <br />
          <strong>Challenge:</strong> Include the total number of orders handled and the average
          delivery time for each provider.
        </p>
        <pre><code>{`SELECT
    s.shipping_providers,
    COUNT(o.order_id) as order_handled,
    SUM(oi.total_sale) as total_sale,
    COALESCE(AVG(s.return_date - s.shipping_date), 0) as average_days
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
JOIN
shippings as s
ON
s.order_id = o.order_id
GROUP BY 1`}</code></pre>

        {/* Q18 */}
        <h3>18. Top 10 Products with Highest Decreasing Revenue Ratio</h3>
        <p>
          Compare last year (2022) and current year (2023) to find the top 10 products with the
          highest decreasing revenue ratio.
          <br />
          <strong>Challenge:</strong> Return product_id, product_name, category_name, 2022
          revenue and 2023 revenue decrease ratio at end. Round the result.
          <br />
          Note: Decrease ratio = cr-ls/ls* 100 (cs = current_year, ls = last_year)
        </p>
        <pre><code>{`WITH last_year_sale
AS
(
SELECT
    p.product_id,
    p.product_name,
    SUM(oi.total_sale) as revenue
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
JOIN
products as p
ON
p.product_id = oi.product_id
WHERE EXTRACT(YEAR FROM o.order_date) = 2022
GROUP BY 1, 2
),

current_year_sale
AS
(
SELECT
    p.product_id,
    p.product_name,
    SUM(oi.total_sale) as revenue
FROM orders as o
JOIN
order_items as oi
ON oi.order_id = o.order_id
JOIN
products as p
ON
p.product_id = oi.product_id
WHERE EXTRACT(YEAR FROM o.order_date) = 2023
GROUP BY 1, 2
)

SELECT
    cs.product_id,
    ls.revenue as last_year_revenue,
    cs.revenue as current_year_revenue,
    ls.revenue - cs.revenue as rev_diff,
    ROUND((cs.revenue - ls.revenue)::numeric/ls.revenue::numeric * 100, 2) as reveneue_dec_ratio
FROM last_year_sale as ls
JOIN
current_year_sale as cs
ON ls.product_id = cs.product_id
WHERE
    ls.revenue > cs.revenue
ORDER BY 5 DESC
LIMIT 10`}</code></pre>

        {/* Learning Outcomes */}
        <h2>Learning Outcomes</h2>
        <p>This project enabled me to:</p>
        <ul>
          <li>Design and implement a normalised database schema.</li>
          <li>Clean and preprocess real-world datasets for analysis.</li>
          <li>
            Use advanced SQL techniques, including window functions, subqueries, and joins.
          </li>
          <li>Conduct in-depth business analysis using SQL.</li>
          <li>Optimise query performance and handle large datasets efficiently.</li>
        </ul>

        {/* Conclusion */}
        <h2>Conclusion</h2>
        <p>
          This advanced SQL project successfully demonstrates my ability to solve real-world
          e-commerce problems using structured queries. From improving customer retention to
          optimising inventory and logistics, the project provides valuable insights into
          operational challenges and solutions.
        </p>
        <p>
          By completing this project, I have gained a deeper understanding of how SQL can be
          used to tackle complex data problems and drive business decision-making.
        </p>
        <p>
          The full SQL scripts and schema setup are available on{" "}
          <a href="https://github.com/JarVoo/Amazon-Advanced-SQL-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </>
  );
}
