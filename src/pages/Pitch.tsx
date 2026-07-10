import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/components/pitch";

const Pitch = () => {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown"].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (e.key === " " || e.code === "Space") {
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

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-background">
      <div className="relative h-full w-full">
        {slides.map((SlideComp, i) => {
          const offset = i - index;
          const isActive = i === index;
          return (
            <div
              key={i}
              aria-hidden={!isActive}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateX(${offset * 24}px)`,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <SlideComp />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        disabled={index === 0}
        aria-label="Slide precedente"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur text-foreground opacity-40 hover:opacity-100 transition-opacity disabled:opacity-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        disabled={index === total - 1}
        aria-label="Slide successiva"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 backdrop-blur text-foreground opacity-40 hover:opacity-100 transition-opacity disabled:opacity-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
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

      {/* Counter */}
      <div className="absolute bottom-6 right-6 z-10 text-xs font-medium text-muted-foreground tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Pitch;
