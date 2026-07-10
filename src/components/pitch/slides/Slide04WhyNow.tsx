import { Brain, ShoppingBag, Recycle, Sparkles } from "lucide-react";
import SlideShell from "../SlideShell";

const drivers = [
  { icon: Brain, label: "Diffusione dell'AI", desc: "Modelli accessibili e personalizzati" },
  { icon: ShoppingBag, label: "Spesa digitale", desc: "GDO online in forte crescita" },
  { icon: Recycle, label: "Anti-spreco", desc: "Consapevolezza alimentare crescente" },
  { icon: Sparkles, label: "Bisogno di semplicità", desc: "Sovraccarico decisionale quotidiano" },
];

const Slide04WhyNow = () => (
  <SlideShell eyebrow="Perché ora">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-foreground">
      Quattro forze convergono.
      <span className="block gradient-primary-text mt-2">Oggi è il momento.</span>
    </h2>
    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
      {drivers.map((d) => (
        <div key={d.label} className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <d.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-base font-semibold text-foreground">{d.label}</div>
          <div className="mt-1 text-sm text-muted-foreground">{d.desc}</div>
        </div>
      ))}
    </div>
    <p className="mt-12 text-lg text-muted-foreground max-w-3xl">
      Le decisioni alimentari diventano sempre più complesse. Gli strumenti per gestirle sono ancora frammentati.
    </p>
  </SlideShell>
);

export default Slide04WhyNow;
