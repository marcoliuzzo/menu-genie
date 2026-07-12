import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const nodes = [
  { label: "Utenti",          desc: "Nuovi utenti entrano nell'ecosistema PlanEat." },
  { label: "Dati Grezzi",     desc: "Ogni interazione dell'utente genera nuovi dati per l'algoritmo." },
  { label: "AI",              desc: "I modelli migliorano su preferenze, mood e dispensa." },
  { label: "Personalizzazione", desc: "Il piano diventa sempre più preciso e rilevante." },
  { label: "Retention",       desc: "Più valore percepito. Più uso ricorrente. Più utenti." },
];

const Slide12Flywheel = () => {
  const { step } = useStep();
  const activeIdx = Math.min(step, nodes.length - 1);
  return (
    <SlideShell eyebrow="Data flywheel" background="mesh">
      <div className="relative min-h-[78vh] grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        {/* Left: spiral flow */}
        <div className="md:col-span-3 relative h-[560px] flex items-center justify-center">
          {/* Spiral SVG background */}
          <svg viewBox="0 0 500 560" className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="spiralGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(160 36% 36%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(222 100% 59%)" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            {/* Growing spiral / flow path */}
            <path
              d="M 60 500 Q 180 480 220 420 T 320 320 T 260 200 T 380 120 T 460 60"
              fill="none"
              stroke="url(#spiralGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            {/* Arrow tip */}
            <polygon points="460,60 448,58 452,72" fill="hsl(222 100% 59%)" />
          </svg>

          {/* Node cards along the spiral (positioned absolutely) */}
          {[
            { label: nodes[0].label, top: "82%", left: "10%",  size: 84  },
            { label: nodes[1].label, top: "62%", left: "34%",  size: 100 },
            { label: nodes[2].label, top: "42%", left: "56%",  size: 118 },
            { label: nodes[3].label, top: "24%", left: "40%",  size: 138 },
            { label: nodes[4].label, top: "8%",  left: "68%",  size: 168 },
          ].map((p, i) => {
            const active = i === activeIdx;
            const passed = i < activeIdx;
            return (
              <div
                key={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                style={{
                  top: p.top,
                  left: p.left,
                  opacity: active ? 1 : passed ? 0.7 : 0.35,
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    height: p.size,
                    width: p.size,
                    background: active
                      ? "linear-gradient(135deg, hsl(160 36% 36% / 0.24), hsl(222 100% 59% / 0.28))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.25))",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: active
                      ? "0 20px 60px -14px hsl(222 100% 59% / 0.45), 0 0 0 1px hsl(222 100% 59% / 0.25)"
                      : "0 12px 32px -12px rgba(20,25,40,0.18)",
                    transform: active ? "scale(1.08)" : "scale(1)",
                    transition: "all 700ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <span
                    className={`type-premium text-center px-3 ${
                      active ? "gradient-primary-text" : "text-foreground"
                    }`}
                    style={{ fontSize: Math.max(13, p.size * 0.16) }}
                  >
                    {p.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: focus card */}
        <div className="md:col-span-2">
          <div key={activeIdx} className="animate-fade-in">
            <div className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              Step {String(activeIdx + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
            </div>
            <h3 className="mt-3 type-premium text-4xl md:text-5xl gradient-primary-text">
              {nodes[activeIdx].label}
            </h3>
            <GlassCard className="mt-6 p-6">
              <p className="text-base md:text-lg text-foreground/85">{nodes[activeIdx].desc}</p>
            </GlassCard>
          </div>

          <StepReveal at={4} delay={200} className="mt-8">
            <p className="type-premium text-[clamp(1.75rem,3.6vw,2.75rem)] text-foreground leading-tight">
              Ogni ciclo rende PlanEat
              <span className="block gradient-primary-text">più intelligente.</span>
            </p>
          </StepReveal>
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide12Flywheel;
