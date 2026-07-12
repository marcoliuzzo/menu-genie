import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

const words = [
  "Stressato",
  "Stanco",
  "Energico",
  "Rilassato",
  "Concentrato",
];

const Slide08Mood = () => {
  const { step } = useStep();
  const showWords = step >= 1;
  const converge = step >= 2;
  const sphere = step >= 3;
  const planReady = step >= 4;

  return (
    <SlideShell eyebrow="Mood planning" background="mesh">
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Question — stays visible while words orbit */}
        <StepReveal at={0} until={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="type-premium text-[clamp(2rem,5vw,3.75rem)] text-foreground text-center">
            Come ti senti oggi?
          </p>
        </StepReveal>

        {/* Orbiting words */}
        {showWords && !sphere && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "moodOrbit 22s linear infinite",
            }}
          >
            {words.map((w, i) => {
              const angle = (i / words.length) * 360;
              const radius = 260;
              const scale = converge ? 0.2 : 1;
              const opacity = converge ? 0 : 1;
              return (
                <div
                  key={w}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(${converge ? 0 : radius}px) rotate(-${angle}deg) scale(${scale})`,
                    opacity,
                    transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease-out",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  {/* counter-rotate so text stays upright */}
                  <div style={{ animation: "moodOrbitCounter 22s linear infinite" }}>
                    <span className="type-premium text-2xl md:text-4xl gradient-primary-text">
                      {w}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Blur sphere with logo */}
        {sphere && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-[380px] w-[380px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, hsl(222 100% 78%), hsl(160 36% 55%) 55%, hsl(222 100% 40% / 0.6))",
                filter: "blur(20px)",
                animation: "moodSpin 12s linear infinite",
              }}
            />
            <div className="absolute" style={{ filter: "blur(1.5px)", opacity: 0.9 }}>
              <LogoMark size={180} glow={false} animateIn={false} />
            </div>
          </div>
        )}

        <style>{`
          @keyframes moodSpin { to { transform: rotate(360deg); } }
          @keyframes moodOrbit { to { transform: rotate(360deg); } }
          @keyframes moodOrbitCounter { to { transform: rotate(-360deg); } }
        `}</style>

        {/* Morphing AI card — "Faccio io" at step 3, "Piano settimanale generato" at step 4 */}
        {sphere && (
          <div className="absolute" style={{ top: "58%" }}>
            <GlassCard glow className="px-8 py-5 min-w-[320px] text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  {planReady ? "Generazione AI" : "PlanEat AI"}
                </span>
              </div>
              <div className="relative mt-2 h-10 md:h-12">
                <div
                  className="absolute inset-0 flex items-center justify-center type-premium text-2xl md:text-3xl text-foreground transition-all duration-500"
                  style={{
                    opacity: planReady ? 0 : 1,
                    transform: planReady ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  Faccio io, non ci pensare.
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center type-premium text-2xl md:text-3xl text-foreground transition-all duration-500"
                  style={{
                    opacity: planReady ? 1 : 0,
                    transform: planReady ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  Piano settimanale generato
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Final message */}
        <StepReveal at={5} className="absolute bottom-6 left-0 right-0 text-center">
          <p className="type-premium text-[clamp(1.5rem,3.5vw,2.5rem)] text-foreground max-w-4xl mx-auto">
            La prima pianificazione alimentare
            <span className="block gradient-primary-text">guidata dalle emozioni.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide08Mood;
