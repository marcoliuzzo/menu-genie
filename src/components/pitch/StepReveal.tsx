import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useStep } from "./stepContext";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  at: number; // step index at which this becomes visible
  until?: number; // hide after this step (exclusive)
  variant?: "rise" | "fade" | "scale" | "blur" | "zoom";
  duration?: number; // ms
  delay?: number; // ms
  children: ReactNode;
  keepSpace?: boolean; // keep layout space when hidden
}

const StepReveal = ({
  at,
  until,
  variant = "rise",
  duration = 600,
  delay = 0,
  keepSpace = true,
  children,
  className,
  style,
  ...rest
}: Props) => {
  const { step } = useStep();
  const active = step >= at && (until === undefined || step < until);

  const hiddenTransform =
    variant === "rise"
      ? "translateY(24px)"
      : variant === "scale"
      ? "scale(0.96)"
      : variant === "zoom"
      ? "scale(1.06)"
      : "none";
  const hiddenFilter = variant === "blur" ? "blur(12px)" : "blur(6px)";

  const s: CSSProperties = {
    opacity: active ? 1 : 0,
    transform: active ? "none" : hiddenTransform,
    filter: active ? "blur(0)" : hiddenFilter,
    transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    pointerEvents: active ? "auto" : "none",
    ...(keepSpace ? {} : { position: active ? "relative" : "absolute" }),
    ...style,
  };
  return (
    <div className={cn(className)} style={s} {...rest}>
      {children}
    </div>
  );
};

export default StepReveal;
