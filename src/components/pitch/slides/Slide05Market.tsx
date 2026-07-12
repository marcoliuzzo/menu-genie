import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import italyMap from "@/assets/italy-map.png";

const tiers = [
  { label: "TAM", value: "10-12M", desc: "Popolazione italiana target — meal planning digitale", at: 1 },
  { label: "SAM", value: "2,4-3,1M", desc: "Utenti urbani interessati a soluzioni AI food-tech", at: 2 },
  { label: "SOM", value: "180.000", desc: "Utenti attivi nei primi 3 anni", at: 3 },
];

// Coordinates as % on the uploaded italy-map.png
const cities = [
  { name: "Torino",  x: 20, y: 22 },
  { name: "Milano",  x: 32, y: 19 },
  { name: "Bologna", x: 42, y: 33 },
  { name: "Firenze", x: 45, y: 41 },
  { name: "Roma",    x: 54, y: 56 },
  { name: "Napoli",  x: 64, y: 65 },
];

const Slide05Market = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="Analisi di mercato" background="white">
      <div className="min-h-[75vh] flex flex-col justify-center">
        <StepReveal at={0}>
          <h2 className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground text-center max-w-3xl mx-auto">
            Un mercato urbano.
            <span className="block gradient-primary-text mt-1">Concentrato e scalabile.</span>
          </h2>
        </StepReveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Italy map */}
          <StepReveal at={0} className="flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[5/6]">
              <img
                src={italyMap}
                alt="Italia"
                className="absolute inset-0 w-full h-full object-contain opacity-80"
                draggable={false}
              />
              {cities.map((c, i) => (
                <div
                  key={c.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className="relative flex items-center">
                    <span
                      className="absolute h-4 w-4 rounded-full bg-primary/25"
                      style={{ animation: `mapPulse 2.4s ${i * 0.25}s ease-out infinite` }}
                    />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_3px_hsl(222_100%_59%_/_0.18)]" />
                    <span className="ml-2 text-[11px] font-semibold text-foreground bg-background/70 backdrop-blur px-1.5 py-0.5 rounded">
                      {c.name}
                    </span>
                  </div>
                </div>
              ))}
              <style>{`@keyframes mapPulse{0%{transform:scale(0.6);opacity:0.7}80%{transform:scale(2.6);opacity:0}100%{transform:scale(2.6);opacity:0}}`}</style>
            </div>
          </StepReveal>

          {/* TAM/SAM/SOM cards */}
          <div className="flex flex-col gap-4">
            {tiers.map((t) => {
              const active = step === t.at;
              const past = step > t.at;
              const dim = step >= 1 && !active && !past;
              return (
                <StepReveal key={t.label} at={t.at}>
                  <GlassCard
                    glow={active}
                    className="transition-all duration-700 ease-out"
                    style={{
                      padding: active ? "1.6rem 1.75rem" : "0.9rem 1.25rem",
                      transform: active ? "scale(1.02)" : "scale(1)",
                      opacity: dim ? 0.4 : 1,
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-[11px] font-bold tracking-[0.28em] text-muted-foreground w-14">{t.label}</div>
                      <div className="flex-1">
                        <div
                          className="type-premium gradient-primary-text transition-all duration-500"
                          style={{ fontSize: active ? "clamp(2rem,4vw,3rem)" : "clamp(1.25rem,2.4vw,1.75rem)" }}
                        >
                          {t.value}
                        </div>
                        <div
                          className="text-sm text-muted-foreground mt-1 transition-all duration-500 overflow-hidden"
                          style={{ maxHeight: active ? 80 : 0, opacity: active ? 1 : 0 }}
                        >
                          {t.desc}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </StepReveal>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-muted-foreground/70">
          Fonti: Statista Food Tech 2024 · Osservatorio eCommerce B2C Polimi · McKinsey Digital Grocery EU
        </p>
      </div>
    </SlideShell>
  );
};

export default Slide05Market;
