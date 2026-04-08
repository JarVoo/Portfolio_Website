"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

type Filter = "all" | "e-commerce" | "health-care" | "sales-analysis" | "web-analysis" | "operations-analysis";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All Posts", value: "all" },
  { label: "E-Commerce", value: "e-commerce" },
  { label: "Health Care", value: "health-care" },
  { label: "Sales Analysis", value: "sales-analysis" },
  { label: "Web Analysis", value: "web-analysis" },
  { label: "Operations Analysis", value: "operations-analysis" },
];

const PROJECTS: {
  slug: string;
  category: Exclude<Filter, "all">;
  date: string;
  title: string;
  excerpt: string;
  thumb: string;
}[] = [
  {
    slug: "olist-ecommerce",
    category: "e-commerce",
    date: "Jul 28, 2024",
    title: "E-Commerce Project – Olist Brazilian Online Marketplace",
    excerpt:
      "I was excited to find a real-world ecommerce dataset with multiple relatable tables. I was bored of working on datasets that didn't seem to add any value to my learning. I wanted to develop skills that would directly translate to a real work environment…",
    thumb: "/projects/olist-thumb.png",
  },
  {
    slug: "amazon-sql",
    category: "sales-analysis",
    date: "Oct 2, 2024",
    title: "Amazon USA Sales Analysis Project using SQL",
    excerpt:
      "Difficulty level: Advanced | GitHub Link — I have worked on analyzing a dataset of Amazon USA sales to uncover trends, top-performing categories, and actionable business insights…",
    thumb: "/projects/amazon-thumb.jpg",
  },
  {
    slug: "pet-store-powerbi",
    category: "e-commerce",
    date: "Sep 4, 2024",
    title: "E-Commerce Performance Analysis – Online Pet Store in Power BI",
    excerpt:
      "A full end-to-end Power BI project analysing the performance of Whiskique, a US-based online pet store — covering display ad results, shipping metrics, market basket analysis, and an executive summary dashboard…",
    thumb: "/projects/pet-store/hero.webp",
  },
  {
    slug: "healthcare-powerbi",
    category: "health-care",
    date: "Sep 4, 2024",
    title: "Healthcare Efficiency Analysis in Power BI",
    excerpt:
      "An analytical deep-dive into hospital efficiency across 151 facilities and 26,294 patients undergoing Elective Hip Replacement procedures. Using Power BI to explore patient outcomes, length of stay, and resource utilisation…",
    thumb: "/projects/healthcare/hero.jpg",
  },
  {
    slug: "us-career-excel",
    category: "sales-analysis",
    date: "Sep 6, 2024",
    title: "US Career Navigator Dashboard in Excel",
    excerpt:
      "An interactive Excel dashboard built for a non-profit to help high school students navigate career decisions — visualising median wages by profession, industry, and state across the United States with dynamic filtering…",
    thumb: "/projects/us-career-thumb.jpg",
  },
  {
    slug: "inventory-analysis",
    category: "operations-analysis",
    date: "Apr 8, 2026",
    title: "Retail Inventory Intelligence – S3, Snowflake, dbt & Power BI",
    excerpt:
      "An end-to-end analytics pipeline diagnosing stockout risk, overstock patterns, and reorder optimisation across a retail inventory system using Amazon S3, Snowflake, dbt Core, and Power BI…",
    thumb: "/projects/inventory-analysis/2148767163.jpg",
  },
  {
    slug: "web-analytics-sql-python",
    category: "web-analysis",
    date: "Sep 4, 2024",
    title: "Web Analytics Project Using SQL & Python",
    excerpt:
      "A website traffic analysis for Maven Fuzzy Factory combining SQL and Python to investigate traffic sources, conversion funnels, and session performance — including identifying and resolving data anomalies in the tracking pipeline…",
    thumb: "/projects/web-analytics-thumb.jpg",
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visible = PROJECTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <>
      <div className="page-header">
        <h1>Projects</h1>
      </div>

      <div className="filter-tabs">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={cn(activeFilter === value && "active")}
            onClick={() => setActiveFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="projects-list">
        {visible.map((project) => (
          <div key={project.slug} className="relative rounded-xl border border-[var(--color-border)]">
            <GlowingEffect
              spread={50}
              glow={true}
              disabled={false}
              proximity={80}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <Link
              href={`/projects/${project.slug}`}
              className="project-card relative"
              style={{ borderBottom: "none" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.thumb}
                alt={project.title}
                className="project-card-thumb"
              />
              <div className="project-info">
                <p className="project-date">{project.date}</p>
                <h2>{project.title}</h2>
                <p className="project-excerpt">{project.excerpt}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
