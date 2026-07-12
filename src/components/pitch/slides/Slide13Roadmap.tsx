import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const phases = [
  { title: "MVP Development",   desc: "Costruzione del prodotto core: meal planner, dispensa, mood." },
  { title: "Validation",        desc: "Test con early adopter urbani, iterazione rapida su retention." },
  { title: "Launch",            desc: "Go-to-market su Milano, Roma, Torino, Bologna, Firenze e Napoli. Freemium + Premium." },
  { title: "Partnerships",      desc: "Collaborazioni con nutrizionisti e wellness partner." },
  { title: "Ecosystem Expansion", desc: "PlanEat diventa la piattaforma decisionale alimentare." },
];

const Slide13Roadmap = () => {
  const { step } = useStep();
  const current = Math.min(step, phases.length - 1);
  return (
    <SlideShell eyebrow="Roadmap" background="sand">
      <div className="relative min-h-[78vh] flex flex-col items-center justify-center">
        {/* Top milestones bar */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-14">
          {phases.map((p, i) => {
            const isPast = i < current;
            const isCurrent = i === current;
            return (
              <div key={p.title} className="flex-1 flex flex-col items-center relative">
                {/* connector */}
                {i > 0 && (
                  <div
                    className="absolute right-1/2 top-2 h-px transition-all duration-500"
                    style={{
                      width: "100%",
                      background: isPast || isCurrent ? "hsl(222 100% 59% / 0.6)" : "hsl(30 12% 88%)",
                    }}
                  />
                )}
                <div
                  className="relative h-4 w-4 rounded-full transition-all duration-500"
                  style={{
                    background: isCurrent
                      ? "hsl(222 100% 59%)"
                      : isPast
                      ? "hsl(160 36% 36%)"
                      : "hsl(30 12% 82%)",
                    boxShadow: isCurrent
                      ? "0 0 0 6px hsl(222 100% 59% / 0.18), 0 0 24px hsl(222 100% 59% / 0.55)"
                      : "none",
                  }}
                />
                <span
                  className={`mt-3 text-[10px] uppercase tracking-widest text-center max-w-[110px] transition-all ${
                    isCurrent
                      ? "text-foreground font-semibold"
                      : isPast
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {p.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current phase card */}
        <div key={current} className="text-center animate-fade-in max-w-2xl">
          <div className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Fase {String(current + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
          </div>
          <h2 className="mt-4 type-premium text-[clamp(2.5rem,6vw,4.5rem)] gradient-primary-text">
            {phases[current].title}
          </h2>
          <GlassCard glow className="mt-8 max-w-xl mx-auto p-7">
            <p className="text-base md:text-lg text-foreground">{phases[current].desc}</p>
          </GlassCard>
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide13Roadmap;
