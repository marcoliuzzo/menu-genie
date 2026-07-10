import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

// competitor positions on quadrant (personalizzazione X × integrazione Y)
const competitors = [
  { name: "Yuka",         x: 25, y: 30 },
  { name: "MyFitnessPal", x: 40, y: 20 },
  { name: "Mealime",      x: 55, y: 35 },
  { name: "Bring!",       x: 30, y: 55 },
  { name: "Too Good To Go", x: 20, y: 45 },
];

const Slide09MarketGap = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="White space" background="white">
      <div className="min-h-[75vh] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Matrix */}
        <div className="relative aspect-square w-full max-w-[480px] mx-auto">
          <div className="absolute inset-0 border border-border rounded-2xl bg-secondary/30" />
          {/* Axes labels */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground uppercase tracking-widest">
            Personalizzazione →
          </div>
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
            Integrazione →
          </div>
          {/* Quadrant highlight */}
          <StepReveal at={2} keepSpace={false} className="absolute inset-0">
            <div
              className="absolute top-0 right-0 h-1/2 w-1/2 rounded-tr-2xl transition-all duration-700"
              style={{
                background:
                  "linear-gradient(135deg, hsl(160 36% 36% / 0.25), hsl(222 100% 59% / 0.25))",
                boxShadow: step >= 3 ? "inset 0 0 60px hsl(160 36% 36% / 0.4)" : "none",
              }}
            />
          </StepReveal>
          {/* Competitors */}
          <StepReveal at={0} keepSpace={false} className="absolute inset-0">
            {competitors.map((c, i) => (
              <div
                key={c.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${c.x}%`,
                  top: `${100 - c.y}%`,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="text-[10px] text-muted-foreground mt-1 block whitespace-nowrap">
                  {c.name}
                </span>
              </div>
            ))}
          </StepReveal>
          {/* PlanEat */}
          <StepReveal at={3} keepSpace={false} className="absolute inset-0">
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "80%", top: "20%" }}
            >
              <div className="flex flex-col items-center">
                <LogoMark size={44} />
                <span className="text-xs font-bold text-foreground mt-1 uppercase tracking-widest">
                  PlanEat
                </span>
              </div>
            </div>
          </StepReveal>
        </div>

        {/* Text */}
        <div>
          <StepReveal at={2}>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">White space</p>
            <h2 className="mt-3 text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight leading-[0.95] gradient-primary-text">
              WHITE<br />SPACE
            </h2>
          </StepReveal>
          <StepReveal at={3} delay={150}>
            <p className="mt-6 text-lg md:text-xl text-foreground max-w-md">
              Alta integrazione.
              <span className="block text-foreground">Alta personalizzazione.</span>
              <span className="block text-muted-foreground mt-2">Nessuno occupa questo spazio.</span>
            </p>
          </StepReveal>
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide09MarketGap;
