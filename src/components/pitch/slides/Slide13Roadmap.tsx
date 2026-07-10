import SlideShell from "../SlideShell";

const phases = [
  { n: "01", label: "Sviluppo MVP" },
  { n: "02", label: "Validazione" },
  { n: "03", label: "Lancio sul mercato" },
  { n: "04", label: "Partnership strategiche" },
  { n: "05", label: "Espansione ecosistema" },
];

const Slide13Roadmap = () => (
  <SlideShell eyebrow="Roadmap">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-foreground text-center">
      Da MVP a <span className="gradient-primary-text">ecosistema</span>.
    </h2>
    <div className="mt-16 relative">
      <div className="absolute left-8 right-8 top-6 h-px bg-border" />
      <div className="grid grid-cols-5 gap-4">
        {phases.map((p) => (
          <div key={p.n} className="flex flex-col items-center text-center">
            <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
            <div className="mt-6 text-2xl md:text-3xl font-bold gradient-primary-text">{p.n}</div>
            <div className="mt-2 text-sm md:text-base text-foreground px-2">{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

export default Slide13Roadmap;
