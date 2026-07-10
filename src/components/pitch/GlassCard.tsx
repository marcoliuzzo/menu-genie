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
      ? "bg-primary/10 border-primary/25"
      : "bg-white/55 border-white/70";
  const glowStyle: CSSProperties = glow
    ? { boxShadow: "0 20px 60px -20px hsl(160 36% 36% / 0.35), 0 8px 24px -12px hsl(222 100% 59% / 0.25), inset 0 1px 0 0 rgba(255,255,255,0.9)" }
    : { boxShadow: "0 10px 40px -12px rgba(20,20,30,0.18), 0 2px 8px -2px rgba(20,20,30,0.08), inset 0 1px 0 0 rgba(255,255,255,0.85)" };
  return (
    <div
      className={cn(
        "relative rounded-3xl border backdrop-blur-2xl backdrop-saturate-150 overflow-hidden",
        "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent",
        toneClass,
        className
      )}
      style={{ ...glowStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GlassCard;
