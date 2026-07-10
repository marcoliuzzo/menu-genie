import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { Brain, ShoppingBag, Recycle, Sparkles } from "lucide-react";

const drivers = [
  { icon: Brain, label: "AI", desc: "Modelli accessibili e personalizzati" },
  { icon: ShoppingBag, label: "Digital Grocery", desc: "GDO online in crescita costante" },
  { icon: Recycle, label: "Food Waste", desc: "Consapevolezza anti-spreco crescente" },
  { icon: Sparkles, label: "Simplicità", desc: "Sovraccarico decisionale quotidiano" },
];

const Slide04WhyNow = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="Perché ora" background="mesh">
      <div className="min-h-[70vh] flex flex-col justify-center">
        <StepReveal at={0}>
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-foreground max-w-3xl">
            Quattro forze convergono.
            <span className="block gradient-primary-text mt-1">Oggi è il momento.</span>
          </h2>
        </StepReveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 relative">
          {drivers.map((d, i) => {
            const active = step >= i;
            return (
              <StepReveal key={d.label} at={i} delay={i * 40}>
                <GlassCard
                  glow={active && step < 4}
                  className={`p-6 min-h-[200px] transition-all duration-500 ${
                    active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <d.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-lg font-bold text-foreground">{d.label}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{d.desc}</div>
                </GlassCard>
              </StepReveal>
            );
          })}

          {/* Connecting lines at final step */}
          <StepReveal at={4} keepSpace={false} className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <line x1="50" y1="100" x2="150" y2="100" stroke="hsl(160 36% 36% / 0.5)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="150" y1="100" x2="250" y2="100" stroke="hsl(160 36% 36% / 0.5)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="250" y1="100" x2="350" y2="100" stroke="hsl(222 100% 59% / 0.5)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </StepReveal>
        </div>

        <StepReveal at={4} delay={200} className="mt-14 text-center">
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Le decisioni alimentari diventano sempre più complesse.
            <span className="block text-muted-foreground">Gli strumenti per gestirle sono ancora frammentati.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide04WhyNow;
