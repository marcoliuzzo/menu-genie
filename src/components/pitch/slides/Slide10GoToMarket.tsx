import SlideShell from "../SlideShell";

const phases = [
  { year: "Anno 1", label: "Young Professionals" },
  { year: "Anno 2", label: "Famiglie" },
  { year: "Anno 3", label: "Espansione" },
];

const Slide10GoToMarket = () => (
  <SlideShell eyebrow="Go to market">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      Partire in modo mirato.
      <span className="block gradient-primary-text mt-2">Crescere progressivamente.</span>
    </h2>
    <div className="mt-16 relative">
      <div className="absolute left-8 right-8 top-6 h-px bg-border" />
      <div className="grid grid-cols-3 gap-6">
        {phases.map((p) => (
          <div key={p.year} className="flex flex-col items-center text-center">
            <div className="h-4 w-4 rounded-full bg-accent ring-4 ring-accent/20" />
            <div className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {p.year}
            </div>
            <div className="mt-2 text-xl md:text-2xl font-bold text-foreground">{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

export default Slide10GoToMarket;
