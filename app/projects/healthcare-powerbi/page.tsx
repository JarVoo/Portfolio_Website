import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Healthcare Efficiency Analysis in Power BI — Jarred Voorneveld",
};

export default function HealthcarePowerBIPage() {
  return (
    <>
      {/* 1. Hero image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/healthcare/hero.jpg"
        alt="Healthcare Efficiency Analysis in Power BI"
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
          <span>4 min read</span>
          <span className="post-tag">Healthcare</span>
          <span className="post-tag">Power BI</span>
          <span className="post-tag">Data Analysis</span>
        </div>

        <h1>Healthcare Efficiency Analysis in Power BI</h1>

        {/* 3. Best Certified badge */}
        <div style={{ margin: "1.25rem 0" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--color-bg-light)",
            border: "1px solid var(--color-border)",
            borderRadius: "6px",
            padding: "0.4rem 0.85rem",
            fontSize: "0.72rem",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#f5a623" }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Best Certified
          </div>
        </div>

        {/* 4. Dashboard navigation screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/healthcare/dashboard-home.png"
          alt="HealthStat Dashboard – Home page with navigation tabs"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1rem 0 1.5rem" }}
        />

        {/* 5. Introduction */}
        <h2>Introduction</h2>
        <p>
          This project will assess hospital recovery stay for Elective Hip Replacement procedures over a
          one year period. The dataset is from New York State and contains information on 151 hospitals
          and 26,286 patients. The goal of this project is to identify which hospitals are performing
          above or below the benchmark on length of stay and cost per discharge, and to understand the
          factors that drive variation between facilities.
        </p>
        <p>
          The report was built in Power BI and named <strong>HealthStat</strong>. It consists of four
          pages: Home, Cost Comparison, LOS Comparison, and Hospital Profile. Each page is filterable
          by Health Service Area.
        </p>

        {/* 6. Problem Statement */}
        <h2>Problem Statement</h2>
        <p>
          The data team at a healthcare organisation has been tasked with building a Power BI report to
          help hospital administrators understand how their facilities compare to peers across New York
          State on two key efficiency metrics: average cost per discharge and average length of stay
          (LOS) for elective hip replacement procedures.
        </p>
        <p>
          The report needs to be interactive so that administrators can filter by health service area,
          identify the top and bottom performing hospitals, and understand which patient-level and
          clinical factors most influence performance. The ultimate goal is to support targeted
          improvement programmes at underperforming facilities.
        </p>

        {/* 7. Data Collection and Understanding */}
        <h2>Data Collection and Understanding</h2>
        <p>
          The data was collected from the New York State Department of Health and contains 30,000 rows
          of data across 151 hospitals and 26,286 patient discharges. The data includes information on
          the hospital, the patient, the procedure, and the outcome.
        </p>

        {/* 8. 151 stat image — full width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/healthcare/stat-hospitals.png"
          alt="151 Total Hospitals by health service area"
          style={{ width: "50%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0", display: "block" }}
        />

        <p>
          The dataset spans <strong>151 hospitals</strong> across 8 health service areas in New York
          State. New York City accounts for the largest share with approximately 47 hospitals, followed
          by Hudson Valley, Long Island, and Western NY. The hospitals are spread across the state and
          vary significantly in size, patient volume, and complexity.
        </p>

        {/* 9. 26,286 stat image — full width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/healthcare/stat-discharges.png"
          alt="26,286 Total Discharges by gender and age group"
          style={{ width: "50%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0", display: "block" }}
        />

        <p>
          Total discharges across the period were <strong>26,286</strong>. Female patients accounted
          for 53% of discharges and male patients 46%. The majority of patients fell into the 50–69
          and 70-or-older age groups, which is consistent with the expected demographic for elective
          hip replacement procedures. The average length of stay across all hospitals was
          <strong> 2.65 days</strong>.
        </p>

        {/* 10. Exploratory Data Analysis */}
        <h2>Exploratory Data Analysis</h2>
        <p>
          The average cost per discharge across all hospitals was <strong>$21K</strong>. However, there
          is significant variation between hospitals, with the highest average cost per discharge being
          $85K at NYU Lutheran Medical and the lowest being $7.7K at Newark-Wayne Community Hospital.
          This variation is driven by a number of factors including the health service area, the
          patient&apos;s disposition, and the risk of mortality.
        </p>

        {/* 11. Cost Comparison dashboard */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/healthcare/dashboard-cost.png"
          alt="HealthStat Cost Comparison Dashboard"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          The average length of stay across all hospitals was 2.65 days. However, there is significant
          variation between hospitals, with the highest average LOS being 12.00 days at Kings County
          Hospital and the lowest being 1.37 days at Northern Dutchess Hospital. This variation is
          driven by a number of factors including the severity of illness and the risk of mortality.
        </p>

        {/* 12. LOS Comparison dashboard */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/healthcare/dashboard-los.png"
          alt="HealthStat LOS Comparison Dashboard"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        {/* 13. Insights */}
        <h2>Insights</h2>
        <ul>
          <li>Average Length of Stay (days): 2.65</li>
          <li>Average Cost per Discharge: $21K</li>
          <li>Total Hospitals: 151</li>
          <li>Total Discharges: 26,286</li>
          <li>Top 3 Highest Avg Cost: NYU Lutheran Medical ($85K), Olean General Hospital ($81K), Memorial Hospital ($64K)</li>
          <li>Bottom 3 Lowest Avg Cost: United Memorial Medical ($8.9K), St. Mary&apos;s Healthcare ($8.5K), Newark-Wayne Community ($7.7K)</li>
          <li>Top 3 Highest Avg LOS: Kings County Hospital (12.00), Interfaith Medical Center (9.33), Memorial Hospital (9.10)</li>
          <li>Bottom 3 Lowest Avg LOS: Alice Hyde Medical (1.68), St. Elizabeth Medical (1.56), Northern Dutchess Hospital (1.37)</li>
        </ul>

        {/* 14. Conclusions */}
        <h2>Conclusions</h2>
        <p>
          This project demonstrated how Power BI can be used to build a comprehensive and interactive
          report that enables healthcare administrators to compare hospital performance on key efficiency
          metrics. The Key Influencers visual was particularly powerful in identifying the factors that
          drive variation in LOS and cost per discharge.
        </p>
        <p>
          The wide variation in both cost and LOS across hospitals performing the same elective procedure
          confirms that significant efficiency gains are achievable. The Hospital Profile page allows
          administrators to drill into individual facility detail for targeted follow-up and improvement.
        </p>
      </div>
    </>
  );
}
