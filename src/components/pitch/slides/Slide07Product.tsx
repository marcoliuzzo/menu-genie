import SlideShell from "../SlideShell";
import StepReveal from "../StepReveal";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import { Sparkles, CalendarDays, ShoppingCart } from "lucide-react";

const keys = [
  { label: "Mood", icon: Sparkles, at: 1 },
  { label: "Plan", icon: CalendarDays, at: 2 },
  { label: "Shop", icon: ShoppingCart, at: 3 },
];

const Slide07Product = () => {
  const { step } = useStep();
  return (
    <SlideShell eyebrow="Product experience" background="sand">
      <div className="min-h-[75vh] grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left keywords */}
        <div className="flex flex-col gap-6 order-2 md:order-1">
          {keys.map((k) => {
            const active = step >= k.at;
            return (
              <StepReveal key={k.label} at={k.at}>
                <GlassCard
                  glow={active}
                  className={`px-6 py-5 flex items-center gap-4 transition-all duration-500 ${
                    active ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <k.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xl font-bold text-foreground">{k.label}</span>
                </GlassCard>
              </StepReveal>
            );
          })}
        </div>

        {/* iPhone mockup */}
        <StepReveal at={0} className="order-1 md:order-2 flex justify-center md:col-span-2">
          <div
            className="relative rounded-[52px] border-[10px] border-foreground/90 bg-foreground/95 shadow-2xl overflow-hidden"
            style={{ width: 300, height: 620 }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black" />
            <div
              className="absolute inset-3 rounded-[42px] flex items-center justify-center text-background/70 text-sm"
              style={{
                background:
                  "linear-gradient(160deg, hsl(160 36% 36%) 0%, hsl(222 100% 59%) 100%)",
              }}
            >
              <span className="uppercase tracking-[0.24em] text-xs">Video demo</span>
            </div>
          </div>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide07Product;
