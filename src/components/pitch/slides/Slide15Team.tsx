import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import { User } from "lucide-react";

const team = [
  { role: "CEO", area: "Strategia & Vision" },
  { role: "CTO", area: "Tecnologia & AI" },
  { role: "CPO", area: "Prodotto & UX" },
  { role: "CMO", area: "Growth & Brand" },
  { role: "CFO", area: "Finanza & Operations" },
  { role: "Head of Data", area: "AI & Personalizzazione" },
  { role: "Head of BD", area: "Partnership & Retail" },
];

const Slide15Team = () => (
  <SlideShell eyebrow="Team" background="mesh">
    <div className="min-h-[75vh] flex flex-col justify-center">
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-foreground text-center">
        7 founder. <span className="gradient-primary-text">Una visione.</span>
      </h2>
      <p className="mt-3 text-center text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
        Competenze complementari che coprono l'intera catena del valore.
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {team.map((f) => (
          <GlassCard key={f.role} className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-9 w-9 text-primary" />
            </div>
            <div className="text-base font-bold text-foreground">{f.role}</div>
            <div className="text-xs text-muted-foreground mt-1">{f.area}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  </SlideShell>
);

export default Slide15Team;
