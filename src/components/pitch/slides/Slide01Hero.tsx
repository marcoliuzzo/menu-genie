import planeatLogo from "@/assets/planeat-logo.png";
import SlideShell from "../SlideShell";

const Slide01Hero = () => (
  <SlideShell>
    <div className="flex flex-col items-center text-center">
      <img src={planeatLogo} alt="PlanEat" className="h-12 md:h-14 w-auto mb-16" />
      <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold tracking-tight leading-[1.05] text-foreground">
        365 volte.
        <span className="block mt-6 md:mt-10 gradient-primary-text">La stessa decisione.</span>
      </h1>
      <p className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
        PlanEat è il primo ecosistema intelligente che semplifica ogni decisione alimentare quotidiana.
      </p>
      <p className="mt-10 text-lg md:text-xl text-foreground/80 font-medium">
        Meno decisioni. Meno sprechi. Più semplicità.
      </p>
    </div>
  </SlideShell>
);

export default Slide01Hero;
