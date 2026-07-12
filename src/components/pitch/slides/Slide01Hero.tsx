import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";

const Slide01Hero = () => {
  return (
    <SlideShell background="mesh">
      <div className="relative h-[82vh] flex items-center justify-center">
        {/* Step 0: 365 VOLTE */}
        <StepReveal at={0} until={1} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
          <h1 className="type-premium-tight text-[clamp(6rem,22vw,18rem)] text-foreground">
            365 <span className="gradient-primary-text">VOLTE</span>
          </h1>
        </StepReveal>

        {/* Step 1: LA STESSA DOMANDA */}
        <StepReveal at={1} until={2} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="type-premium-tight text-[clamp(3.5rem,11vw,9rem)] text-foreground">
            LA STESSA <span className="gradient-primary-text">DOMANDA</span>
          </h2>
        </StepReveal>

        {/* Step 2: COSA MANGIO STASERA? */}
        <StepReveal at={2} until={3} keepSpace={false} variant="zoom" className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="type-premium-tight text-[clamp(3.5rem,13vw,11rem)] text-foreground leading-[0.95]">
            COSA MANGIO
            <span className="block gradient-primary-text mt-3">STASERA?</span>
          </h2>
        </StepReveal>

        {/* Step 3: logo + testo libero */}
        <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center gap-10">
          <LogoMark size={160} />
          <div className="text-center space-y-2">
            <p className="type-premium text-3xl md:text-5xl text-foreground leading-tight">
              Meno domande.
            </p>
            <p className="type-premium text-3xl md:text-5xl text-muted-foreground leading-tight">
              Meno decisioni.
            </p>
            <p className="type-premium text-3xl md:text-5xl gradient-primary-text leading-tight">
              Più semplicità.
            </p>
          </div>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide01Hero;
