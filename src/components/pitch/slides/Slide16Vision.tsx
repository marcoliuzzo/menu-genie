import { ArrowRight } from "lucide-react";
import SlideShell from "../SlideShell";

const pillars = ["Retail", "Nutrizione", "AI", "Wellness", "Gestione personalizzata"];

const Slide16Vision = () => (
  <SlideShell eyebrow="Vision">
    <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-foreground text-center">
      Oltre il <span className="gradient-primary-text">Meal Planning</span>.
    </h2>
    <div className="mt-14 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-4xl mx-auto">
      <div className="rounded-2xl border border-border/60 bg-card p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Oggi
        </div>
        <div className="text-lg font-semibold text-foreground">App di pianificazione pasti</div>
      </div>
      <ArrowRight className="h-6 w-6 text-accent mx-auto rotate-90 md:rotate-0" />
      <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          Domani
        </div>
        <div className="text-lg font-semibold text-foreground">
          Sistema operativo delle decisioni alimentari
        </div>
      </div>
    </div>
    <div className="mt-10 flex flex-wrap justify-center gap-2">
      {pillars.map((p) => (
        <span
          key={p}
          className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground"
        >
          {p}
        </span>
      ))}
    </div>
    <p className="mt-10 text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
      Costruire il punto di riferimento per ogni decisione alimentare quotidiana.
    </p>
  </SlideShell>
);

export default Slide16Vision;
