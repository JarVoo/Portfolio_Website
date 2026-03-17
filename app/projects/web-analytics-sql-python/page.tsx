import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Analytics Project Using SQL & Python — Jarred Voorneveld",
};

export default function WebAnalyticsSqlPythonPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/projects/web-analytics/hero.webp" alt="Web Analytics Project Using SQL & Python" className="post-hero" style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }} />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Sep 4, 2024</span>
          <span className="post-tag">Web Analysis</span>
          <span className="post-tag">SQL</span>
          <span className="post-tag">Python</span>
        </div>

        <h1>Web Analytics Project Using SQL &amp; Python</h1>

        <p>
          <a href="https://github.com/JarVoo/Web-Analytics-Project" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>

        <h2>Introduction</h2>
        <p>
          I will be using SQL and Python to analyze data from an e-commerce store that sells kids toys called
          Maven Fuzzy Factory. It is a new company and I will take you along for a ride on how it&apos;s performing
          over the coming months. I am appointed as an eCommerce Database Analyst.
        </p>
        <p>I will dive into:</p>
        <p><strong>Traffic Analysis and Optimization:</strong></p>
        <ul>
          <li>Where is the traffic coming from</li>
          <li>How it performs in terms of volume and conversion rates</li>
          <li>Adjust bids to optimize marketing budgets</li>
        </ul>
        <p><strong>Analyzing Top Website Pages &amp; Entry Pages:</strong></p>
        <ul>
          <li>Where customers are landing on the website</li>
          <li>How the customers make their way through the conversion funnel on the path to making a purchase</li>
          <li>Analyzing Bounce Rates</li>
        </ul>
        <p><strong>Analyzing Business Patterns:</strong></p>
        <ul>
          <li>Analyze the average website volume, by hour of day, and day of week so a new live chat system can be put in place.</li>
        </ul>

        <h2>Problem Statement</h2>
        <p>
          I will be working directly with the CEO, Marketing Director and Website Manager to:
        </p>
        <ul>
          <li>Help grow the business and analyze performance along the way.</li>
          <li>Make recommendations to steer the business, to help shape the business.</li>
          <li>Analyze and optimize the business marketing channels and website.</li>
        </ul>
        <p>Some of the tasks that I will delve into include:</p>
        <ol>
          <li>Which marketing channels (e.g., paid search, organic search, email) are driving the most traffic and conversions?</li>
          <li>Are there any channels we should invest more in or scale back?</li>
          <li>What are the conversion rates for various campaigns?</li>
          <li>How do customers interact with different marketing channels before making a purchase?</li>
          <li>What are the results of recent A/B tests on the website? Which variations performed best, and why?</li>
          <li>What are the conversion rates at each stage of the purchase funnel?</li>
        </ol>

        <h2>Analyzing Traffic Sources</h2>
        <p>
          One month after the launch of the database for Fuzzy Factory, I will find out where the traffic is coming from,
          how it performs in terms of volume and conversion rates. I will guide management to adjust bids to optimize marketing budgets.
        </p>

        <h3>Conversion Rate (CVR) from session to order for all traffic up to date</h3>
        <p>
          Based on what&apos;s being paid for clicks, the marketing director will need CVR to be higher than 4%.
          If we are much lower, then we will need to reduce bids and increase if higher.
        </p>

        <pre><code>{`SELECT
    COUNT(DISTINCT ws.website_session_id) AS sessions,
    COUNT(DISTINCT o.order_id) AS orders,
    COUNT(DISTINCT o.order_id)/COUNT(DISTINCT ws.website_session_id) AS session_to_order_cvr
FROM website_sessions AS ws
LEFT JOIN orders AS o
ON ws.website_session_id = o.website_session_id
WHERE ws.created_at < '2012-04-14'
    AND utm_source = 'gsearch'
    AND utm_campaign = 'nonbrand'`}</code></pre>

        <p>
          The CVR is lower than the 4% threshold (2.9%). We will need to reduce bids, we are over-spending it seems.
        </p>

        <h3>10 May 2012</h3>
        <p>
          The Marketing Director bid down on gsearch nonbrand on 2012-04-15. Let&apos;s pull trended session volume
          for this traffic by week, to see if bid changes have caused volume to drop.
        </p>

        <pre><code>{`SELECT
    MIN(DATE(created_at)) AS week_start_date,
    COUNT(DISTINCT website_session_id) AS sessions
FROM website_sessions AS ws
WHERE ws.created_at < '2012-05-10'
    AND utm_source = 'gsearch'
    AND utm_campaign = 'nonbrand'
GROUP BY
    YEAR(created_at),
    WEEK(created_at)`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/weekly-sessions.png" alt="Weekly Sessions Over Time" className="post-img" />

        <p>
          It looks like gsearch nonbrand is sensitive to bid changes, there is a decrease in volume.
          We want maximum volume, but we don&apos;t want to spend more on ads, we therefore need to make the campaigns more efficient.
        </p>

        <h3>11 May 2012</h3>
        <p>
          The Marketing Director also noticed that accessing the site on his mobile phone wasn&apos;t a great process.
          He wants conversion rates from session to order, by device type and then we go from there.
        </p>

        <pre><code>{`SELECT
    device_type,
    COUNT(ws.website_session_id) AS sessions,
    COUNT(o.order_id) AS orders,
    COUNT(o.order_id)/COUNT(ws.website_session_id)*100 AS session_to_orders_cvr
FROM website_sessions AS ws
LEFT JOIN orders AS o
ON ws.website_session_id = o.website_session_id
WHERE ws.created_at < '2012-05-11'
    AND utm_source = 'gsearch'
    AND utm_campaign = 'nonbrand'
GROUP BY 1`}</code></pre>

        <p>
          We should not be running the same bids for mobile as desktop. Going forward, it makes sense to bid higher on desktop device type.
        </p>

        <h3>09 June 2012</h3>
        <p>
          Another bid was made on gsearch nonbrand on 19 May 2012, so let&apos;s see our weekly trends for device type,
          so we can observe the impact on volume.
        </p>

        <pre><code>{`SELECT
    MIN(DATE(created_at)) AS week_start_date,
    COUNT(DISTINCT CASE WHEN device_type = 'desktop' THEN website_session_id ELSE NULL END) AS dtop_sessions,
    COUNT(DISTINCT CASE WHEN device_type = 'mobile' THEN website_session_id ELSE NULL END) AS mob_sessions
FROM website_sessions
WHERE created_at BETWEEN '2012-04-15' AND '2012-06-09'
    AND utm_source = 'gsearch'
    AND utm_campaign = 'nonbrand'
GROUP BY
    YEAR(created_at),
    WEEK(created_at)`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/weekly-device.png" alt="Weekly Data Over Time - Desktop vs Mobile" className="post-img" />

        <p>
          The session volume for desktop has increased soon after the bid went up in May, and the volume for mobile
          sessions decreased with the decrease in the bid. This is exactly what we want.
        </p>

        <h2>Analyzing Website Performance</h2>
        <p>
          I will help understand where customers are landing on the website, how they make their way through the
          conversion funnel on the path to placing an order.
        </p>

        <h3>09 June 2012</h3>
        <p>The Website Manager wants an overview of &apos;most viewed website pages&apos;, ranked by session volume.</p>

        <pre><code>{`SELECT
    pageview_url,
    COUNT(DISTINCT website_session_id) AS sessions
FROM website_pageviews
WHERE created_at < '2012-06-09'
GROUP BY 1
ORDER BY 2 DESC`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/pageview-sessions.png" alt="Pageview URL Sessions" className="post-img" />

        <p>
          It looks like home, products and the original mr fuzzy pages were the most viewed in the time period.
          Next would be good to know where exactly users are hitting the website, in other words, where are they
          entering our site and on what page?
        </p>

        <h3>14 June 2012</h3>
        <p>Let&apos;s analyze bounce rates on the home page.</p>

        <pre><code>{`SELECT
    COUNT(*) AS sessions,
    SUM(CASE WHEN bounced_sessions = 1 THEN 1 ELSE 0 END) AS bounced_sessions,
    SUM(CASE WHEN bounced_sessions = 1 THEN 1 ELSE 0 END) / COUNT(*) AS bounce_rate
FROM (
    SELECT
        website_session_id,
        MIN(pageview_url) AS landing_page,
        CASE WHEN COUNT(website_pageview_id) = 1 THEN 1 ELSE 0 END AS bounced_sessions
    FROM website_pageviews
    WHERE created_at < '2012-06-14'
    GROUP BY website_session_id
) AS subquery`}</code></pre>

        <p>
          This bounce rate is fairly high for paid search (59%), which should be high quality traffic. Next we will
          need to experiment with a new page and see if this new page will perform better.
        </p>

        <h3>28 July 2012</h3>
        <p>
          The Website Manager ran a new custom page called /lander-1, in a 50/50 test against the /home page.
          Let&apos;s pull bounce rates for the two groups.
        </p>

        <pre><code>{`WITH first_test_pv AS (
    SELECT
        wp.website_session_id,
        MIN(wp.website_pageview_id) AS min_pv_id
    FROM website_pageviews AS wp
    INNER JOIN website_sessions AS ws
        ON wp.website_session_id = ws.website_session_id
        AND ws.created_at < '2012-07-28'
        AND wp.website_pageview_id > 23504
        AND utm_source = 'gsearch'
        AND utm_campaign = 'nonbrand'
    GROUP BY wp.website_session_id
),
nb_sessions_landing AS (
    SELECT
        ftp.website_session_id,
        wp.pageview_url AS landing_page
    FROM first_test_pv AS ftp
    LEFT JOIN website_pageviews AS wp
        ON ftp.min_pv_id = wp.website_pageview_id
    WHERE wp.pageview_url IN ('/home', '/lander-1')
),
bounced_sessions AS (
    SELECT
        nsl.website_session_id,
        nsl.landing_page,
        COUNT(wp.website_pageview_id) AS count_pages_viewed
    FROM nb_sessions_landing AS nsl
    LEFT JOIN website_pageviews AS wp
        ON nsl.website_session_id = wp.website_session_id
    GROUP BY 1, 2
    HAVING count_pages_viewed = 1
)
SELECT
    nsl.landing_page,
    COUNT(DISTINCT nsl.website_session_id) AS sessions,
    COUNT(DISTINCT bs.website_session_id) AS bounced,
    COUNT(DISTINCT bs.website_session_id)/COUNT(DISTINCT nsl.website_session_id) AS bounce_rate
FROM nb_sessions_landing AS nsl
LEFT JOIN bounced_sessions AS bs
    ON nsl.website_session_id = bs.website_session_id
GROUP BY 1;`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/bounce-rate.png" alt="Landing Page Bounce Rates" className="post-img" />

        <p>
          The new lander-1 page was more successful than the original home page, less of a bounce rate.
          Management will direct traffic to the new page.
        </p>

        <h3>31 August 2012</h3>
        <p>
          The Website Manager would like to see the session volume of paid search (nonbrand) traffic landing on
          /lander-1 and /home, the overall paid search bounce rate, trended weekly since 01 June 2012.
          She wants to make sure that the /lander-1 change has indeed improved the overall picture.
        </p>

        <pre><code>{`WITH first_pg AS (
    SELECT
        ws.website_session_id,
        MIN(wp.website_pageview_id) AS min_pv_id,
        COUNT(wp.website_pageview_id) AS count_pv
    FROM website_sessions AS ws
    LEFT JOIN website_pageviews AS wp
        ON ws.website_session_id = wp.website_session_id
    WHERE ws.created_at BETWEEN '2012-06-01' AND '2012-08-31'
        AND ws.utm_source = 'gsearch'
        AND ws.utm_campaign = 'nonbrand'
    GROUP BY 1
),
sessions_w_url AS (
    SELECT
        fp.website_session_id,
        fp.min_pv_id,
        fp.count_pv,
        wp.pageview_url,
        wp.created_at
    FROM first_pg AS fp
    LEFT JOIN website_pageviews AS wp
        ON fp.min_pv_id = wp.website_pageview_id
)
SELECT
    MIN(DATE(created_at)) AS week_start_date,
    ROUND(COUNT(DISTINCT CASE WHEN count_pv = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT website_session_id),2) AS bounce_rate,
    COUNT(DISTINCT CASE WHEN pageview_url = '/home' THEN website_session_id ELSE NULL END) AS home_sessions,
    COUNT(DISTINCT CASE WHEN pageview_url = '/lander-1' THEN website_session_id ELSE NULL END) AS lander_sessions
FROM sessions_w_url
GROUP BY YEARWEEK(created_at)`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/weekly-bounce-rate.png" alt="Weekly Bounce Rate Trends" className="post-img" />

        <p>
          It is clear to see the traffic switched over to the lander page at the end of July. The bounce rate has
          decreased from just over 60% to the low 50% range. Also the overall volume of sessions of the /lander-1
          page increased compared to the /home page.
        </p>

        <h3>05 September 2012</h3>
        <p>
          The Website Manager wants me to dive into where we are losing our users from the new lander page to
          placing an order on the website. I will conduct a full conversion funnel, analyzing how many customers
          made it to each step.
        </p>

        <pre><code>{`WITH made_it_flag AS (
SELECT
    website_session_id,
    MAX(product_page) AS prod_made_it,
    MAX(mr_fuzzy) AS fuz_made_it,
    MAX(cart) AS car_made_it,
    MAX(shipping) AS ship_made_it,
    MAX(billing) AS bill_made_it,
    MAX(thank_you) AS tha_made_it
FROM (
    SELECT
        ws.website_session_id,
        wp.pageview_url,
        CASE WHEN pageview_url = '/products' THEN 1 ELSE 0 END AS product_page,
        CASE WHEN pageview_url = '/the-original-mr-fuzzy' THEN 1 ELSE 0 END AS mr_fuzzy,
        CASE WHEN pageview_url = '/cart' THEN 1 ELSE 0 END AS cart,
        CASE WHEN pageview_url = '/shipping' THEN 1 ELSE 0 END AS shipping,
        CASE WHEN pageview_url = '/billing' THEN 1 ELSE 0 END AS billing,
        CASE WHEN pageview_url = '/thank-you-for-your-order' THEN 1 ELSE 0 END AS thank_you
    FROM website_sessions AS ws
    LEFT JOIN website_pageviews AS wp
        ON ws.website_session_id = wp.website_session_id
    WHERE ws.created_at > '2012-08-05'
        AND ws.created_at < '2012-09-05'
        AND utm_source = 'gsearch'
        AND utm_campaign = 'nonbrand'
) AS hits
GROUP BY 1
)
SELECT
    ROUND(COUNT(DISTINCT CASE WHEN prod_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT website_session_id),2) AS lander_click_rt,
    ROUND(COUNT(DISTINCT CASE WHEN fuz_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT CASE WHEN prod_made_it = 1 THEN website_session_id ELSE NULL END),2) AS products_click_rt,
    ROUND(COUNT(DISTINCT CASE WHEN car_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT CASE WHEN fuz_made_it = 1 THEN website_session_id ELSE NULL END),2) AS mr_fuzzy_rt,
    ROUND(COUNT(DISTINCT CASE WHEN ship_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT CASE WHEN car_made_it = 1 THEN website_session_id ELSE NULL END),2) AS cart_click_rt,
    ROUND(COUNT(DISTINCT CASE WHEN bill_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT CASE WHEN ship_made_it = 1 THEN website_session_id ELSE NULL END),2) AS shipping_click_rt,
    ROUND(COUNT(DISTINCT CASE WHEN tha_made_it = 1 THEN website_session_id ELSE NULL END)
        /COUNT(DISTINCT CASE WHEN bill_made_it = 1 THEN website_session_id ELSE NULL END),2) AS billing_click_rt
FROM made_it_flag`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/conversion-rates.png" alt="Conversion Rates by Stage" className="post-img" />

        <p>
          It looks like we need to focus on the /lander-1 page, /the-original-mrfuzzy page, and /billing page.
          The click through rates look quite low in relation to the other pages on the website.
        </p>

        <h3>10 November 2012</h3>
        <p>
          Let&apos;s see the impact of the billing test. I will analyze the lift generated from the test
          (which took place between Sep 10 - Nov 10), in terms of revenue per billing page session.
        </p>

        <pre><code>{`SELECT
    billing_version_seen,
    COUNT(DISTINCT website_session_id) AS sessions,
    ROUND(SUM(price_usd)/COUNT(DISTINCT website_session_id), 2) AS revenue_per_billing_page_seen
FROM(
    SELECT
        website_pageviews.website_session_id,
        website_pageviews.pageview_url AS billing_version_seen,
        orders.order_id,
        orders.price_usd
    FROM website_pageviews
    LEFT JOIN orders
        ON orders.website_session_id = website_pageviews.website_session_id
    WHERE website_pageviews.created_at > '2012-09-10'
        AND website_pageviews.created_at < '2012-11-10'
        AND website_pageviews.pageview_url IN ('/billing','/billing-2')
) AS billing_pageviews_and_order_data
GROUP BY 1`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/billing-test.png" alt="Billing Test Results" className="post-img" />

        <p>There has been a major revenue change for billing-2:</p>
        <ul>
          <li>$22.83 in revenue per billing page seen for the old version</li>
          <li>$31.34 in revenue for the new version</li>
          <li>Lift of $8.51 per billing page view</li>
        </ul>

        <h3>27 November 2012</h3>
        <p>
          The last objective: looking at the estimated revenue earned for the gsearch lander test.
          We will look at the increase in conversion rate test from 19 June 2012 - 28 July 2012, specifically for nonbrand sessions.
        </p>

        <pre><code>{`WITH first_test_pageviews AS (
    SELECT
        website_pageviews.website_session_id,
        MIN(website_pageviews.website_pageview_id) AS min_pageview_id
    FROM website_pageviews
    INNER JOIN website_sessions
        ON website_sessions.website_session_id = website_pageviews.website_session_id
        AND website_sessions.created_at < '2012-07-28'
        AND website_pageviews.website_pageview_id >= 23504
        AND utm_source = 'gsearch'
        AND utm_campaign = 'nonbrand'
    GROUP BY website_pageviews.website_session_id
),
nonbrand_test_sessions_w_landing_pages AS (
    SELECT
        first_test_pageviews.website_session_id,
        website_pageviews.pageview_url AS landing_page
    FROM first_test_pageviews
    LEFT JOIN website_pageviews
        ON website_pageviews.website_pageview_id = first_test_pageviews.min_pageview_id
    WHERE website_pageviews.pageview_url IN ('/home','/lander-1')
),
nonbrand_test_sessions_w_orders AS (
    SELECT
        nonbrand_test_sessions_w_landing_pages.website_session_id,
        nonbrand_test_sessions_w_landing_pages.landing_page,
        orders.order_id AS order_id
    FROM nonbrand_test_sessions_w_landing_pages
    LEFT JOIN orders
        ON orders.website_session_id = nonbrand_test_sessions_w_landing_pages.website_session_id
)
SELECT
    landing_page,
    COUNT(DISTINCT website_session_id) AS sessions,
    COUNT(DISTINCT order_id) AS orders,
    COUNT(DISTINCT order_id)/COUNT(DISTINCT website_session_id) AS conv_rate
FROM nonbrand_test_sessions_w_orders
GROUP BY 1;`}</code></pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/web-analytics/lander-test.png" alt="Lander Test Conversion Rates" className="post-img" />

        <p>
          0.0319 for /home vs 0.0406 for /lander-1 — that&apos;s 0.0087 additional orders per session.
          Since the test, there have been 22,972 website sessions, which translates to roughly 200 incremental
          orders over 4 months, or about 50 extra orders per month since the new lander page completely took over.
        </p>

        <h2>Conclusion</h2>
        <p>In helping the team at Maven Fuzzy Factory, we have successfully:</p>
        <ol>
          <li>
            <strong>Identified where the traffic is coming from</strong>
            <ul>
              <li>Before the 50/50 test, all the traffic arrived at their /home page.</li>
              <li>After the introduction of the /lander-1 page, all traffic was successfully routed to this new page.</li>
              <li>The new /lander-1 page saw a 6% improvement in bounce rate compared to the original /home page.</li>
            </ul>
          </li>
          <li>
            <strong>Improved session volume &amp; conversion rates</strong>
            <ul>
              <li>The session volume was dismal, but after some adjustments, this volume increased.</li>
              <li>The order to session conversion rate improved.</li>
              <li>After bidding on the Desktop version of the website, there was an increase in volume and order to session CVR.</li>
            </ul>
          </li>
          <li>
            <strong>Increase in Revenue &amp; Orders</strong>
            <ul>
              <li>Over $10,000 increase in Revenue due to the new /billing-2 test.</li>
              <li>Over the 4 months that the /lander-1 test was implemented, there were 200 extra orders on the website. That equates to roughly 50 extra orders per month.</li>
            </ul>
          </li>
        </ol>

        <p>
          The full SQL scripts and Python notebooks are available on{" "}
          <a href="https://github.com/JarVoo/Web-Analytics-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>.
        </p>
      </div>
    </>
  );
}
