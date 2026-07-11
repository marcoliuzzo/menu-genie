import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "light" | "dark" | "primary";
  glow?: boolean;
}

const GlassCard = ({ children, tone = "light", glow, className, style, ...rest }: Props) => {
  const toneClass =
    tone === "dark"
      ? "bg-foreground/70 text-background border-white/10"
      : tone === "primary"
      ? "border-primary/25"
      : "border-white/60";

  const bgStyle: CSSProperties =
    tone === "primary"
      ? { background: "linear-gradient(135deg, hsl(160 36% 36% / 0.14), hsl(222 100% 59% / 0.10))" }
      : tone === "light"
      ? { background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.32))" }
      : {};

  const glowShadow = glow
    ? "0 1px 0 0 rgba(255,255,255,0.95) inset, 0 0 0 1px rgba(255,255,255,0.35), 0 30px 80px -18px hsl(160 36% 36% / 0.35), 0 12px 36px -12px hsl(222 100% 59% / 0.30)"
    : "0 1px 0 0 rgba(255,255,255,0.85) inset, 0 20px 60px -20px rgba(20,25,40,0.22), 0 6px 20px -8px rgba(20,25,40,0.10)";

  return (
    <div
      className={cn(
        "relative rounded-3xl border overflow-hidden",
        "backdrop-blur-2xl backdrop-saturate-150",
        "before:content-[''] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/85 before:to-transparent",
        "after:content-[''] after:pointer-events-none after:absolute after:-top-1/2 after:-left-1/2 after:h-full after:w-full after:rounded-full after:bg-white/20 after:blur-3xl after:opacity-40",
        toneClass,
        className
      )}
      style={{ ...bgStyle, boxShadow: glowShadow, ...style }}
      {...rest}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

export default GlassCard;
