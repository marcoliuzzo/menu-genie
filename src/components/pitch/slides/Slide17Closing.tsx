import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";

const Slide17Closing = () => (
  <SlideShell background="mesh">
    <div className="relative h-[85vh] flex items-center justify-center">
      {/* Step 0: prima frase */}
      <StepReveal at={0} until={1} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] text-foreground max-w-4xl">
          Le persone non hanno bisogno
          <span className="block mt-3">di più ricette.</span>
        </h2>
      </StepReveal>

      {/* Step 1: seconda frase (parte 1) */}
      <StepReveal at={1} until={2} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] gradient-primary-text max-w-4xl">
          Hanno bisogno
          <span className="block text-foreground mt-3">di meno decisioni.</span>
        </h2>
      </StepReveal>

      {/* Step 2: aggiunta */}
      <StepReveal at={2} until={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5.5rem)] max-w-4xl">
          <span className="text-foreground">Hanno bisogno</span>
          <span className="block gradient-primary-text mt-3">di meno decisioni</span>
          <span className="block text-foreground mt-3">e meno domande.</span>
        </h2>
      </StepReveal>

      {/* Step 3: logo puro */}
      <StepReveal at={3} until={4} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
        <LogoMark size={220} />
      </StepReveal>

      {/* Step 4: grazie */}
      <StepReveal at={4} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
        <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,5rem)] gradient-primary-text">
          GRAZIE PER L'ATTENZIONE
        </h2>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide17Closing;
