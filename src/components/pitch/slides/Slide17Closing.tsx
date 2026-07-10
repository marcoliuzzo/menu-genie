import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";

const Slide17Closing = () => (
  <SlideShell background="mesh">
    <div className="relative h-[80vh] flex items-center justify-center">
      <StepReveal at={0} until={2} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight leading-[1.05] text-foreground max-w-4xl">
          Le persone non hanno bisogno
          <span className="block mt-2">di più ricette.</span>
        </h2>
      </StepReveal>

      <StepReveal at={1} until={2} variant="rise" keepSpace={false} className="absolute inset-x-0 bottom-1/4 text-center" delay={200}>
        {/* subtle build-up */}
        <div className="h-px w-24 bg-border mx-auto" />
      </StepReveal>

      <StepReveal at={2} until={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-tight leading-[1.05] gradient-primary-text max-w-4xl">
          Hanno bisogno
          <span className="block mt-2">di meno decisioni.</span>
        </h2>
      </StepReveal>

      <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6">
        <LogoMark size={120} />
        <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-[0.28em]">
          Food Decision Ecosystem
        </p>
        <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-xl">
          Trasformiamo la complessità alimentare in semplicità quotidiana.
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide17Closing;
