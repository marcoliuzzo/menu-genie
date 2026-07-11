import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

const Slide01Hero = () => {
  const { step } = useStep();
  // 0: 365 VOLTE alone
  // 1: + "La stessa domanda."
  // 2: 365 VOLTE ruota via, appare "COSA MANGIO STASERA?"
  // 3: logo + card liquid glass
  // 4: final tagline
  const rotatingOut = step >= 2;

  return (
    <SlideShell background="mesh">
      <div className="relative h-[82vh] flex items-center justify-center">
        {/* 365 VOLTE — steps 0/1, esce ruotando allo step 2 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          style={{
            opacity: rotatingOut ? 0 : 1,
            transform: rotatingOut ? "translateY(120vh) rotate(45deg)" : "translateY(0) rotate(0)",
            transition: "transform 900ms cubic-bezier(0.6,0,0.2,1), opacity 700ms ease-out",
          }}
        >
          <h1 className="type-premium-tight text-[clamp(6rem,22vw,18rem)] text-foreground">
            365 <span className="gradient-primary-text">VOLTE</span>
          </h1>
          <StepReveal at={1} until={2} delay={80} className="mt-8">
            <p className="text-2xl md:text-3xl text-muted-foreground font-light tracking-tight">
              La stessa domanda.
            </p>
          </StepReveal>
        </div>

        {/* Domanda cuore — step 2 */}
        <StepReveal at={2} until={3} variant="zoom" keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="type-premium-tight text-[clamp(3.5rem,12vw,10rem)] text-foreground">
            COSA MANGIO
            <span className="block gradient-primary-text mt-3">STASERA?</span>
          </h2>
        </StepReveal>

        {/* Logo + card risposta — step 3+ */}
        <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center gap-10">
          <LogoMark size={120} />
          <GlassCard glow className="px-14 py-10 md:px-20 md:py-12 max-w-2xl text-center">
            <p className="type-premium text-2xl md:text-3xl text-foreground leading-tight">
              Meno domande.
              <span className="block text-muted-foreground font-medium mt-1">Meno decisioni.</span>
              <span className="block gradient-primary-text mt-1">Più semplicità.</span>
            </p>
          </GlassCard>
          <StepReveal at={4} delay={200}>
            <p className="text-sm md:text-base text-muted-foreground uppercase tracking-[0.32em]">
              PlanEat · Food Decision Ecosystem
            </p>
          </StepReveal>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide01Hero;
