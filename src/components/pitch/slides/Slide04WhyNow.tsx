import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { Brain, ShoppingBag, Recycle, Sparkles } from "lucide-react";

const drivers = [
  { icon: Brain, label: "AI", desc: "Modelli accessibili e personalizzati" },
  { icon: ShoppingBag, label: "Digital Grocery", desc: "GDO online in crescita costante" },
  { icon: Recycle, label: "Food Waste", desc: "Consapevolezza anti-spreco crescente" },
  { icon: Sparkles, label: "Semplicità", desc: "Sovraccarico decisionale quotidiano" },
];

const Slide04WhyNow = () => {
  const { step } = useStep();
  // step 0 title; 1-4 activate each card (index i-1 highlighted); step 4 also shows final line
  const focus = step >= 1 && step <= 4 ? step - 1 : -1;
  return (
    <SlideShell eyebrow="Perché ora" background="mesh">
      <div className="min-h-[75vh] flex flex-col justify-center">
        <StepReveal at={0}>
          <h2 className="type-premium text-[clamp(2rem,4.5vw,3.25rem)] text-foreground max-w-3xl">
            Quattro forze convergono.
            <span className="block gradient-primary-text mt-1">Oggi è il momento.</span>
          </h2>
        </StepReveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {drivers.map((d, i) => {
            const active = focus === i;
            const dim = focus !== -1 && !active;
            return (
              <StepReveal key={d.label} at={i + 1} delay={0}>
                <GlassCard
                  glow={active}
                  className="p-7 min-h-[220px] transition-all duration-500 ease-out"
                  style={{
                    transform: active ? "translateY(-6px) scale(1.04)" : "scale(1)",
                    opacity: dim ? 0.35 : 1,
                    filter: dim ? "blur(2px)" : "blur(0)",
                  }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">
                    <d.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="type-premium text-xl text-foreground">{d.label}</div>
                  <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</div>
                </GlassCard>
              </StepReveal>
            );
          })}
        </div>

        <StepReveal at={4} delay={250} className="mt-12 text-center">
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Le decisioni alimentari diventano più complesse.
            <span className="block text-muted-foreground">Gli strumenti per gestirle sono ancora frammentati.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide04WhyNow;
