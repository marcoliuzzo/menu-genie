import SlideShell from "../SlideShell";

const tiers = [
  { label: "TAM", value: "€48B", desc: "Mercato globale food-tech consumer" },
  { label: "SAM", value: "€6.2B", desc: "Europa — meal planning & grocery AI" },
  { label: "SOM", value: "€180M", desc: "Italia — early adopter digitali" },
];

const Slide05Market = () => (
  <SlideShell eyebrow="Opportunità di mercato">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-foreground text-center">
      Un mercato in crescita.
      <span className="block gradient-primary-text mt-2">Un problema ancora irrisolto.</span>
    </h2>
    <div className="mt-16 flex justify-center items-end gap-6 md:gap-10">
      {tiers.map((t, i) => {
        const size = 180 + i * 90;
        return (
          <div key={t.label} className="flex flex-col items-center">
            <div
              className="rounded-full border border-accent/30 bg-accent/5 flex flex-col items-center justify-center"
              style={{ width: size, height: size }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t.label}
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-primary-text mt-1">
                {t.value}
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center max-w-[180px]">
              {t.desc}
            </div>
          </div>
        );
      })}
    </div>
    <p className="mt-14 text-center text-lg md:text-xl text-foreground">
      Milioni di persone affrontano ogni giorno lo stesso problema.
    </p>
  </SlideShell>
);

export default Slide05Market;
