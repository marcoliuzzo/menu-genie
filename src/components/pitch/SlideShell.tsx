import { ReactNode } from "react";

interface SlideShellProps {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  align?: "center" | "top";
}

const SlideShell = ({ eyebrow, children, className = "", align = "center" }: SlideShellProps) => {
  return (
    <section
      className={`absolute inset-0 flex flex-col ${
        align === "center" ? "justify-center" : "justify-start pt-16 md:pt-24"
      } px-6 md:px-16 lg:px-24 ${className}`}
    >
      {eyebrow && (
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <div className="w-full max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

export default SlideShell;
