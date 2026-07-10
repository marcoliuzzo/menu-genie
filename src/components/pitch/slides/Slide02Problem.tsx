import SlideShell from "../SlideShell";

const thoughts = [
  "Non so cosa mangiare",
  "Perdo tempo a pianificare",
  "Spreco ingredienti",
  "Faccio acquisti inutili",
  "Non riesco a organizzarmi",
  "Non ho voglia di decidere",
];

const Slide02Problem = () => (
  <SlideShell eyebrow="Il problema">
    <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-foreground">
      Il vero peso non è il cibo.
      <span className="block gradient-primary-text mt-2">È il carico decisionale.</span>
    </h2>
    <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4">
      {thoughts.map((t) => (
        <div
          key={t}
          className="rounded-2xl border border-dashed border-border bg-card p-6"
        >
          <p className="text-base md:text-lg text-foreground italic">"{t}"</p>
        </div>
      ))}
    </div>
    <p className="mt-12 text-lg md:text-xl text-muted-foreground max-w-3xl">
      Il problema non è il cibo. È tutto il processo decisionale che lo precede.
    </p>
  </SlideShell>
);

export default Slide02Problem;
