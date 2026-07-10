import SlideShell from "../SlideShell";

const milestones = [
  { year: "2026", label: "Lancio MVP" },
  { year: "2027", label: "Crescita e Partnership" },
  { year: "2028", label: "Espansione" },
];

const Slide14Roadmap = () => (
  <SlideShell eyebrow="Roadmap">
    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-foreground text-center">
      Da MVP a <span className="gradient-primary-text">scale-up</span>.
    </h2>
    <div className="mt-16 relative">
      <div className="absolute left-8 right-8 top-6 h-px bg-border" />
      <div className="grid grid-cols-3 gap-6">
        {milestones.map((m) => (
          <div key={m.year} className="flex flex-col items-center text-center">
            <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
            <div className="mt-6 text-3xl md:text-4xl font-bold gradient-primary-text">{m.year}</div>
            <div className="mt-2 text-base md:text-lg text-foreground">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

export default Slide14Roadmap;
