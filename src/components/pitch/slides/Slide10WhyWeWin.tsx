import { Check, Minus } from "lucide-react";
import SlideShell from "../SlideShell";

const features = [
  { name: "Meal Planning", competitors: true, planeat: true },
  { name: "Gestione Dispensa", competitors: "partial", planeat: true },
  { name: "Lista Spesa", competitors: true, planeat: true },
  { name: "Personalizzazione AI", competitors: "partial", planeat: true },
  { name: "Mood Planning", competitors: false, planeat: true },
  { name: "Ecosistema Integrato", competitors: false, planeat: true },
];

const Cell = ({ v }: { v: boolean | "partial" }) => {
  if (v === true) return <Check className="h-5 w-5 text-accent mx-auto" />;
  if (v === "partial") return <Minus className="h-5 w-5 text-muted-foreground mx-auto" />;
  return <span className="text-muted-foreground/50 mx-auto block text-center">—</span>;
};

const Slide10WhyWeWin = () => (
  <SlideShell eyebrow="Perché vinciamo">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      L'unica piattaforma che copre
      <span className="block gradient-primary-text mt-2">l'intero processo decisionale.</span>
    </h2>
    <div className="mt-12 rounded-2xl border border-border/60 bg-card overflow-hidden max-w-3xl mx-auto">
      <div className="grid grid-cols-3 border-b border-border/60 bg-secondary/40">
        <div className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Funzionalità
        </div>
        <div className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
          Competitor
        </div>
        <div className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-accent text-center">
          PlanEat
        </div>
      </div>
      {features.map((f) => (
        <div key={f.name} className="grid grid-cols-3 border-b border-border/40 last:border-0">
          <div className="px-6 py-4 text-sm font-medium text-foreground">{f.name}</div>
          <div className="px-6 py-4 flex items-center justify-center">
            <Cell v={f.competitors} />
          </div>
          <div className="px-6 py-4 flex items-center justify-center bg-accent/5">
            <Cell v={f.planeat} />
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide10WhyWeWin;
