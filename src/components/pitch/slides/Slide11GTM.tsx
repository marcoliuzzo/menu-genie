import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { Radar, Download, Rocket, RefreshCw, Crown } from "lucide-react";

const phases = [
  {
    icon: Radar,
    name: "AWARENESS",
    goal: "Far riconoscere il problema della pianificazione alimentare quotidiana.",
    bullets: [
      "📱 Meta Ads — Young Professionals",
      "🎥 TikTok Ads — Studenti e giovani",
      "🏫 Partnership Universitarie",
      "🏢 Coworking & Community Wellness",
    ],
    hook: "\"Sono le 19:00. Hai già deciso cosa mangiare?\"",
    kpi: ["Reach", "Impressions", "CTR"],
  },
  {
    icon: Download,
    name: "ACQUISITION",
    goal: "Trasformare l'interesse in download e registrazioni.",
    bullets: [
      "✓ Download gratuito",
      "✓ Registrazione semplificata",
      "🍽️ Pianificazione pasti",
      "📦 Gestione dispensa + 🛒 Lista spesa",
    ],
    kpi: ["Download", "Registrazioni", "CAC"],
  },
  {
    icon: Rocket,
    name: "ACTIVATION",
    goal: "Dimostrare il valore nei primi giorni di utilizzo.",
    bullets: [
      "✓ Onboarding completato",
      "✓ Preferenze alimentari",
      "✓ Primo piano pasti generato",
      "✓ Prima lista della spesa",
    ],
    kpi: ["Activation Rate", "WAU", "Feature usage"],
  },
  {
    icon: RefreshCw,
    name: "RETENTION",
    goal: "Integrare PlanEat nella routine settimanale.",
    bullets: [
      "🔔 Notifiche personalizzate",
      "📦 Aggiornamento dispensa",
      "🍽️ Nuove proposte meal plan",
      "📧 Email suggerimenti & reminder",
    ],
    kpi: ["Retention Rate", "Frequency", "Churn"],
  },
  {
    icon: Crown,
    name: "MONETIZATION",
    goal: "Convertire gli utenti coinvolti in abbonati Premium.",
    bullets: [
      "✨ Mood Planning avanzato",
      "✨ Personalizzazione nutrizionale",
      "✨ Generazioni illimitate",
      "✨ AI premium & varietà ricette",
    ],
    hook: "Premium · 3,99 €/mese",
    kpi: ["Conversion", "Premium Users", "MRR"],
    highlight: true,
  },
];

const Slide11GTM = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="Go-to-market" background="white">
      <div className="min-h-[78vh] flex flex-col justify-center py-6">
        <StepReveal at={0}>
          <h2 className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground text-center max-w-4xl mx-auto">
            Go-To-Market
            <span className="gradient-primary-text"> Strategy.</span>
          </h2>
          <p className="mt-3 text-center text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Dalla scoperta del problema alla sottoscrizione Premium.
          </p>
        </StepReveal>

        <div className="mt-10 relative">
          <div className="absolute left-0 right-0 top-[26px] h-px bg-border" />
          <div className="grid grid-cols-5 gap-3">
            {phases.map((p, i) => {
              const active = step >= i + 1;
              const Icon = p.icon;
              return (
                <StepReveal key={p.name} at={i + 1} delay={40}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        active
                          ? "bg-gradient-to-br from-primary to-accent border-white shadow-lg shadow-accent/30 scale-110"
                          : "bg-background border-border"
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${active ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="mt-2 text-[10px] font-bold tracking-[0.18em] text-foreground">
                      {p.name}
                    </div>
                  </div>
                  <GlassCard
                    glow={p.highlight}
                    tone={p.highlight ? "primary" : "light"}
                    className="mt-4 p-4 min-h-[280px]"
                  >
                    <p className="text-xs text-muted-foreground leading-snug">{p.goal}</p>
                    <ul className="mt-3 space-y-1">
                      {p.bullets.map((b) => (
                        <li key={b} className="text-[11px] text-foreground leading-snug">
                          {b}
                        </li>
                      ))}
                    </ul>
                    {p.hook && (
                      <p className="mt-3 text-[11px] italic text-primary leading-snug">{p.hook}</p>
                    )}
                    <div className="mt-3 pt-3 border-t border-border/60">
                      <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-1">
                        KPI
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.kpi.map((k) => (
                          <span
                            key={k}
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </StepReveal>
              );
            })}
          </div>
        </div>

        <StepReveal at={6} delay={200} className="mt-10 text-center pb-2">
          <p className="type-premium text-[clamp(1.25rem,2.8vw,2rem)] text-foreground leading-tight">
            Meno decisioni <span className="text-muted-foreground">→</span> Più utilizzo{" "}
            <span className="text-muted-foreground">→</span>{" "}
            <span className="gradient-primary-text">Più utenti Premium</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide11GTM;
