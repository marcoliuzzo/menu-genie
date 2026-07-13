import { useEffect, useRef } from "react";
import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { Sparkles, CalendarDays, ShoppingCart } from "lucide-react";
import demoVideo from "@/assets/planeat-demo.mp4.asset.json";

const keys = [
  { label: "Mood", icon: Sparkles, at: 1, desc: "Il piano si adatta a come ti senti oggi." },
  { label: "Plan", icon: CalendarDays, at: 2, desc: "21 pasti settimanali generati e riequilibrati dall'AI." },
  { label: "Gestione Dispensa", icon: ShoppingCart, at: 3, desc: "Una sola lista, ottimizzata su ciò che hai già a casa." },
];

const Slide07Product = () => {
  const { step } = useStep();
  // Show one card at a time — the one whose "at" equals current step (steps 1..3)
  const currentIdx = keys.findIndex((k) => k.at === step);
  return (
    <SlideShell eyebrow="Product experience" background="sand">
      <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
        {/* iPhone mockup */}
        <StepReveal at={0} className="md:col-span-3 flex justify-center">
          <div className="relative">
            {/* Glow behind */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[80px] blur-3xl opacity-70"
              style={{
                background:
                  "radial-gradient(closest-side, hsl(222 100% 59% / 0.35), hsl(160 36% 36% / 0.20) 55%, transparent 75%)",
                transform: "scale(1.15)",
              }}
            />
            <div
              className="relative rounded-[62px] bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{ width: 340, height: 700, padding: 6 }}
            >
              <div className="relative h-full w-full rounded-[56px] overflow-hidden bg-black">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-7 w-28 rounded-full bg-black" />
                <video
                  src={demoVideo.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  controls={false}
                  className="absolute inset-0 h-full w-full object-cover animate-fade-in"
                />
              </div>
            </div>
          </div>
        </StepReveal>

        {/* Right side — one card at a time */}
        <div className="md:col-span-2 relative min-h-[280px] flex items-center">
          {keys.map((k, i) => {
            const active = i === currentIdx;
            return (
              <div
                key={k.label}
                className="absolute inset-0 flex items-center transition-all duration-700 ease-out"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(20px)",
                  pointerEvents: active ? "auto" : "none",
                }}
              >
                <GlassCard glow className="p-8 w-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">
                      <k.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="type-premium text-3xl text-foreground">{k.label}</span>
                  </div>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {k.desc}
                  </p>
                </GlassCard>
              </div>
            );
          })}
          {currentIdx === -1 && step === 0 && (
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
              Un'app. Tre gesti.
            </p>
          )}
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide07Product;
