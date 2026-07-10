import { User } from "lucide-react";
import SlideShell from "../SlideShell";

const founders = [
  { name: "Founder", role: "Strategia" },
  { name: "Founder", role: "Tecnologia" },
  { name: "Founder", role: "Prodotto" },
  { name: "Founder", role: "AI & Data" },
  { name: "Founder", role: "Marketing" },
  { name: "Founder", role: "Operations" },
  { name: "Founder", role: "Business Dev" },
];

const Slide15Team = () => (
  <SlideShell eyebrow="Team">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      7 founder. <span className="gradient-primary-text">Una visione.</span>
    </h2>
    <p className="mt-4 text-center text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
      Competenze complementari che coprono l'intera catena del valore.
    </p>
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {founders.map((f, i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="text-sm font-semibold text-foreground">{f.name}</div>
          <div className="text-xs text-accent mt-0.5 font-medium">{f.role}</div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide15Team;
