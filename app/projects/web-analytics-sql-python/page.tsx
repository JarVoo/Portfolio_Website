import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Analytics Project Using SQL & Python — Jarred Voorneveld",
};

export default function WebAnalyticsSqlPythonPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/web-analytics/hero.webp"
        alt="Web Analytics Project Using SQL & Python"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

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
      </div>

      <iframe
        src="/projects/web-analytics/web-analytics-onepager.html"
        style={{ width: "100%", border: "none", display: "block", height: "7700px" }}
        title="Web Analytics One-Pager"
      />
    </>
  );
}
