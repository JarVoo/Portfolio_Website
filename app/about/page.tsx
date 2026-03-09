"use client";

import { Globe } from "@/components/ui/interactive-globe";

const glassCard: React.CSSProperties = {
  background: "rgba(22, 26, 34, 0.82)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "14px",
  flex: 1,
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: "190px",
};

interface TravelCard {
  location: string;
  role: string;
  photo: string;
}

const leftCards: TravelCard[] = [
  {
    location: "Cape Town, South Africa",
    role: "Born & Raised · Marine Science & Statistics",
    photo: "/travel/cape-town.jpg",
  },
  {
    location: "Ho Chi Minh City, Vietnam",
    role: "Math & Science Teacher",
    photo: "/travel/vietnam.jpg",
  },
  {
    location: "Mallorca, Spain",
    role: "Officer of Logistics, Super Yacht",
    photo: "/travel/mallorca.jpg",
  },
];

const rightCards: TravelCard[] = [
  {
    location: "Wellington, New Zealand",
    role: "Solo hiked 3,000 km South to North",
    photo: "/travel/new-zealand.jpg",
  },
  {
    location: "SANAE IV, Antarctica",
    role: "Research & Data Collection Expedition",
    photo: "/travel/antarctica.jpg",
  },
  {
    location: "Gibraltar",
    role: "Began career as a Data Analyst",
    photo: "/travel/gibraltar.jpg",
  },
];

function TravelCardContent({ card }: { card: TravelCard }) {
  return (
    <>
      {/* Left: text content */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "rgba(255, 255, 255, 0.92)",
            lineHeight: 1.3,
          }}
        >
          {card.location}
        </span>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.5)",
            lineHeight: 1.5,
          }}
        >
          {card.role}
        </span>
      </div>

      {/* Right: photo */}
      <div
        style={{
          backgroundImage: `url(${card.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <h1>About Me</h1>
      </div>

      <div className="about-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/jarred-photo.jpg" alt="Jarred Voorneveld" className="about-photo" />

        <div className="about-text">
          <h2>Jarred Voorneveld</h2>

          <p>
            I&apos;m a data analyst with a strong focus on ecommerce and web analytics. I thrive on the process of
            uncovering insights through a structured, methodical approach, driven by my passion for understanding
            the &apos;why&apos; behind the numbers. My background as a marine scientist taught me the power of data and
            ignited my desire to explore what it can reveal.
          </p>

          <p>
            I take pride in delivering organized, high-quality work, and nothing excites me more than sharing my
            findings with others — whether it&apos;s answering questions or breaking down how I achieved results. For
            me, knowledge is meant to be shared, and I always strive to help others benefit from what I&apos;ve learned.
          </p>

          <p>
            In my free time, I enjoy multiday hiking, practicing in kettlebell sports and reading. These hobbies
            reflect my determination and persistence, qualities I bring to every project I tackle. I believe that
            hard work, passion, and a little grit are the keys to success, both in life and in data analysis.
          </p>

          <div className="contact-block">
            <h3>Contact</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:jkvoorneveld@gmail.com">jkvoorneveld@gmail.com</a>
            </p>
            <p>
              <strong>Phone:</strong> +34 697 813 022
            </p>
            <p>
              <strong>Location:</strong> Spain
            </p>
          </div>
        </div>
      </div>

      {/* Globe section */}
      <div
        style={{
          background: "var(--color-bg-light)",
          padding: "4rem 2rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "36px",
            fontWeight: 700,
            color: "var(--color-text)",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          My Experiences
        </h2>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--color-text-light)",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Hover to pause · Drag to rotate
        </p>

        {/* 3-column layout: cards | globe | cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "1.5rem",
            alignItems: "stretch",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {/* Left cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {leftCards.map((card) => (
              <div key={card.location} style={glassCard}>
                <TravelCardContent card={card} />
              </div>
            ))}
          </div>

          {/* Globe */}
          <Globe size={576} />

          {/* Right cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {rightCards.map((card) => (
              <div key={card.location} style={glassCard}>
                <TravelCardContent card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
