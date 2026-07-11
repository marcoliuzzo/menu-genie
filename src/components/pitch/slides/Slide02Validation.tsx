import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const insights = [
  {
    kicker: "Insight 01",
    title: "Ridurre il carico decisionale",
    desc: "Gli utenti non vogliono più scegliere ogni sera cosa cucinare. Vogliono che qualcuno decida per loro, con criterio.",
  },
  {
    kicker: "Insight 02",
    title: "Gestire meglio la dispensa",
    desc: "Il food waste nasce dalla frammentazione: nessuno sa davvero cosa c'è in casa nel momento in cui serve.",
  },
  {
    kicker: "Insight 03",
    title: "Organizzare la spesa",
    desc: "Le liste della spesa sono statiche, disconnesse dai pasti reali, dalle offerte e dalla dispensa. Un compito manuale.",
  },
];

const Slide02Validation = () => {
  const { step } = useStep();
  const focus = Math.min(step, insights.length - 1);
  return (
    <SlideShell eyebrow="Validazione — 227 interviste" background="white">
      <div className="relative min-h-[75vh] flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
          {insights.map((it, i) => {
            const active = i === focus;
            return (
              <GlassCard
                key={it.kicker}
                glow={active}
                className="p-8 md:p-10 transition-all duration-700 ease-out"
                style={{
                  opacity: active ? 1 : 0.28,
                  filter: active ? "blur(0)" : "blur(3px)",
                  transform: active ? "scale(1)" : "scale(0.97)",
                }}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  {it.kicker}
                </div>
                <h3
                  className={`mt-3 type-premium text-3xl md:text-5xl ${
                    active ? "gradient-primary-text" : "text-foreground"
                  }`}
                >
                  {it.title}
                </h3>
                <p
                  className="mt-4 text-base md:text-lg text-foreground/80 max-w-2xl transition-all duration-700"
                  style={{ opacity: active ? 1 : 0, maxHeight: active ? 200 : 0 }}
                >
                  {it.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide02Validation;
