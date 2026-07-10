import planeatLogo from "@/assets/planeat-logo.png";
import SlideShell from "../SlideShell";

const Slide17Closing = () => (
  <SlideShell>
    <div className="flex flex-col items-center text-center">
      <h2 className="text-[clamp(2.25rem,6vw,4.75rem)] font-bold tracking-tight leading-[1.05] text-foreground max-w-4xl">
        Le persone non hanno bisogno
        <span className="block mt-3">di più ricette.</span>
        <span className="block mt-6 gradient-primary-text">
          Hanno bisogno di prendere meno decisioni.
        </span>
      </h2>
      <p className="mt-14 text-lg md:text-xl max-w-2xl text-foreground">
        <span className="font-bold">PlanEat</span> trasforma la complessità alimentare
        in semplicità quotidiana.
      </p>
      <img src={planeatLogo} alt="PlanEat" className="mt-12 h-12 md:h-14 w-auto" />
    </div>
  </SlideShell>
);

export default Slide17Closing;
