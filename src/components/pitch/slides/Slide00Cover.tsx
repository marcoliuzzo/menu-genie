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
      </div>
    </SlideShell>
  );
};

export default Slide00Cover;
