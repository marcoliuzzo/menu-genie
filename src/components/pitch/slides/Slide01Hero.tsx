import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";

const Slide01Hero = () => (
  <SlideShell background="mesh">
    <div className="relative h-[80vh] flex items-center justify-center">
      {/* Step 0: 365 VOLTE huge */}
      <StepReveal at={0} until={2} variant="rise" keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-[clamp(6rem,20vw,17rem)] font-bold tracking-tight leading-[0.9] text-foreground">
          365 <span className="gradient-primary-text">VOLTE</span>
        </h1>
        <StepReveal at={1} until={2} delay={100} className="mt-8">
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">La stessa domanda.</p>
        </StepReveal>
      </StepReveal>

      {/* Step 2: zoom question */}
      <StepReveal at={2} until={3} variant="zoom" keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="text-[clamp(3.5rem,11vw,9rem)] font-bold tracking-tight leading-[1] text-foreground">
          Cosa mangio
          <span className="block gradient-primary-text mt-4">questa sera?</span>
        </h2>
      </StepReveal>

      {/* Step 3: PlanEat as answer */}
      <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center text-center gap-10">
        <GlassCard glow className="px-12 py-10 md:px-16 md:py-14 max-w-2xl">
          <LogoMark size={72} />
          <p className="mt-8 text-xl md:text-2xl text-foreground leading-snug">
            <span className="font-semibold">PlanEat</span> trasforma una decisione quotidiana
            <span className="block text-muted-foreground mt-2 font-light">in un processo automatico.</span>
          </p>
        </GlassCard>
        <StepReveal at={4} delay={150}>
          <p className="text-lg md:text-xl text-foreground/80 font-medium tracking-wide">
            Meno decisioni. <span className="text-muted-foreground">Meno sprechi.</span> <span className="gradient-primary-text font-semibold">Più semplicità.</span>
          </p>
        </StepReveal>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide01Hero;
