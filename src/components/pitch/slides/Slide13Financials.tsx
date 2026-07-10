import SlideShell from "../SlideShell";

const kpis = [
  { label: "Crescita utenti", trend: "up" },
  { label: "Utenti premium", trend: "up" },
  { label: "Ricavi", trend: "up" },
  { label: "EBITDA", trend: "up" },
];

const Sparkline = () => (
  <svg viewBox="0 0 120 40" className="w-full h-16">
    <polyline
      fill="none"
      stroke="hsl(var(--accent))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      points="0,32 20,28 40,24 60,18 80,14 100,8 120,4"
    />
    <polyline
      fill="hsl(var(--accent) / 0.1)"
      stroke="none"
      points="0,32 20,28 40,24 60,18 80,14 100,8 120,4 120,40 0,40"
    />
  </svg>
);

const Slide13Financials = () => (
  <SlideShell eyebrow="Financial highlights">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      Traiettoria <span className="gradient-primary-text">scalabile</span> e sostenibile.
    </h2>
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {k.label}
          </div>
          <div className="mt-3">
            <Sparkline />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Placeholder</div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide13Financials;
