import { ArrowRight } from "lucide-react";
import SlideShell from "../SlideShell";

const blocks = ["Freemium", "Premium", "Advertising", "Partnership Retail", "Marketplace"];

const Slide11Business = () => (
  <SlideShell eyebrow="Business model">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      Un modello pensato per <span className="gradient-primary-text">crescere</span>.
    </h2>
    <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
      {blocks.map((b, i) => (
        <div key={b} className="flex items-center gap-3">
          <div className="rounded-2xl border border-border/60 bg-card px-5 py-4 min-w-[160px] text-center">
            <span className="text-sm font-semibold text-foreground">{b}</span>
          </div>
          {i < blocks.length - 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" />}
        </div>
      ))}
    </div>
    <p className="mt-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
      Cinque leve di monetizzazione che scalano con l'ecosistema.
    </p>
  </SlideShell>
);

export default Slide11Business;
