import { ArrowRight, Sparkles, CalendarDays, Package, ShoppingCart, ChefHat } from "lucide-react";
import SlideShell from "../SlideShell";

const steps = [
  { icon: Sparkles, label: "Mood Planning" },
  { icon: CalendarDays, label: "Meal Planning" },
  { icon: Package, label: "Dispensa" },
  { icon: ShoppingCart, label: "Lista Spesa" },
  { icon: ChefHat, label: "Ricette" },
];

const Slide05Solution = () => (
  <SlideShell eyebrow="La soluzione">
    <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center max-w-4xl mx-auto">
      Un assistente alimentare basato sull'
      <span className="gradient-primary-text">intelligenza artificiale</span>.
    </h2>
    <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <div className="rounded-2xl border border-border/60 bg-card px-5 py-4 flex flex-col items-center min-w-[130px]">
            <s.icon className="h-6 w-6 text-accent mb-2" />
            <span className="text-sm font-semibold text-foreground text-center">{s.label}</span>
          </div>
          {i < steps.length - 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" />}
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide05Solution;
