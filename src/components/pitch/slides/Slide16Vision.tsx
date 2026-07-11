import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import LogoMark from "../LogoMark";
import GlassCard from "../GlassCard";

const orbits = ["AI", "Nutrizione", "Retail", "Wellness"];

const Slide16Vision = () => {
  return (
    <SlideShell eyebrow="Vision" background="mesh">
      <div className="relative h-[80vh] flex items-center justify-center">
        {/* Step 0: piccolo */}
        <StepReveal at={0} until={1} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-[0.28em]">
            App di meal planning
          </p>
        </StepReveal>

        {/* Step 1: transizione */}
        <StepReveal at={1} until={2} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
          <p className="type-premium text-3xl md:text-5xl text-foreground/80">
            Non è solo un'app.
          </p>
        </StepReveal>

        {/* Step 2: frase forte */}
        <StepReveal at={2} variant="zoom" until={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="type-premium-tight text-[clamp(2.5rem,7vw,6rem)] gradient-primary-text max-w-4xl">
            LIBERIAMO LE PERSONE
            <span className="block text-foreground">DALLA FATICA DI DECIDERE</span>
            <span className="block gradient-primary-text">COSA MANGIARE.</span>
          </h2>
        </StepReveal>

        {/* Step 3+: logo con orbit */}
        <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[580px] w-[580px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <GlassCard glow className="h-56 w-56 rounded-full flex items-center justify-center">
                <LogoMark size={120} />
              </GlassCard>
            </div>
            <div
              className="absolute inset-0"
              style={{ animation: "orbit 30s linear infinite" }}
            >
              {orbits.map((o, i) => {
                const angle = (i / orbits.length) * Math.PI * 2 - Math.PI / 2;
                const r = 250;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={o}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div style={{ animation: "counterSpin 30s linear infinite" }}>
                      <GlassCard glow className="px-5 py-3">
                        <span className="type-premium text-base text-foreground">{o}</span>
                      </GlassCard>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="absolute inset-0 rounded-full border border-dashed border-border/60"
              style={{ margin: 30 }}
            />
            <style>{`@keyframes orbit{to{transform:rotate(360deg)}}@keyframes counterSpin{to{transform:rotate(-360deg)}}`}</style>
          </div>
        </StepReveal>

        {/* Messaggio finale */}
        <StepReveal at={4} className="absolute bottom-6 left-0 right-0 text-center">
          <p className="type-premium text-[clamp(1.5rem,3.5vw,2.5rem)] text-foreground max-w-4xl mx-auto">
            Meno decisioni ogni giorno.
            <span className="block gradient-primary-text">Più vita fuori dalla cucina.</span>
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide16Vision;
