import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";

const moments = [
  { time: "08:00", q: "Cosa mangio oggi?" },
  { time: "13:00", q: "Cosa compro?" },
  { time: "18:00", q: "Cosa cucino?" },
  { time: "20:00", q: "Ho tutto in casa?" },
];

const Slide03Problem = () => (
  <SlideShell eyebrow="Il problema" background="sand">
    <div className="min-h-[70vh] flex flex-col justify-center py-6">
      <StepReveal at={0}>
        <h2 className="type-premium text-[clamp(1.75rem,4.2vw,3.25rem)] text-foreground max-w-4xl">
          UNA GIORNATA QUALUNQUE.
          <span className="block text-muted-foreground font-semibold mt-2">SEMPRE LE STESSE DOMANDE.</span>
        </h2>
      </StepReveal>

      <div className="mt-10 relative">
        <div className="absolute left-0 right-0 top-[38px] h-px bg-border" />
        <div className="grid grid-cols-4 gap-4">
          {moments.map((m, i) => (
            <StepReveal key={m.time} at={i} delay={i * 60} className="flex flex-col items-center text-center">
              <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20" />
              <div className="mt-6 text-sm font-mono text-muted-foreground tracking-widest">{m.time}</div>
              <GlassCard className="mt-4 px-5 py-4 w-full">
                <p className="text-base md:text-lg text-foreground italic leading-snug">"{m.q}"</p>
              </GlassCard>
            </StepReveal>
          ))}
        </div>
      </div>

      <StepReveal at={4} className="mt-10 text-center pb-4">
        <p className="type-premium text-[clamp(1.5rem,3.4vw,2.4rem)] text-foreground leading-tight">
          Tempo perso. <span className="text-muted-foreground">Stress inutile.</span>
          <span className="block gradient-primary-text mt-1">Ogni giorno.</span>
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide03Problem;
