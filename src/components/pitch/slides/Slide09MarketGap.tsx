import SlideShell from "../SlideShell";

const competitors = [
  { name: "Bring!", x: 22, y: 30 },
  { name: "KitchenPal", x: 38, y: 42 },
  { name: "Whisk", x: 30, y: 58 },
  { name: "Mealia", x: 52, y: 35 },
  { name: "Grocery AI", x: 58, y: 62 },
];

const Slide09MarketGap = () => (
  <SlideShell eyebrow="Il vuoto di mercato">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      Alta integrazione. Alta personalizzazione.
      <span className="block gradient-primary-text mt-2">Nessuno occupa questo spazio.</span>
    </h2>
    <div className="mt-10 relative mx-auto h-[440px] w-full max-w-[560px] rounded-2xl border border-border/60 bg-card">
      <div className="absolute left-8 right-8 top-1/2 h-px bg-border" />
      <div className="absolute top-8 bottom-8 left-1/2 w-px bg-border" />
      <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        + Personalizzazione
      </span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        − Personalizzazione
      </span>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-muted-foreground -rotate-90 origin-left translate-x-2">
        − Integrazione
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest text-muted-foreground rotate-90 origin-right -translate-x-2">
        + Integrazione
      </span>

      {competitors.map((c) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${c.x}%`, top: `${c.y + 10}%` }}
        >
          <div className="h-3 w-3 rounded-full bg-muted-foreground/60" />
          <span className="mt-1 text-[11px] text-muted-foreground whitespace-nowrap">{c.name}</span>
        </div>
      ))}

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ left: "78%", top: "22%" }}
      >
        <div className="h-5 w-5 rounded-full bg-accent shadow-lg shadow-accent/40 ring-4 ring-accent/20" />
        <span className="mt-2 text-sm font-bold text-accent">PlanEat</span>
      </div>
    </div>
  </SlideShell>
);

export default Slide09MarketGap;
