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
    <div className="min-h-[70vh] flex flex-col justify-center">
      <StepReveal at={0}>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-foreground max-w-3xl">
          Una giornata qualunque.
          <span className="block text-muted-foreground font-light mt-1">Sempre gli stessi dubbi.</span>
        </h2>
      </StepReveal>

      <div className="mt-14 relative">
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

      <StepReveal at={4} className="mt-16 text-center">
        <p className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
          Decine di micro-decisioni.
          <span className="block gradient-primary-text">Ogni giorno.</span>
        </p>
      </StepReveal>
    </div>
  </SlideShell>
);

export default Slide03Problem;
