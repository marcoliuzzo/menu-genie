import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import { useStep } from "../stepContext";

const moods = [
  { label: "Stressato", color: "hsl(0 70% 60%)", start: { x: -220, y: -80 } },
  { label: "Stanco",    color: "hsl(240 40% 55%)", start: { x:  220, y: -100 } },
  { label: "Energico",  color: "hsl(35 90% 55%)",  start: { x: -180, y:  120 } },
  { label: "Rilassato", color: "hsl(160 36% 45%)", start: { x:  180, y:  140 } },
  { label: "Concentrato", color: "hsl(222 100% 59%)", start: { x: 0, y: -180 } },
];

const Slide08Mood = () => {
  const { step } = useStep();
  const converged = step >= 2;
  return (
    <SlideShell eyebrow="Mood planning" background="mesh">
      <div className="relative h-[75vh] flex items-center justify-center">
        <StepReveal at={0} until={2} className="absolute top-0 left-0 right-0 text-center">
          <p className="text-[clamp(2rem,5vw,3.75rem)] font-bold tracking-tight text-foreground">
            Come ti senti oggi?
          </p>
        </StepReveal>

        {/* Spheres */}
        {moods.map((m, i) => {
          const x = converged ? 0 : m.start.x;
          const y = converged ? 0 : m.start.y;
          const scale = step >= 3 ? 0 : 1;
          return (
            <div
              key={m.label}
              className="absolute flex flex-col items-center"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: `${i * 60}ms`,
                opacity: step >= 1 ? 1 : 0,
              }}
            >
              <div
                className="h-20 w-20 md:h-24 md:w-24 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, white, ${m.color})`,
                  boxShadow: `0 10px 40px -8px ${m.color}`,
                }}
              />
              <span className="mt-3 text-sm font-medium text-foreground">{m.label}</span>
            </div>
          );
        })}

        {/* AI burst */}
        <StepReveal at={3} until={4} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-56 w-56 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(160 36% 36%), hsl(222 100% 59%), hsl(160 36% 36%))",
              filter: "blur(20px)",
              animation: "spin 3s linear infinite",
            }}
          />
          <div className="absolute text-lg font-semibold text-foreground bg-background/80 backdrop-blur px-6 py-3 rounded-full border border-border">
            Generazione piano…
          </div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </StepReveal>

        <StepReveal at={4} className="absolute bottom-2 left-0 right-0 text-center">
          <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground max-w-4xl mx-auto">
            La prima pianificazione alimentare
            <span className="block gradient-primary-text">guidata dalle emozioni.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide08Mood;
