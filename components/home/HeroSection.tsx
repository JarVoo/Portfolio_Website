import { EtheralShadow } from "@/components/ui/etheral-shadow";

export function HeroSection() {
  return (
    <section className="hero">
      <EtheralShadow
        color="rgba(0, 140, 160, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
        style={{ position: "absolute", inset: 0 }}
      />
      <div className="hero-content">
        <h1>
          Jarred Voorneveld
          <br />
          Data Analyst Portfolio
        </h1>
      </div>
    </section>
  );
}
