import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

// competitor positions on quadrant (personalizzazione X × integrazione Y)
const competitors = [
  { name: "Yuka",           x: 25, y: 30 },
  { name: "MyFitnessPal",   x: 40, y: 22 },
  { name: "Mealime",        x: 55, y: 32 },
  { name: "Bring!",         x: 30, y: 55 },
  { name: "Too Good To Go", x: 20, y: 45 },
  { name: "KitchenPal",     x: 45, y: 48 },
];

const Slide09MarketGap = () => {
  const { step } = useStep();
  // 0: matrix, 1: competitors, 2: planeat, 3: clear reveal WHITE SPACE, 4: sub-message
  const showCompetitors = step >= 1 && step < 3;
  const showPlanEat = step === 2;
  const revealWhite = step >= 3;
  return (
    <SlideShell eyebrow="White space" background="white">
      <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
        {/* Matrix — bigger */}
        <div className="md:col-span-3 flex justify-center">
          <div className="relative aspect-square w-full max-w-[620px]">
            <div
              className="absolute inset-0 rounded-3xl border border-border transition-all duration-700"
              style={{
                background: revealWhite
                  ? "linear-gradient(135deg, hsl(160 36% 36% / 0.04), hsl(222 100% 59% / 0.04))"
                  : "hsl(30 26% 96%)",
              }}
            />
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              <div className="border-r border-b border-border/60" />
              <div className="border-b border-border/60" />
              <div className="border-r border-border/60" />
              <div />
            </div>
            {/* Axes labels */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground uppercase tracking-widest">
              Personalizzazione →
            </div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 -rotate-90 origin-center text-[11px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              Integrazione →
            </div>

            {/* Highlighted top-right quadrant */}
            <div
              className="absolute top-0 right-0 h-1/2 w-1/2 rounded-tr-3xl transition-all duration-700 pointer-events-none"
              style={{
                background: revealWhite
                  ? "linear-gradient(135deg, hsl(160 36% 36% / 0.28), hsl(222 100% 59% / 0.28))"
                  : "transparent",
                boxShadow: revealWhite ? "inset 0 0 80px hsl(222 100% 59% / 0.35)" : "none",
              }}
            />

            {/* Competitors */}
            {competitors.map((c, i) => (
              <div
                key={c.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{
                  left: `${c.x}%`,
                  top: `${100 - c.y}%`,
                  opacity: showCompetitors ? 1 : revealWhite ? 0.35 : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="h-3.5 w-3.5 rounded-full bg-muted-foreground/80 ring-[6px] ring-muted-foreground/15 shadow-sm" />
                  <span className="text-[11px] text-foreground/70 mt-1.5 block whitespace-nowrap font-semibold tracking-wide">
                    {c.name}
                  </span>
                </div>
              </div>
            ))}

            {/* PlanEat marker */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                left: "80%",
                top: "22%",
                opacity: showPlanEat || revealWhite ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${showPlanEat || revealWhite ? 1 : 0.6})`,
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Pulsing halo rings */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: "radial-gradient(closest-side, hsl(222 100% 59% / 0.35), transparent 70%)",
                    transform: "scale(2.6)",
                    animationDuration: "2.4s",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, hsl(222 100% 59% / 0.55), hsl(160 36% 36% / 0.35) 50%, transparent 75%)",
                    filter: "blur(28px)",
                    transform: "scale(3)",
                  }}
                />
                <div className="relative">
                  <LogoMark size={140} animateIn={false} glow={true} />
                </div>
                <span className="mt-3 text-xs uppercase tracking-[0.3em] gradient-primary-text font-bold">
                  PlanEat
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="md:col-span-2">
          <StepReveal at={3}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">White space</p>
            <h2 className="mt-3 type-premium-tight text-[clamp(3rem,9vw,7rem)] gradient-primary-text">
              WHITE<br />SPACE
            </h2>
          </StepReveal>
          <StepReveal at={4} delay={150}>
            <p className="mt-6 type-premium text-xl md:text-2xl text-foreground max-w-md">
              Alta integrazione.
              <span className="block">Alta personalizzazione.</span>
              <span className="block text-muted-foreground font-medium mt-2 text-base">
                Nessuno occupa questo spazio.
              </span>
            </p>
          </StepReveal>
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide09MarketGap;
