import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const phases = [
  { title: "MVP Development", desc: "Costruzione del prodotto core: meal planner, dispensa, mood." },
  { title: "Validation", desc: "Test con early adopter urbani, iterazione rapida su retention." },
  { title: "Launch", desc: "Go-to-market su Milano, Roma, Torino. Freemium + Premium." },
  { title: "Partnerships", desc: "Integrazioni con GDO, nutrizionisti e wellness partner." },
  { title: "Ecosystem Expansion", desc: "PlanEat diventa la piattaforma decisionale alimentare." },
];

const Slide13Roadmap = () => {
  const { step } = useStep();
  const current = Math.min(step, phases.length - 1);
  return (
    <SlideShell eyebrow="Roadmap" background="sand">
      <div className="relative min-h-[75vh] flex items-center justify-center">
        {/* Background completed milestones */}
        <div className="absolute inset-x-0 top-20 flex justify-center gap-8">
          {phases.map((p, i) => (
            <div
              key={p.title}
              className={`flex flex-col items-center transition-all duration-500 ${
                i < current ? "opacity-40" : i === current ? "opacity-0" : "opacity-20"
              }`}
            >
              <div
                className={`h-3 w-3 rounded-full ${
                  i < current ? "bg-primary" : "bg-border"
                }`}
              />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                {p.title}
              </span>
            </div>
          ))}
        </div>

        {/* Current phase */}
        <div key={current} className="text-center animate-fade-in">
          <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Fase {String(current + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
          </div>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight text-foreground">
            {phases[current].title}
          </h2>
          <GlassCard className="mt-8 max-w-xl mx-auto p-6">
            <p className="text-base md:text-lg text-foreground">{phases[current].desc}</p>
          </GlassCard>
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide13Roadmap;
