import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Analytics Project Using SQL & Python — Jarred Voorneveld",
};

export default function WebAnalyticsSqlPythonPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/projects/web-analytics-hero.png" alt="Web Analytics Project Using SQL & Python" className="post-hero" />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Sep 4, 2024</span>
          <span className="post-tag">Web Analysis</span>
        </div>

        <h1>Web Analytics Project Using SQL &amp; Python</h1>

        <p>
          <a href="https://github.com/JarVoo/Web-Analytics-Project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>

        <h2>Introduction</h2>
        <p>
          This project analyses website traffic and user behaviour for <strong>Maven Fuzzy Factory</strong>,
          an e-commerce retailer specialising in children&apos;s toys. Working as an analyst embedded with
          the marketing and product teams, the goal was to extract insights from the raw web session data
          stored in a MySQL database, and to surface those findings using Python visualisations.
        </p>
        <p>
          The analysis covered traffic source performance, conversion funnel optimisation, product-level
          click-through and order rates, and the identification and resolution of tracking anomalies in
          the data pipeline.
        </p>

        <h2>Problem Statement</h2>
        <p>
          Maven Fuzzy Factory was scaling its paid marketing spend but lacked clear visibility into which
          traffic sources were driving profitable sessions versus inflating volume metrics. Additionally,
          a suspected bug in the UTM tracking setup was causing some sessions to be mis-attributed,
          distorting channel-level conversion rates. The project was scoped to:
        </p>
        <ul>
          <li>Identify and rank traffic sources by session volume and conversion rate</li>
          <li>Build and analyse multi-step conversion funnels by traffic source</li>
          <li>Locate and fix the tracking anomaly affecting attribution</li>
          <li>Assess website performance metrics over time</li>
        </ul>

        <h2>Analysing Traffic Sources</h2>
        <p>
          Sessions were grouped by UTM source, medium, and campaign to understand the channel mix.
          The SQL query below formed the basis of the traffic source breakdown:
        </p>

        <pre><code>{`SELECT
    utm_source,
    utm_medium,
    utm_campaign,
    COUNT(DISTINCT website_session_id) AS sessions,
    COUNT(DISTINCT order_id)           AS orders,
    ROUND(COUNT(DISTINCT order_id)
        / COUNT(DISTINCT website_session_id) * 100, 2) AS cvr
FROM website_sessions
LEFT JOIN orders USING (website_session_id)
WHERE created_at BETWEEN '2012-01-01' AND '2012-12-31'
GROUP BY 1, 2, 3
ORDER BY sessions DESC;`}</code></pre>

        <p>
          gsearch / nonbrand was the dominant traffic source by volume, but its conversion rate lagged
          behind direct and brand traffic by approximately 1.8 percentage points — indicating room for
          landing page and bid optimisation.
        </p>

        <h2>Fixing Bugs</h2>
        <p>
          A discrepancy was identified where a subset of sessions showed NULL UTM values despite arriving
          via a paid campaign link. Investigation revealed that the tracking script was firing after a
          redirect, dropping the UTM parameters from the session record. The fix involved adjusting the
          attribution logic to fall back to HTTP referrer data when UTM parameters were absent:
        </p>

        <pre><code>{`-- Identify sessions with missing UTM but known referrer
SELECT
    website_session_id,
    created_at,
    http_referer,
    utm_source,
    utm_medium
FROM website_sessions
WHERE utm_source IS NULL
  AND http_referer IS NOT NULL
  AND created_at >= '2012-03-01'
ORDER BY created_at;`}</code></pre>

        <h2>Conversion Funnel Analysis</h2>
        <p>
          Multi-step funnels were constructed for the primary purchase path: homepage → product page →
          add to cart → shipping → billing → thank you. Drop-off rates at each step were computed per
          traffic source using window functions:
        </p>

        <pre><code>{`WITH funnel AS (
    SELECT
        website_session_id,
        MAX(CASE WHEN pageview_url = '/home'        THEN 1 ELSE 0 END) AS home,
        MAX(CASE WHEN pageview_url = '/products'    THEN 1 ELSE 0 END) AS products,
        MAX(CASE WHEN pageview_url = '/cart'        THEN 1 ELSE 0 END) AS cart,
        MAX(CASE WHEN pageview_url = '/shipping'    THEN 1 ELSE 0 END) AS shipping,
        MAX(CASE WHEN pageview_url = '/billing'     THEN 1 ELSE 0 END) AS billing,
        MAX(CASE WHEN pageview_url = '/thank-you'   THEN 1 ELSE 0 END) AS thank_you
    FROM website_pageviews
    GROUP BY 1
)
SELECT
    COUNT(home)      AS lander_sessions,
    COUNT(products)  AS product_sessions,
    COUNT(cart)      AS cart_sessions,
    COUNT(shipping)  AS shipping_sessions,
    COUNT(billing)   AS billing_sessions,
    COUNT(thank_you) AS orders
FROM funnel;`}</code></pre>

        <p>
          The largest drop-off occurred between the product page and add-to-cart (63% abandonment),
          followed by billing page to order completion (28% abandonment). These two steps became
          the focus of subsequent A/B testing recommendations.
        </p>

        <h2>Analysing Website Performance</h2>
        <p>
          Python (pandas + matplotlib) was used to plot session volume, CVR, and revenue over time,
          revealing a clear upward trend in organic and direct traffic as the brand matured —
          reducing dependence on paid gsearch traffic from ~82% of sessions in Q1 to ~61% by Q4.
        </p>

        <h2>Tools Used</h2>
        <ul>
          <li><strong>MySQL</strong> — session and order data querying, funnel construction, anomaly detection</li>
          <li><strong>Python (pandas, matplotlib)</strong> — time-series visualisation, trend analysis</li>
        </ul>

        <h2>Conclusions</h2>
        <p>
          The project demonstrated how SQL and Python can work together effectively in a web analytics
          context — SQL for the heavy lifting of data extraction and aggregation, and Python for
          visualising trends over time. Identifying and fixing the UTM tracking bug was a particularly
          valuable outcome, as it corrected months of mis-attributed data that had been influencing
          channel-level budget decisions.
        </p>
        <p>
          The full SQL scripts are available on{" "}
          <a href="https://github.com/JarVoo/Web-Analytics-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </div>
    </>
  );
}
