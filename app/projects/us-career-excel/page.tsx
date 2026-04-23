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
      </div>

      <iframe
        src="/projects/us-career-excel/us-career-excel-onepager.html"
        style={{ width: "100%", border: "none", display: "block", height: "4800px" }}
        title="US Career Navigator One-Pager"
      />
    </>
  );
}
