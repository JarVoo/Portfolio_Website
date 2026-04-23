import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Olist E-Commerce Project — Jarred Voorneveld",
};

export default function OlistPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/olist-ecommerce/hero.png"
        alt="E-Commerce Project – Olist Brazilian Online Marketplace"
        className="post-hero"
        style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
      />

      <div className="post-content">
        <Link className="back-link" href="/projects">
          ← Back to Projects
        </Link>

        <div className="post-meta">
          <span>Jul 28, 2024</span>
          <span className="post-tag">E-Commerce</span>
        </div>

        <h1>E-Commerce Project – Olist Brazilian Online Marketplace</h1>
      </div>

      <iframe
        src="/projects/olist-ecommerce/olist-onepager.html"
        style={{ width: "100%", border: "none", display: "block", height: "7800px" }}
        title="Olist E-Commerce One-Pager"
      />
    </>
  );
}
