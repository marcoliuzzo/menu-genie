import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const orbits = ["Retail", "Nutrizione", "AI", "Wellness", "Personalizzazione"];

const Slide16Vision = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="Vision" background="mesh">
      <div className="relative h-[75vh] flex items-center justify-center">
        {/* Step 0: small "App di Meal Planning" */}
        <StepReveal at={0} until={1} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">App di Meal Planning</p>
        </StepReveal>

        {/* Step 1: zoom out */}
        <StepReveal at={1} until={2} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-foreground/80">Non è solo un'app.</p>
        </StepReveal>

        {/* Step 2+: giant title */}
        <StepReveal at={2} variant="zoom" keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="text-[clamp(2rem,7vw,5.5rem)] font-bold tracking-tight leading-[0.95] gradient-primary-text">
            FOOD DECISION
            <span className="block">OPERATING SYSTEM</span>
          </h2>
        </StepReveal>

        {/* Step 3+: logo center + orbit */}
        <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[540px] w-[540px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <GlassCard glow className="h-44 w-44 rounded-full flex items-center justify-center">
                <LogoMark size={64} />
              </GlassCard>
            </div>
            <div
              className="absolute inset-0"
              style={{ animation: "orbit 30s linear infinite" }}
            >
              {orbits.map((o, i) => {
                const angle = (i / orbits.length) * Math.PI * 2 - Math.PI / 2;
                const r = 240;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={o}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <GlassCard className="px-4 py-2">
                      <span className="text-sm font-semibold text-foreground">{o}</span>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
            <div
              className="absolute inset-0 rounded-full border border-dashed border-border/60"
              style={{ margin: 30 }}
            />
            <style>{`@keyframes orbit{to{transform:rotate(360deg)}}`}</style>
          </div>
        </StepReveal>

        {/* Final message */}
        <StepReveal at={4} className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-tight text-foreground max-w-4xl mx-auto">
            Costruire il sistema operativo
            <span className="block gradient-primary-text">delle decisioni alimentari.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide16Vision;
