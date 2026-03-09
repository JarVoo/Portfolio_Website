import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US Career Navigator Dashboard in Excel — Jarred Voorneveld",
};

export default function UsCareerExcelPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/us-career-excel/hero.avif"
        alt="US Career Navigator Dashboard in Excel"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Sep 6, 2024</span>
          <span>5 min read</span>
          <span className="post-tag">Excel</span>
        </div>

        <h1>US Career Navigator Dashboard in Excel</h1>

        {/* Introduction */}
        <h2>Introduction</h2>
        <p>
          A non-profit organization that works with high schools across the United States helps
          students find their way in life. When the crucial time comes for these intelligent
          students to decide what they want to become, the organization provides them with the
          tools to help make that decision.
        </p>
        <p>
          I have been tasked with building an interactive Excel dashboard that advisors can use
          during career counselling sessions to walk students through the labour market — covering
          wages, employment share, and year-on-year trends across every major industry sector in
          the United States.
        </p>

        {/* Problem Statement */}
        <h2>Problem Statement</h2>
        <p>
          I have been assigned the lead analyst role to create an interactive dashboard in Excel
          that the organization can use to help students make this vital decision.
        </p>
        <p>
          The data I will be analyzing is sourced from the US Bureau of Labor Statistics and covers
          the years 2017 to 2020, spanning all 50 states and 10 major industry sectors.
        </p>
        <p>
          The aim of the dashboard is to give the students a clear view of the different industries
          that they can enter and what the wages look like. The data ranges from 2017 to 2020
          across the USA.
        </p>
        <p>
          The dashboard needs to be easy to use and understandable by anyone from the age of 16
          and above. It must show average annual wages, share of total employees, wage and
          employment trends over time, and a geographic map view — all driven by a single
          industry slicer.
        </p>
        <p>
          The number of employees and average wages shown in the dashboard will give students a
          realistic picture of what each industry pays and how large its workforce is, helping them
          make a more informed career decision.
        </p>

        {/* The Dashboard */}
        <h2>The Dashboard</h2>
        <p>
          Below is a snapshot of what the dashboard looks like. The slicer on the top left allows
          the user to select an industry, which updates all figures in the dashboard, which I
          find is one of the most valuable features of the dashboard.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/us-career-excel/dashboard-information.png"
          alt="US Career Navigator Dashboard – Information industry selected showing $94K average annual wage"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          The subject of selection in this case was the Information sector, which is one of the
          highest paying sectors in the US. Let me explain the key components of the dashboard,
          which I am confident the students will find very useful:
        </p>
        <ul>
          <li>
            Choosing an industry from the dropdown slicer on the top left will change all the
            figures on the dashboard, allowing a student to explore any sector with a single click.
          </li>
          <li>
            The bar chart on the left shows <strong>Average Annual Wage</strong> ranked by industry.
            The selected industry is highlighted in teal, making it immediately obvious how it
            compares to all others.
          </li>
          <li>
            The donut chart in the middle shows the <strong>Share of Total Employees</strong> for
            the selected industry as a percentage of the entire US workforce.
          </li>
          <li>
            The <strong>Wage &amp; Employee Trends</strong> chart shows how average annual wages
            and total employee numbers have changed year on year from 2017 to 2020.
          </li>
          <li>
            The map on the right can be toggled between <strong>Avg Wages</strong> and{" "}
            <strong>Total Employees per 1,000</strong>, showing geographic variation in wages or
            workforce concentration by state.
          </li>
          <li>
            Changing the slicer immediately refreshes every chart, the donut percentage, the map
            shading, and the trend lines — no manual intervention required.
          </li>
        </ul>

        {/* Insights */}
        <h2>Insights</h2>
        <p>
          As you can see in the first figure above, the Information sector has the highest average
          annual wage at <strong>$94K</strong>, but represents only <strong>2%</strong> of total
          US employees. Wages in this sector grew consistently from $76K in 2017 to $94K in 2020,
          while employment dipped slightly from 2.82M in 2019 to 2.68M in 2020. This suggests a
          highly paid but relatively small and contracting sector — useful context for a student
          weighing a career in tech or media.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/us-career-excel/dashboard-trade-transport.png"
          alt="US Career Navigator Dashboard – Trade & Transportation industry selected showing $49K average annual wage and 23% share of total employees"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Trade &amp; Transportation is in fact the <strong>largest sector</strong> by employee
          count, making up <strong>23%</strong> of total US employees, with an average annual wage
          of <strong>$49K</strong>. Employment was broadly stable at around 27M throughout the
          period, with wages growing from $43K in 2017 to $49K in 2020. The map view showing
          employees per 1,000 capita highlights Wyoming as the most concentrated state for this
          sector — driven by its logistics and natural resource supply chains.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/us-career-excel/dashboard-education-health.png"
          alt="US Career Navigator Dashboard – Education & Health industry selected showing $54K average annual wage and 19% share of total employees"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid var(--color-border)", margin: "1.5rem 0" }}
        />

        <p>
          Finally, Education &amp; Health is the <strong>second largest sector</strong> at{" "}
          <strong>19%</strong> of total employees, with an average annual wage of{" "}
          <strong>$54K</strong>. Wages grew from $48K in 2017 to $54K in 2020 and, notably,
          employment remained the most stable of all sectors across the period — hovering around
          22M. The map shows average wages are relatively consistent across most states, making
          this a reliable career path regardless of geography.
        </p>

        {/* Conclusions */}
        <h2>Conclusions</h2>
        <p>
          I have created an interactive dashboard in Excel that is both easy to use and visually
          engaging for high school students exploring career options. The dashboard covers all
          10 major US industry sectors and allows students and their advisors to quickly compare
          wages, employment size, geographic opportunity, and four-year trends — all from a single
          screen with one slicer.
        </p>
        <p>
          The most valuable insight surfaced by the tool is the trade-off between wage and
          workforce size. Sectors like Information pay very well but employ relatively few people,
          while sectors like Trade &amp; Transportation and Education &amp; Health offer stable,
          widely available employment at competitive wages. Presenting this visually in a classroom
          setting gives students a much clearer foundation for their career conversations than any
          text-based resource could provide.
        </p>
      </div>
    </>
  );
}
