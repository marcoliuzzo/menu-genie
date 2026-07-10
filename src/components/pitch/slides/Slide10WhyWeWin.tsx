import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";
import { CalendarDays, Package, ShoppingCart, Sparkles, Brain, Layers, Check } from "lucide-react";

const capabilities = [
  { label: "Meal Planning", icon: CalendarDays, competitor: true },
  { label: "Gestione Dispensa", icon: Package, competitor: true },
  { label: "Lista Spesa", icon: ShoppingCart, competitor: true },
  { label: "Personalizzazione AI", icon: Brain, competitor: false },
  { label: "Mood Planning", icon: Sparkles, competitor: false },
  { label: "Ecosistema Integrato", icon: Layers, competitor: false },
];

const Slide10WhyWeWin = () => {
  const { step } = useStep();
  const converged = step >= 6;
  // 7 steps: 0 intro, 1-6 activate each card, then converge on last
  // We use 7 steps total; converge triggers at step 6.
  return (
    <SlideShell eyebrow="Perché vinciamo" background="mesh">
      <div className="relative min-h-[75vh] flex items-center justify-center">
        {/* Central logo */}
        <StepReveal at={6} variant="scale" keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <GlassCard glow className="h-56 w-56 rounded-full flex items-center justify-center">
            <LogoMark size={72} />
          </GlassCard>
        </StepReveal>

        {/* Radial cards */}
        <div className="relative h-[520px] w-[520px] md:h-[560px] md:w-[560px]">
          {capabilities.map((c, i) => {
            const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 220;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const active = step >= i + 1 || step === 0;
            const highlighted = step === i + 1;
            return (
              <div
                key={c.label}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: converged
                    ? "translate(-50%,-50%) scale(0.3)"
                    : `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity: converged ? 0 : active ? 1 : 0.35,
                  transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease-out",
                }}
              >
                <GlassCard
                  glow={highlighted}
                  className={`px-5 py-4 min-w-[180px] transition-all ${
                    highlighted ? "scale-105" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <c.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{c.label}</span>
                    {highlighted && <Check className="h-4 w-4 text-accent ml-auto" />}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c.competitor ? "Anche competitor" : "Solo PlanEat"}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <StepReveal at={6} delay={200} className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-tight text-foreground max-w-4xl mx-auto">
            PlanEat è l'unica piattaforma che integra
            <span className="block gradient-primary-text">l'intero processo decisionale alimentare.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide10WhyWeWin;
