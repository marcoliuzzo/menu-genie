import SlideShell from "../SlideShell";

const flow = [
  { step: "Scelta del mood", desc: "L'utente indica come si sente" },
  { step: "Pianificazione pasti", desc: "L'AI compone la settimana" },
  { step: "Gestione dispensa", desc: "Ingredienti già in casa valorizzati" },
  { step: "Lista della spesa", desc: "Solo ciò che serve davvero" },
];

const Slide07Product = () => (
  <SlideShell eyebrow="Esperienza prodotto">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="flex justify-center">
        <div className="relative h-[520px] w-[260px] rounded-[2.5rem] border-8 border-foreground/90 bg-gradient-to-br from-secondary via-background to-primary/10 shadow-2xl">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-foreground/90" />
          <div className="absolute inset-6 top-12 rounded-2xl bg-background/60 border border-border/40 flex items-center justify-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Screenshot MVP
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
          Un'esperienza continua.
          <span className="block gradient-primary-text mt-1">Non funzionalità separate.</span>
        </h2>
        <div className="mt-8 space-y-4">
          {flow.map((f, i) => (
            <div key={f.step} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">
                {i + 1}
              </div>
              <div>
                <div className="text-base font-semibold text-foreground">{f.step}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideShell>
);

export default Slide07Product;
