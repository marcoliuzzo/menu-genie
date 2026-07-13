import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";

const Slide00Cover = () => {
  return (
    <SlideShell background="mesh">
      <div className="relative h-[82vh] flex flex-col items-center justify-center gap-10">
        <StepReveal at={0} variant="scale" duration={800}>
          <div className="flex flex-col items-center gap-8">
            <LogoMark size={180} />
            <h1 className="type-premium-tight text-[clamp(4rem,12vw,10rem)] gradient-primary-text text-center">
              PLANEAT
            </h1>
          </div>
        </StepReveal>

        <StepReveal at={1} delay={80} className="text-center">
          <p className="type-premium text-2xl md:text-4xl text-foreground leading-tight">
            Meno decisioni.
          </p>
          <p className="type-premium text-2xl md:text-4xl text-muted-foreground leading-tight mt-1">
            Più semplicità.
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide00Cover;
