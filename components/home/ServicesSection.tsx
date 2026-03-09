"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";

const services = [
  {
    title: "Data Visualizations",
    description: "Dashboarding in Power BI & Tableau",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3v18h18v-2H5V3H3zm4 10h2v5H7v-5zm4-6h2v11h-2V7zm4 3h2v8h-2v-8z" />
      </svg>
    ),
  },
  {
    title: "Data Cleaning & Exploration",
    description: "SQL & Python",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2.05V13h10.95A10 10 0 0 0 11 2.05zM13 2.05V11h8.95A10.01 10.01 0 0 0 13 2.05zM2 13c0 5.52 4.48 10 10 10s10-4.48 10-10H2z" />
      </svg>
    ),
  },
  {
    title: "Meaningful Insights",
    description: "Statistical Analysis & Story Telling",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1a1a1a" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section className="services">
      <h2>Services</h2>
      <p className="services-desc">
        As a dedicated data analyst specializing in ecommerce and web analytics, my expertise extends to
        efficient database management, ensuring that your data is not only well-organized but also strategically
        leveraged to drive growth and enhance performance. Whether you need to optimize your online store,
        understand user behavior, or manage your data more effectively, I&apos;m here to provide the analytical
        solutions you need to succeed.
      </p>
      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.title}
            className="relative rounded-[1.25rem] border border-[var(--color-border)] p-2"
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <div className="service-card relative rounded-xl bg-[var(--color-bg-light)] p-6">
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
