import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";

// Coherent market sizing (Business Plan) — Italy urban focus
const tiers = [
  { label: "TAM", value: "€48B", desc: "Food-tech consumer globale", at: 0 },
  { label: "SAM", value: "€6.2B", desc: "Europa — meal planning + grocery AI", at: 1 },
  { label: "SOM", value: "€180M", desc: "Italia urbana — early adopter", at: 2 },
];

// Approximate city coords on a 400x500 viewBox
const cities = [
  { name: "Milano", x: 180, y: 130 },
  { name: "Torino", x: 130, y: 145 },
  { name: "Bologna", x: 220, y: 195 },
  { name: "Firenze", x: 225, y: 235 },
  { name: "Roma", x: 245, y: 305 },
  { name: "Napoli", x: 280, y: 355 },
];

const Slide05Market = () => (
  <SlideShell eyebrow="Analisi di mercato" background="white">
    <div className="min-h-[70vh] flex flex-col justify-center">
      <StepReveal at={0}>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-foreground text-center max-w-3xl mx-auto">
          Un mercato urbano.
          <span className="block gradient-primary-text mt-1">Concentrato e scalabile.</span>
        </h2>
      </StepReveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Italy map */}
        <StepReveal at={0} className="flex justify-center">
          <svg viewBox="0 0 400 500" className="w-full max-w-[360px] h-auto">
            {/* Stylized Italy silhouette */}
            <path
              d="M170,60 L200,80 L230,90 L250,110 L240,140 L260,170 L250,200 L270,220 L260,260 L280,290 L300,320 L290,360 L310,390 L290,420 L260,440 L240,430 L230,410 L200,400 L180,380 L170,350 L160,320 L150,290 L160,260 L150,230 L140,200 L150,170 L160,140 L150,110 L160,80 Z"
              fill="hsl(160 36% 36% / 0.08)"
              stroke="hsl(160 36% 36% / 0.4)"
              strokeWidth="1.5"
            />
            {cities.map((c, i) => (
              <g key={c.name}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="6"
                  fill="hsl(222 100% 59%)"
                  style={{
                    animation: `pulse 2.4s ease-in-out ${i * 0.2}s infinite`,
                    transformOrigin: `${c.x}px ${c.y}px`,
                  }}
                />
                <circle cx={c.x} cy={c.y} r="12" fill="none" stroke="hsl(222 100% 59% / 0.3)" />
                <text x={c.x + 14} y={c.y + 4} className="text-[11px] fill-foreground" style={{ fontSize: 11 }}>
                  {c.name}
                </text>
              </g>
            ))}
            <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:0.7}}`}</style>
          </svg>
        </StepReveal>

        {/* TAM/SAM/SOM cards */}
        <div className="flex flex-col gap-4">
          {tiers.map((t) => (
            <StepReveal key={t.label} at={t.at}>
              <GlassCard className="p-6 flex items-center gap-6">
                <div className="text-xs font-bold tracking-[0.24em] text-muted-foreground w-14">{t.label}</div>
                <div className="flex-1">
                  <div className="text-3xl md:text-4xl font-bold gradient-primary-text">{t.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
                </div>
              </GlassCard>
            </StepReveal>
          ))}
        </div>
      </div>

      <StepReveal at={3} className="mt-10 text-center">
        <p className="text-lg md:text-xl text-foreground">
          Partiamo da un mercato urbano, concentrato e scalabile.
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide05Market;
