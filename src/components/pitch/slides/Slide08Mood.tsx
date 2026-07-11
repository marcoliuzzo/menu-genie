import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

const words = [
  { label: "Stressato",   start: { x: -280, y: -80 } },
  { label: "Stanco",      start: { x:  260, y: -120 } },
  { label: "Energico",    start: { x: -220, y:  140 } },
  { label: "Rilassato",   start: { x:  220, y:  160 } },
  { label: "Concentrato", start: { x:    0, y: -200 } },
];

const Slide08Mood = () => {
  const { step } = useStep();
  const showWords = step >= 1;
  const converge = step >= 2;
  const sphere = step >= 3;
  return (
    <SlideShell eyebrow="Mood planning" background="mesh">
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Question */}
        <StepReveal at={0} until={3} keepSpace={false} className="absolute top-10 left-0 right-0 text-center">
          <p className="type-premium text-[clamp(2rem,5vw,3.75rem)] text-foreground">
            Come ti senti oggi?
          </p>
        </StepReveal>

        {/* Words */}
        {words.map((w, i) => {
          const x = converge ? 0 : w.start.x;
          const y = converge ? 0 : w.start.y;
          const scale = sphere ? 0 : converge ? 0.6 : 1;
          const opacity = sphere ? 0 : showWords ? 1 : 0;
          return (
            <div
              key={w.label}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity,
                transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease-out",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <span className="type-premium text-2xl md:text-4xl gradient-primary-text">
                {w.label}
              </span>
            </div>
          );
        })}

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
            <style>{`@keyframes moodSpin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {/* Piano generato card */}
        <StepReveal at={3} delay={400} className="absolute" style={{ top: "58%" }}>
          <GlassCard glow className="px-8 py-5">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Generazione AI</span>
            </div>
            <div className="type-premium text-2xl md:text-3xl text-foreground mt-2">
              Piano generato
            </div>
          </GlassCard>
        </StepReveal>

        {/* Final message */}
        <StepReveal at={4} className="absolute bottom-6 left-0 right-0 text-center">
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
