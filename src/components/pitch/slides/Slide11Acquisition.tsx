import SlideShell from "../SlideShell";

const channels = ["Meta Ads", "Google Ads", "Creator Economy", "Referral Program"];
const funnel = [
  { label: "Awareness", w: 100 },
  { label: "Acquisition", w: 78 },
  { label: "Activation", w: 55 },
  { label: "Premium", w: 32 },
];

const Slide11Acquisition = () => (
  <SlideShell eyebrow="Customer acquisition">
    <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
      Dal <span className="gradient-primary-text">primo contatto</span> al Premium.
    </h2>

    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {channels.map((c) => (
        <span
          key={c}
          className="rounded-full border border-border/60 bg-card px-4 py-1.5 text-sm text-foreground"
        >
          {c}
        </span>
      ))}
    </div>

    <div className="mt-10 flex flex-col items-center gap-2">
      {funnel.map((f, i) => (
        <div
          key={f.label}
          className={`h-14 rounded-lg flex items-center justify-center text-sm font-semibold ${
            i === funnel.length - 1
              ? "bg-accent text-accent-foreground"
              : "bg-primary/10 text-foreground border border-primary/20"
          }`}
          style={{ width: `${f.w}%` }}
        >
          {f.label}
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide11Acquisition;
