import { Leaf, Heart, Zap, Users } from "lucide-react";
import SlideShell from "../SlideShell";

const moods = [
  { icon: Leaf, label: "Healthy Week", tint: "text-primary" },
  { icon: Heart, label: "Comfort Food", tint: "text-accent" },
  { icon: Zap, label: "Settimana Stressante", tint: "text-primary" },
  { icon: Users, label: "Cena con Amici", tint: "text-accent" },
];

const Slide07Mood = () => (
  <SlideShell eyebrow="Mood planning">
    <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      La pianificazione alimentare
      <span className="block gradient-primary-text mt-2">del futuro.</span>
    </h2>
    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
      {moods.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border border-border/60 bg-card p-6 text-center hover:border-accent/40 transition-colors"
        >
          <m.icon className={`mx-auto h-8 w-8 ${m.tint} mb-4`} />
          <div className="text-base font-semibold text-foreground">{m.label}</div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide07Mood;
