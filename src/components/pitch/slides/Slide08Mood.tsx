import { Zap, Focus, Leaf, Moon, Flame, ArrowRight, Sparkles } from "lucide-react";
import SlideShell from "../SlideShell";

const moods = [
  { icon: Zap, label: "Stressato" },
  { icon: Focus, label: "Concentrato" },
  { icon: Leaf, label: "Rilassato" },
  { icon: Moon, label: "Stanco" },
  { icon: Flame, label: "Energico" },
];

const Slide08Mood = () => (
  <SlideShell eyebrow="Mood planning">
    <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      La pianificazione parte
      <span className="block gradient-primary-text mt-2">da come ti senti.</span>
    </h2>
    <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-border/60 bg-card px-5 py-4 flex flex-col items-center min-w-[130px]"
          >
            <m.icon className="h-6 w-6 text-accent mb-2" />
            <span className="text-sm font-semibold text-foreground">{m.label}</span>
          </div>
        ))}
      </div>
      <ArrowRight className="h-6 w-6 text-muted-foreground" />
      <div className="rounded-2xl border border-accent/40 bg-accent/5 px-6 py-5 flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-accent" />
        <span className="text-base font-semibold text-foreground">Suggerimenti AI personalizzati</span>
      </div>
    </div>
    <p className="mt-14 text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
      Il primo sistema che pianifica i pasti partendo dallo stato emotivo dell'utente.
    </p>
  </SlideShell>
);

export default Slide08Mood;
