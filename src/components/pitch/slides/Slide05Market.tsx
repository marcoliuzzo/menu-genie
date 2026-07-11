import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const tiers = [
  { label: "TAM", value: "€48B", desc: "Food-tech consumer globale", at: 1 },
  { label: "SAM", value: "€6,2B", desc: "Europa — meal planning + grocery AI", at: 2 },
  { label: "SOM", value: "€180M", desc: "Italia urbana — early adopter", at: 3 },
];

// Approximate city coords on a 400x520 viewBox tuned to path below
const cities = [
  { name: "Milano",  x: 155, y: 105 },
  { name: "Torino",  x: 105, y: 118 },
  { name: "Bologna", x: 190, y: 175 },
  { name: "Firenze", x: 195, y: 215 },
  { name: "Roma",    x: 220, y: 295 },
  { name: "Napoli",  x: 260, y: 345 },
];

// More faithful stylised silhouette of Italy
const ITALY_PATH =
  "M150,55 C165,50 185,55 200,70 C215,80 225,95 235,110 C245,120 255,125 260,140 C263,155 255,168 245,175 C240,185 250,200 245,215 C240,230 220,235 215,250 C220,270 240,280 250,295 C260,310 275,315 285,330 C295,345 300,365 295,380 C288,395 275,405 260,405 C245,405 240,395 235,380 C232,368 240,355 232,345 C218,335 205,345 195,335 C185,325 180,310 175,295 C168,280 158,270 152,255 C145,240 140,225 138,210 C136,195 145,180 140,165 C132,150 125,135 128,120 C130,100 138,80 150,55 Z M300,395 C310,395 315,405 312,415 C308,425 295,428 288,420 C282,412 288,398 300,395 Z M85,180 C92,178 98,185 95,192 C92,198 82,200 78,193 C75,186 80,182 85,180 Z";

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
            <div className="relative w-full max-w-[400px]">
              <svg viewBox="0 0 400 480" className="w-full h-auto">
                <defs>
                  <linearGradient id="italyFill" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160 36% 36%)" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="hsl(222 100% 59%)" stopOpacity="0.10" />
                  </linearGradient>
                </defs>
                <path d={ITALY_PATH} fill="url(#italyFill)" stroke="hsl(160 36% 36% / 0.55)" strokeWidth="1.4" strokeLinejoin="round" />
                {cities.map((c, i) => (
                  <g key={c.name}>
                    <circle cx={c.x} cy={c.y} r="14" fill="hsl(222 100% 59% / 0.16)">
                      <animate attributeName="r" values="10;18;10" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                    </circle>
                    <circle cx={c.x} cy={c.y} r="5" fill="hsl(222 100% 59%)" />
                    <text x={c.x + 12} y={c.y + 4} fontSize="11" fontWeight="600" fill="hsl(0 0% 20%)">{c.name}</text>
                  </g>
                ))}
              </svg>
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
                          style={{ maxHeight: active ? 60 : 0, opacity: active ? 1 : 0 }}
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
