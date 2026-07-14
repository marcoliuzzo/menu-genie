import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";

const phases = [
  { when: "Oggi", title: "Freemium", desc: "Onboarding senza attrito, valore immediato per l'utente." },
  { when: "Oggi", title: "Premium — 3,99€/mese", desc: "Mood Planning avanzato. Generazioni illimitate." },
  { when: "Anno 2", title: "Advertising contestuale", desc: "Placement nativi su ricette, lista spesa e mood." },
  { when: "Anno 3", title: "Nutrizionisti & Consulenze", desc: "Servizi premium personalizzati con professionisti verificati." },
];

const Slide11Business = () => (
  <SlideShell eyebrow="Business model" background="white">
    <div className="min-h-[75vh] flex flex-col justify-center">
      <StepReveal at={0}>
        <h2 className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground text-center max-w-3xl mx-auto leading-[1.2] pb-2">
          Un modello pensato per{" "}
          <span className="gradient-primary-text">evolvere.</span>
        </h2>
      </StepReveal>

      <div className="mt-14 relative max-w-3xl mx-auto w-full">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="flex flex-col gap-6">
          {phases.map((p, i) => (
            <StepReveal key={p.title} at={i} delay={i * 60}>
              <div className="relative pl-16">
                <div className="absolute left-3 top-4 h-6 w-6 rounded-full bg-background border-4 border-accent" />
                <GlassCard className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    {p.when}
                  </div>
                  <div className="mt-1 text-xl font-bold text-foreground">{p.title}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{p.desc}</div>
                </GlassCard>
              </div>
            </StepReveal>
          ))}
        </div>
      </div>
    </div>
  </SlideShell>
);

export default Slide11Business;
