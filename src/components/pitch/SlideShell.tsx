import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideShellProps {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  align?: "center" | "top";
  background?: "sand" | "white" | "mesh" | "dark";
}

const SlideShell = ({
  eyebrow,
  children,
  className = "",
  align = "center",
  background = "white",
}: SlideShellProps) => {
  const bg =
    background === "sand"
      ? "bg-[hsl(30_26%_95%)]"
      : background === "dark"
      ? "bg-[hsl(160_25%_10%)] text-background"
      : background === "mesh"
      ? "bg-background"
      : "bg-background";

  return (
    <section className={cn("absolute inset-0 overflow-hidden", bg)}>
      {background === "mesh" && (
        <>
          <div
            aria-hidden
            className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40"
            style={{ background: "radial-gradient(closest-side, hsl(160 36% 36% / 0.35), transparent)" }}
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full opacity-40"
            style={{ background: "radial-gradient(closest-side, hsl(222 100% 59% / 0.30), transparent)" }}
          />
        </>
      )}
      {background === "dark" && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 30% 30%, hsl(160 36% 36% / 0.35), transparent 70%), radial-gradient(50% 40% at 80% 80%, hsl(222 100% 59% / 0.25), transparent 70%)",
            }}
          />
        </>
      )}
      <div
        className={cn(
          "relative h-full w-full flex flex-col px-8 md:px-16 lg:px-24",
          align === "center" ? "justify-center" : "justify-start pt-16 md:pt-24",
          className
        )}
      >
        {eyebrow && (
          <p className="absolute top-8 left-8 md:top-10 md:left-16 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <div className="w-full max-w-6xl mx-auto">{children}</div>
      </div>
    </section>
  );
};

export default SlideShell;
