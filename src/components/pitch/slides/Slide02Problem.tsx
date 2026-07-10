import { ChefHat, ShoppingCart, Package, Tag } from "lucide-react";
import SlideShell from "../SlideShell";

const items = [
  { icon: ChefHat, label: "Ricette", desc: "App e blog sparsi" },
  { icon: ShoppingCart, label: "Lista della spesa", desc: "Note e post-it" },
  { icon: Package, label: "Dispensa", desc: "A memoria" },
  { icon: Tag, label: "Offerte supermercati", desc: "Volantini cartacei" },
];

const Slide02Problem = () => (
  <SlideShell eyebrow="Il problema">
    <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-foreground">
      Troppi strumenti.
      <span className="block gradient-primary-text mt-2">Un solo problema.</span>
    </h2>
    <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
      L'utente oggi è costretto a coordinare da solo un ecosistema completamente frammentato.
    </p>
    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl border border-dashed border-border bg-card p-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <it.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-base font-semibold text-foreground">{it.label}</div>
          <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
        </div>
      ))}
    </div>
  </SlideShell>
);

export default Slide02Problem;
