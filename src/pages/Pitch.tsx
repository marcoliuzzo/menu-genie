import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides, slideSteps } from "@/components/pitch";
import { StepProvider } from "@/components/pitch/stepContext";

const Pitch = () => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const total = slides.length;
  const currentTotalSteps = slideSteps[index] ?? 1;

  const next = useCallback(() => {
    setStep((s) => {
      if (s + 1 < currentTotalSteps) return s + 1;
      setIndex((i) => Math.min(i + 1, total - 1));
      return 0;
    });
  }, [currentTotalSteps, total]);

  const prev = useCallback(() => {
    setStep((s) => {
      if (s > 0) return s - 1;
      setIndex((i) => {
        const ni = Math.max(i - 1, 0);
        if (ni !== i) {
          setTimeout(() => setStep((slideSteps[ni] ?? 1) - 1), 0);
        }
        return ni;
      });
      return 0;
    });
  }, []);

  useEffect(() => setStep(0), [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown"].includes(e.key) || e.code === "Space") {
        e.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, total]);

  const ctxValue = useMemo(() => ({ step, totalSteps: currentTotalSteps }), [step, currentTotalSteps]);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-background">
      <div className="relative h-full w-full">
        {slides.map((SlideComp, i) => {
          const isActive = i === index;
          return (
            <div
              key={i}
              aria-hidden={!isActive}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(0.98)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {isActive ? (
                <StepProvider value={ctxValue}>
                  <SlideComp />
                </StepProvider>
              ) : (
                <StepProvider value={{ step: 0, totalSteps: slideSteps[i] ?? 1 }}>
                  <SlideComp />
                </StepProvider>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={prev}
        aria-label="Slide precedente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur text-foreground opacity-30 hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Slide successiva"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur text-foreground opacity-30 hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Vai alla slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Step dots */}
      {currentTotalSteps > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
          {Array.from({ length: currentTotalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-all ${
                i <= step ? "bg-accent/70" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-6 right-6 z-20 text-xs font-medium text-muted-foreground tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Pitch;
