import planeatLogo from "@/assets/planeat-logo.png";
import SlideShell from "../SlideShell";

const Slide16Closing = () => (
  <SlideShell>
    <div className="flex flex-col items-center text-center">
      <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-foreground">
        Ogni giorno prendiamo
        <span className="block mt-3">centinaia di decisioni.</span>
      </h2>
      <p className="mt-12 text-xl md:text-2xl text-muted-foreground italic">
        Una di queste è sempre:
      </p>
      <p className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">
        "Cosa mangio stasera?"
      </p>
      <p className="mt-14 text-lg md:text-xl max-w-2xl text-foreground">
        <span className="gradient-primary-text font-bold">PlanEat</span> vuole eliminare questa decisione.
      </p>
      <img src={planeatLogo} alt="PlanEat" className="mt-12 h-12 md:h-14 w-auto" />
    </div>
  </SlideShell>
);

export default Slide16Closing;
