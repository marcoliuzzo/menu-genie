import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import LogoMark from "../LogoMark";
import { useStep } from "../stepContext";

const nodes = ["Utenti", "Dati", "AI", "Personalizzazione", "Retention"];

const Slide12Flywheel = () => {
  const { step } = useStep();
  const rotation = step * 72;
  return (
    <SlideShell eyebrow="Data flywheel" background="mesh">
      <div className="relative min-h-[75vh] flex items-center justify-center">
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GlassCard glow className="h-40 w-40 rounded-full flex items-center justify-center">
            <LogoMark size={56} />
          </GlassCard>
        </div>

        {/* Rotating ring */}
        <div
          className="relative h-[520px] w-[520px] md:h-[560px] md:w-[560px]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 230;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const active = i === (step % nodes.length);
            return (
              <div
                key={n}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-rotation}deg)`,
                  transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <GlassCard
                  glow={active}
                  className={`px-5 py-4 min-w-[160px] text-center transition-all ${
                    active ? "scale-110" : "opacity-70"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-lg font-bold text-foreground">{n}</div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <StepReveal at={4} className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-[clamp(1.25rem,3vw,2rem)] font-bold tracking-tight text-foreground">
            Ogni interazione rende PlanEat
            <span className="gradient-primary-text"> più intelligente.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide12Flywheel;
