import { CSSProperties } from "react";
import planeatLogo from "@/assets/planeat-logo.png";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
  animateIn?: boolean;
}

const LogoMark = ({ size = 80, glow = true, className, style, animateIn = true }: Props) => {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{
        ...style,
        animation: animateIn ? "logoRise 700ms cubic-bezier(0.22,1,0.36,1) both" : undefined,
      }}
    >
      {glow && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, hsl(160 36% 36% / 0.45), hsl(222 100% 59% / 0.25) 45%, transparent 70%)",
            filter: "blur(24px)",
            transform: "scale(1.6)",
          }}
        />
      )}
      <img src={planeatLogo} alt="PlanEat" style={{ height: size, width: "auto" }} className="relative" />
      <style>{`@keyframes logoRise{from{opacity:0;transform:scale(0.94);filter:blur(10px)}to{opacity:1;transform:scale(1);filter:blur(0)}}`}</style>
    </div>
  );
};

export default LogoMark;
