import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const personas = [
  {
    icon: Briefcase,
    emoji: "👨‍💼",
    title: "Young Professionals",
    tag: "Target principale",
    age: "25-40 anni",
    location: "Milano, Bologna, Firenze, Roma, Torino, Napoli",
    pain: "Arrivo a sera senza sapere cosa mangiare.",
    needs: ["Risparmiare tempo", "Organizzare la settimana", "Ridurre il carico mentale"],
  },
  {
    icon: GraduationCap,
    emoji: "🎓",
    title: "Studenti Fuori Sede",
    tag: null,
    age: "18-29 anni",
    location: null,
    pain: "Compro troppo e spreco metà della spesa.",
    needs: ["Organizzare gli acquisti", "Ridurre gli sprechi", "Gestire meglio il budget"],
  },
  {
    icon: Users,
    emoji: "👨‍👩‍👧",
    title: "Famiglie Urbane",
    tag: "Target di espansione",
    age: null,
    location: null,
    pain: "Ogni settimana dobbiamo organizzare decine di pasti.",
    needs: ["Pianificazione familiare", "Coordinamento", "Personalizzazione"],
  },
];

const Slide04Personas = () => (
  <SlideShell eyebrow="Target" background="mesh">
    <div className="min-h-[75vh] flex flex-col justify-center py-6">
      <StepReveal at={0}>
        <h2 className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground max-w-4xl leading-[1.2] pb-2">
          Progettato per chi{" "}
          <span className="gradient-primary-text">è stanco di decidere.</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl">
          Target differenti, stesso problema: la fatica decisionale alimentare.
        </p>
      </StepReveal>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {personas.map((p, i) => (
          <StepReveal key={p.title} at={i + 1} delay={i * 60}>
            <GlassCard className="p-6 h-full min-h-[380px] flex flex-col">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-2xl">
                  {p.emoji}
                </div>
                {p.tag && (
                  <span className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold px-2 py-1 rounded-full border border-accent/30 bg-accent/5">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="mt-4 type-premium text-xl text-foreground">{p.title}</div>
              {p.age && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="uppercase tracking-widest">Età · </span>
                  {p.age}
                </div>
              )}
              {p.location && (
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {p.location}
                </div>
              )}
              <div className="mt-4 rounded-xl border-l-2 border-accent/60 bg-accent/5 px-3 py-2">
                <p className="text-sm italic text-foreground leading-snug">"{p.pain}"</p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {p.needs.map((n) => (
                  <li key={n} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    {n}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StepReveal>
        ))}
      </div>

      <StepReveal at={4} delay={200} className="mt-12 text-center pb-4">
        <p className="type-premium text-[clamp(2.5rem,6vw,5rem)] gradient-primary-text leading-[1.1] tracking-tight">
          Target differenti.<br />Stesso problema.
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide04Personas;
