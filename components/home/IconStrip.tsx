"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

const items = [
  {
    label: "AI Powered Insights",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="#fff" fill="none" strokeWidth={1.5}>
        <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.16 13.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M19.07 4.93l-.7.7" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    label: "Data-Driven Solutions",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="#fff" fill="none" strokeWidth={1.5}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Data Integrity",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="#fff" fill="none" strokeWidth={1.5}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Interactive Dashboards",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="#fff" fill="none" strokeWidth={1.5}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function IconStrip() {
  return (
    <section className="icon-strip">
      <div className="icon-strip-inner">
        {items.map((item) => (
          <div key={item.label} className="relative rounded-2xl transition-transform duration-200 ease-out hover:scale-110">
            <GlowingEffect
              spread={35}
              glow={true}
              disabled={false}
              proximity={60}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <div
              className="icon-item relative rounded-2xl py-6 px-4"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="icon-circle">{item.icon}</div>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
