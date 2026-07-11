import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { CalendarDays, Package, ShoppingCart, Sparkles, Brain, Layers } from "lucide-react";

const capabilities = [
  { label: "Meal Planning",         icon: CalendarDays, competitor: true,  desc: "Presente in molti tool, ma isolato dal resto del flusso alimentare." },
  { label: "Gestione Dispensa",     icon: Package,      competitor: true,  desc: "Alcuni competitor la offrono, senza collegarla a piano e spesa." },
  { label: "Lista Spesa",           icon: ShoppingCart, competitor: true,  desc: "Statica, manuale, scollegata da offerte reali e dispensa." },
  { label: "Personalizzazione AI",  icon: Brain,        competitor: false, desc: "Vincoli dietetici, budget, allergie, mood: tutto orchestrato dall'AI." },
  { label: "Mood Planning",         icon: Sparkles,     competitor: false, hero: true, desc: "Il piano si adatta a come stai. Nessuno lo fa oggi." },
  { label: "Ecosistema Integrato",  icon: Layers,       competitor: false, hero: true, desc: "Dispensa, ricette, spesa e offerte in un unico flusso decisionale." },
];

const Slide10WhyWeWin = () => {
  const { step } = useStep();
  // steps 1..6 sequentially highlight; step 0 = all faded; step 6 also shows final line
  const activeIdx = step >= 1 && step <= 6 ? step - 1 : -1;
  const focused = activeIdx !== -1 ? capabilities[activeIdx] : null;

  return (
    <SlideShell eyebrow="Perché vinciamo" background="mesh">
      <div className="relative min-h-[78vh] flex flex-col">
        {/* Focused capability — top hero */}
        <div className="h-[240px] flex items-center justify-center">
          {focused && (
            <div key={focused.label} className="text-center animate-fade-in max-w-2xl px-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">
                <focused.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className={`type-premium text-3xl md:text-5xl ${focused.hero ? "gradient-primary-text" : "text-foreground"}`}>
                {focused.label}
              </h3>
              <p className="mt-3 text-base md:text-lg text-foreground/80">{focused.desc}</p>
              <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {focused.competitor ? "Presente anche in altri tool" : "Solo PlanEat"}
              </div>
            </div>
          )}
          {!focused && (
            <p className="type-premium text-2xl md:text-3xl text-muted-foreground text-center max-w-2xl">
              Sei capability. Un ecosistema che nessuno oggi offre insieme.
            </p>
          )}
        </div>

        {/* Wheel row of capabilities */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3 px-4">
          {capabilities.map((c, i) => {
            const isActive = i === activeIdx;
            const dim = activeIdx !== -1 && !isActive;
            return (
              <GlassCard
                key={c.label}
                glow={isActive}
                className="px-3 py-3 md:px-4 md:py-4 transition-all duration-500 ease-out"
                style={{
                  transform: isActive ? "translateY(-8px) scale(1.05)" : "scale(1)",
                  opacity: dim ? 0.35 : 1,
                  filter: dim ? "blur(1.5px)" : "blur(0)",
                }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <c.icon className={`h-5 w-5 ${c.hero ? "text-accent" : "text-primary"}`} />
                  <span className="text-[11px] md:text-xs font-semibold text-foreground leading-tight">
                    {c.label}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                    {c.competitor ? "Anche altri" : "Solo PlanEat"}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <StepReveal at={6} delay={200} className="mt-10 text-center">
          <p className="type-premium text-[clamp(1.25rem,3vw,2rem)] text-foreground max-w-4xl mx-auto">
            PlanEat è l'unica piattaforma che integra
            <span className="block gradient-primary-text">l'intero processo decisionale alimentare.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide10WhyWeWin;
