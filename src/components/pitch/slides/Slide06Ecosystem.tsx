import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";

const chips = [
  { label: "Ricette",       start: { x: -340, y: -190 } },
  { label: "Dispensa",      start: { x:  300, y: -210 } },
  { label: "Lista Spesa",   start: { x: -360, y:   30 } },
  { label: "Offerte",       start: { x:  320, y:   50 } },
  { label: "Meal Planning", start: { x: -200, y:  210 } },
  { label: "AI",            start: { x:  240, y:  230 } },
  { label: "Mood",          start: { x:    0, y: -270 } },
];

const Slide06Ecosystem = () => {
  const { step } = useStep();
  // 0: title only, 1: chips appear scattered floating, 2: converge, 3: logo, 4: message
  const showChips = step >= 1;
  const converged = step >= 2;
  const showLogo = step >= 3;
  return (
    <SlideShell eyebrow="Food Decision Ecosystem" background="mesh">
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background faint logo */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: showLogo ? 0 : 0.06, transition: "opacity 700ms ease-out" }}
        >
          <LogoMark size={520} glow={false} animateIn={false} />
        </div>

        {/* Connecting lines to center */}
        {showChips && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: converged ? 0 : 0.35, transition: "opacity 700ms" }}>
            {chips.map((c, i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${c.start.x}px)`}
                y2={`calc(50% + ${c.start.y}px)`}
                stroke="hsl(222 100% 59%)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}
          </svg>
        )}

        {/* Central logo */}
        <StepReveal at={3} variant="scale" keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <GlassCard glow className="h-[300px] w-[300px] md:h-[360px] md:w-[360px] rounded-full flex items-center justify-center">
            <LogoMark size={150} />
          </GlassCard>
        </StepReveal>

        {/* Chips */}
        {chips.map((c, i) => {
          const x = converged ? 0 : c.start.x;
          const y = converged ? 0 : c.start.y;
          const opacity = showLogo ? 0 : showChips ? 1 : 0;
          const floatClass = i % 3 === 0 ? "float-soft" : i % 3 === 1 ? "float-soft-2" : "float-soft-3";
          return (
            <div
              key={c.label}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${showLogo ? 0.3 : 1})`,
                opacity,
                transition: "transform 800ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease-out",
                transitionDelay: `${i * 45}ms`,
              }}
            >
              <div className={floatClass}>
                <GlassCard glow className="px-6 py-3.5">
                  <span className="type-premium text-base md:text-lg text-foreground">{c.label}</span>
                </GlassCard>
              </div>
            </div>
          );
        })}

        {/* Title (step 0 only) */}
        <StepReveal at={0} until={1} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
          <p className="type-premium text-[clamp(2rem,4.5vw,3.25rem)] text-foreground max-w-3xl">
            Un ecosistema, non un'app.
            <span className="block text-muted-foreground mt-2">Ogni pezzo del processo alimentare, connesso.</span>
          </p>
        </StepReveal>

        {/* Final message */}
        <StepReveal at={4} className="absolute bottom-6 left-0 right-0 text-center">
          <p className="type-premium text-[clamp(1.75rem,4vw,2.75rem)] text-foreground">
            UN ECOSISTEMA.
            <span className="ml-3 gradient-primary-text">UN SOLO FLUSSO DECISIONALE.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide06Ecosystem;
