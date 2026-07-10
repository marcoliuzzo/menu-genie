import { User } from "lucide-react";
import SlideShell from "../SlideShell";

const founders = Array.from({ length: 7 }, (_, i) => ({
  name: `Founder ${i + 1}`,
  role: "Ruolo",
  skills: ["Competenza", "Competenza"],
}));

const Slide15Team = () => (
  <SlideShell eyebrow="Team">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      7 founder. <span className="gradient-primary-text">Una visione.</span>
    </h2>
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {founders.map((f) => (
        <div key={f.name} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <User className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="text-sm font-semibold text-foreground">{f.name}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{f.role}</div>
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {f.skills.map((s, i) => (
              <span
                key={i}
                className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide15Team;
