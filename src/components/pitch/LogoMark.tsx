import { CSSProperties } from "react";
import planeatLogo from "@/assets/planeat-logo.png";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
  animateIn?: boolean;
  wordmark?: boolean; // include text "PlanEat" from image (default true — image already contains it)
}

const LogoMark = ({ size = 80, glow = true, className, style, animateIn = true }: Props) => {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{
        ...style,
        animation: animateIn ? "logoRise 900ms cubic-bezier(0.22,1,0.36,1) both" : undefined,
      }}
    >
      {glow && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, hsl(222 100% 59% / 0.42), hsl(160 36% 36% / 0.28) 45%, transparent 72%)",
            filter: "blur(28px)",
            transform: "scale(1.8)",
          }}
        />
      )}
      <img
        src={planeatLogo}
        alt="PlanEat"
        style={{ height: size, width: "auto" }}
        className="relative select-none pointer-events-none"
        draggable={false}
      />
      <style>{`@keyframes logoRise{0%{opacity:0;transform:scale(0.86);filter:blur(14px)}60%{opacity:1;filter:blur(0)}100%{opacity:1;transform:scale(1);filter:blur(0)}}`}</style>
    </div>
  );
};

export default LogoMark;
