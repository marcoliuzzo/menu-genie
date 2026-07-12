import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";

const Slide17Closing = () => (
  <SlideShell background="mesh">
    <div className="relative h-[85vh] flex items-center justify-center">
      {/* Step 0 */}
      <StepReveal at={0} until={1} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] text-foreground max-w-4xl leading-[1.05]">
          Le persone non hanno bisogno
          <span className="block mt-3">di più ricette.</span>
        </h2>
      </StepReveal>

      {/* Step 1 */}
      <StepReveal at={1} until={2} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] max-w-4xl leading-[1.05]">
          <span className="text-foreground">Hanno bisogno</span>
          <span className="block gradient-primary-text mt-3">di meno decisioni.</span>
        </h2>
      </StepReveal>

      {/* Step 2 */}
      <StepReveal at={2} until={3} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] gradient-primary-text max-w-4xl leading-[1.05]">
          E meno domande.
        </h2>
      </StepReveal>

      {/* Step 3: only logo, big */}
      <StepReveal at={3} until={4} keepSpace={false} variant="scale" className="absolute inset-0 flex items-center justify-center">
        <LogoMark size={420} />
      </StepReveal>

      {/* Step 4: closing */}
      <StepReveal at={4} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
        <h2 className="type-premium-tight text-[clamp(3rem,8vw,6rem)] gradient-primary-text leading-[1]">
          PlanEat.
        </h2>
        <p className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground leading-tight">
          Meno decisioni.
          <span className="block gradient-primary-text">Più vita.</span>
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide17Closing;
