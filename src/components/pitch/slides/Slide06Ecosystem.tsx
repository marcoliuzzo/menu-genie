import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const chips = [
  { label: "Ricette",       start: { x: -300, y: -180 } },
  { label: "Dispensa",      start: { x:  260, y: -200 } },
  { label: "Lista Spesa",   start: { x: -320, y:   40 } },
  { label: "Offerte",       start: { x:  280, y:   60 } },
  { label: "Meal Planning", start: { x: -180, y:  200 } },
  { label: "AI",            start: { x:  220, y:  220 } },
  { label: "Mood",          start: { x:    0, y: -260 } },
];

const Slide06Ecosystem = () => {
  const { step } = useStep();
  // step 0: scattered, 1: still scattered (labels), 2: converging, 3: sphere, 4: message
  const converged = step >= 2;
  return (
    <SlideShell eyebrow="Food Decision Ecosystem" background="mesh">
      <div className="relative h-[75vh] flex items-center justify-center">
        {/* Central sphere / logo */}
        <StepReveal at={3} variant="scale" keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <GlassCard glow className="h-[280px] w-[280px] md:h-[340px] md:w-[340px] rounded-full flex items-center justify-center">
            <LogoMark size={90} />
          </GlassCard>
        </StepReveal>

        {/* Chips */}
        {chips.map((c, i) => {
          const x = converged ? 0 : c.start.x;
          const y = converged ? 0 : c.start.y;
          const opacity = step >= 3 ? 0 : step >= 1 ? 1 : 0.6;
          return (
            <div
              key={c.label}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${step >= 3 ? 0.4 : 1})`,
                opacity,
                transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease-out",
                transitionDelay: `${i * 40}ms`,
              }}
            >
              <GlassCard className="px-5 py-3">
                <span className="text-sm md:text-base font-semibold text-foreground">{c.label}</span>
              </GlassCard>
            </div>
          );
        })}

        {/* Final message */}
        <StepReveal at={4} className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
            Un ecosistema.
            <span className="ml-3 gradient-primary-text">Un solo flusso decisionale.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide06Ecosystem;
