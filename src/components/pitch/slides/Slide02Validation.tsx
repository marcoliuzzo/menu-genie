import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import { useStep } from "../stepContext";

const insights = [
  "Ridurre il carico decisionale",
  "Gestire meglio la dispensa",
  "Organizzare la spesa",
];

const Slide02Validation = () => {
  const { step } = useStep();
  // step 0,1,2 → highlight index; step 3 → final message
  const highlight = Math.min(step, 2);
  return (
    <SlideShell eyebrow="Validazione" background="white">
      {/* Giant 227 background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-bold tracking-tighter leading-none text-foreground select-none"
          style={{ fontSize: "min(72vw, 72vh)", opacity: 0.05 }}>
          227
        </span>
      </div>

      <div className="relative flex flex-col items-center justify-center text-center min-h-[70vh]">
        <StepReveal at={0} until={3}>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">
            227 persone intervistate — l'insight principale
          </p>
        </StepReveal>

        <StepReveal at={0} until={3} keepSpace={false} className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative h-[420px] w-[420px] md:h-[520px] md:w-[520px]">
            {insights.map((label, i) => {
              const active = i === highlight && step < 3;
              const angle = (i - highlight) * 40; // rotate around
              return (
                <div
                  key={label}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    opacity: active ? 1 : 0.25,
                  }}
                >
                  <div
                    className="text-center"
                    style={{ transform: `rotate(${-angle}deg)` }}
                  >
                    <div
                      className={`transition-all duration-700 ${
                        active
                          ? "text-4xl md:text-6xl font-bold text-foreground"
                          : "text-lg md:text-xl text-muted-foreground"
                      }`}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Ring */}
            <div className="absolute inset-8 rounded-full border border-dashed border-border" />
            <div className="absolute inset-24 rounded-full border border-dashed border-border/60" />
          </div>
        </StepReveal>

        {/* Final message */}
        <StepReveal at={3} keepSpace={false} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <p className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] text-foreground">
              Le persone non cercano più strumenti.
            </p>
            <p className="mt-4 text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] gradient-primary-text">
              Cercano semplicità.
            </p>
          </div>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide02Validation;
