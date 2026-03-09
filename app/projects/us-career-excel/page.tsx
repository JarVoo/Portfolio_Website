import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US Career Navigator Dashboard in Excel — Jarred Voorneveld",
};

export default function UsCareerExcelPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/projects/us-career-hero.png" alt="US Career Navigator Dashboard in Excel" className="post-hero" />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Sep 6, 2024</span>
          <span className="post-tag">Sales Analysis</span>
        </div>

        <h1>US Career Navigator Dashboard in Excel</h1>

        <h2>Introduction</h2>
        <p>
          A recently published report highlighted that over 44% of workers in the United States are employed
          in jobs that pay below a living wage. For high school students making early career decisions, access
          to clear, data-driven labour market information can be the difference between a fulfilling career
          path and one that limits financial independence.
        </p>
        <p>
          This project was built for a non-profit organisation that helps high school students navigate career
          decisions. I was tasked with creating an interactive Excel dashboard that the organisation&apos;s
          advisors could use to guide students through exploring career options, salary expectations, and
          regional job market conditions across the United States.
        </p>

        <h2>Problem Statement</h2>
        <p>
          The organisation needed a tool that was accessible (no specialist software), visual, and interactive
          enough for students to engage with during career counselling sessions. The dashboard had to answer
          key questions a student might have:
        </p>
        <ul>
          <li>What is the median salary for a given profession?</li>
          <li>Which states offer the highest wages for that role?</li>
          <li>How does employment volume differ by region?</li>
          <li>Which industries are growing versus declining?</li>
        </ul>

        <h2>The Dashboard</h2>
        <p>
          The finished dashboard was built entirely in Excel using pivot tables, slicers, and dynamic chart
          ranges. It consisted of three interconnected views:
        </p>
        <ul>
          <li>
            <strong>National Overview</strong> — a bar chart ranking the top 20 professions by median annual
            wage, with a slicer to filter by broad industry sector
          </li>
          <li>
            <strong>State Map View</strong> — a filled US map visualising median wages by state for a
            selected occupation, making regional variation immediately visible
          </li>
          <li>
            <strong>Career Detail Panel</strong> — selecting any profession populated a summary card showing
            median wage, employment count, projected 10-year growth rate, and typical entry-level education
          </li>
        </ul>
        <p>
          All three views updated dynamically from a single slicer selection, keeping the interface simple
          enough for a student to navigate without guidance.
        </p>

        <h2>Insights</h2>
        <p>
          Looking at the data, the highest-paying professions without a four-year degree were concentrated
          in skilled trades and healthcare support — areas with strong projected growth. For example,
          registered nurses and HVAC technicians both featured median salaries above $55,000 and 10-year
          growth projections exceeding 6%.
        </p>
        <p>
          State-level mapping revealed that the same occupation could carry a 40–60% salary premium in
          high cost-of-living states (California, New York, Massachusetts) compared to lower cost-of-living
          states in the South and Midwest — a nuance often missed in national headline figures.
        </p>

        <h2>Tools Used</h2>
        <ul>
          <li><strong>Microsoft Excel</strong> — pivot tables, slicers, dynamic named ranges, filled map charts</li>
          <li><strong>US Bureau of Labor Statistics (BLS)</strong> — occupational employment and wage data source</li>
        </ul>

        <h2>Conclusions</h2>
        <p>
          The US Career Navigator dashboard demonstrated that Excel, when used thoughtfully, can deliver
          an interactive and visually engaging experience without requiring any specialist BI software.
          The non-profit reported that the tool was well received in pilot sessions, with students
          spending significantly more time exploring career options than in previous text-based counselling materials.
        </p>
        <p>
          The key learning from this project was the importance of designing for a non-technical audience —
          every design decision was made with a 16-year-old student as the end user, which forced simplicity
          and clarity above all else.
        </p>
      </div>
    </>
  );
}
