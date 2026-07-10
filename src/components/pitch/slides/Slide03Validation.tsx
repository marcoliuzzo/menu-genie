import SlideShell from "../SlideShell";

const insights = [
  "Il meal planning è il principale driver di adozione",
  "La gestione della dispensa è molto apprezzata",
  "L'integrazione con i supermercati è considerata fondamentale",
];

const Slide03Validation = () => (
  <SlideShell eyebrow="Validazione">
    <div className="text-center">
      <div className="text-[clamp(6rem,16vw,12rem)] font-bold leading-none tracking-tight gradient-primary-text">
        227
      </div>
      <p className="mt-2 text-xl md:text-2xl text-muted-foreground">Persone intervistate</p>
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {insights.map((t) => (
        <div key={t} className="rounded-2xl border border-border/60 bg-card p-6 text-center">
          <p className="text-base text-foreground leading-relaxed">{t}</p>
        </div>
      ))}
    </div>
    <blockquote className="mt-12 text-center text-xl md:text-2xl italic text-foreground max-w-3xl mx-auto">
      "Le persone non vogliono spendere meno.
      <span className="block mt-2 font-semibold">Vogliono decidere meno."</span>
    </blockquote>
  </SlideShell>
);

export default Slide03Validation;
