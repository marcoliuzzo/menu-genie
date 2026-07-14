import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { CalendarDays, Package, ShoppingCart, Sparkles, Brain, Layers } from "lucide-react";

const capabilities = [
  {
    label: "Meal Planning",
    icon: CalendarDays,
    exclusive: false,
    desc: "Organizzazione automatica dei pasti.",
    who: "Anche altri",
    brands: "Whisk, Mealtime",
  },
  {
    label: "Gestione Dispensa",
    icon: Package,
    exclusive: false,
    desc: "Controllo ingredienti e scorte disponibili.",
    who: "Anche altri",
    brands: "KitchenPal",
  },
  {
    label: "Lista Spesa",
    icon: ShoppingCart,
    exclusive: false,
    desc: "Generazione intelligente della spesa.",
    who: "Anche altri",
    brands: "Bring!",
  },
  {
    label: "Personalizzazione AI",
    icon: Brain,
    exclusive: true,
    desc: "Suggerimenti basati su preferenze e comportamenti.",
    who: "Solo PlanEat",
  },
  {
    label: "Mood Planning",
    icon: Sparkles,
    exclusive: true,
    desc: "Pianificazione basata sul contesto e sullo stato emotivo.",
    who: "Solo PlanEat",
  },
  {
    label: "Ecosistema Integrato",
    icon: Layers,
    exclusive: true,
    desc: "Meal planning, dispensa, spesa e AI in un'unica piattaforma.",
    who: "Solo PlanEat",
  },
];

const Slide10WhyWeWin = () => {
  return (
    <SlideShell eyebrow="Perché vinciamo" background="mesh">
      <div className="relative min-h-[78vh] flex flex-col justify-center py-6">
        <StepReveal at={0}>
          <h2 className="type-premium text-[clamp(2rem,4.5vw,3.5rem)] text-foreground max-w-5xl leading-[1.15]">
            Un ecosistema che nessuno oggi
            <span className="block gradient-primary-text">offre insieme.</span>
          </h2>
        </StepReveal>

        <StepReveal at={0} delay={120}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {capabilities.map((c) => (
              <GlassCard
                key={c.label}
                glow={c.exclusive}
                className="p-5 h-full"
                style={
                  c.exclusive
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(160 36% 36% / 0.12), hsl(222 100% 59% / 0.16))",
                        borderColor: "hsl(222 100% 59% / 0.5)",
                        boxShadow:
                          "0 16px 40px -18px hsl(222 100% 59% / 0.45), 0 0 0 1px hsl(222 100% 59% / 0.28)",
                      }
                    : {}
                }
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      c.exclusive
                        ? "bg-gradient-to-br from-primary/25 to-accent/20"
                        : "bg-muted/40"
                    }`}
                  >
                    <c.icon className={`h-5 w-5 ${c.exclusive ? "text-accent" : "text-primary"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="type-premium text-base md:text-lg text-foreground leading-tight">
                      {c.label}
                    </div>
                    <p className="mt-1.5 text-xs md:text-[13px] text-muted-foreground leading-snug">
                      {c.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50">
                  <div
                    className={`text-[10px] uppercase tracking-[0.22em] font-bold ${
                      c.exclusive ? "gradient-primary-text" : "text-muted-foreground"
                    }`}
                  >
                    {c.who}
                  </div>
                  {c.brands && (
                    <div className="mt-1 text-[11px] text-foreground/60">{c.brands}</div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide10WhyWeWin;
