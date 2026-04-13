import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Clock,
  CreditCard,
  Sparkles,
  Zap,
  Heart,
  Target,
  ArrowUpRight,
  Check,
  X,
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Home,
  Layers,
  Smile,
  PieChart,
  BarChart3,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("animate-fade-in"); el.style.opacity = "1"; obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const RevealSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useReveal();
  return <div ref={ref} style={{ opacity: 0 }} className={className}>{children}</div>;
};

/* ─── Data ─── */

const problems = [
  { icon: Brain, title: "Carico mentale", desc: "Ogni giorno la stessa domanda: \"Cosa cucino?\". Il cervello merita di meglio." },
  { icon: Zap, title: "Sovraccarico decisionale", desc: "Troppe variabili: dieta, budget, allergie, tempo. Tutto pesa." },
  { icon: Clock, title: "Spreco di tempo e denaro", desc: "Lista disorganizzata, acquisti impulsivi, cibo che finisce nel cestino." },
  { icon: Layers, title: "Strumenti non integrati", desc: "Un'app per le ricette, una per la lista, una per le offerte. Nessuna che fa tutto." },
];

const solutionPoints = [
  { icon: Sparkles, title: "AI Meal Planning", desc: "21 pasti settimanali generati su misura per te." },
  { icon: CreditCard, title: "Confronto prezzi", desc: "Confronta supermercati e trova il risparmio migliore." },
  { icon: Heart, title: "Gestione dispensa", desc: "Riduci sprechi riutilizzando ciò che hai già in casa." },
];

const marketData = [
  { label: "TAM", value: "9-12M", desc: "Italiani che fanno la spesa settimanale", color: "primary" },
  { label: "SAM", value: "2.4-3.1M", desc: "Utenti attivi in app food/grocery", color: "accent" },
  { label: "SOM", value: "80-180K", desc: "Target raggiungibile nei primi 18 mesi", color: "primary" },
];

const competitors = [
  { name: "App Lista Spesa", lista: true, meal: false, prezzi: false, ai: false },
  { name: "App Ricette", lista: false, meal: true, prezzi: false, ai: false },
  { name: "Volantini online", lista: false, meal: false, prezzi: true, ai: false },
  { name: "PlanEat", lista: true, meal: true, prezzi: true, ai: true },
];

const personas = [
  { icon: Briefcase, title: "Giovane professionista", age: "25-35", pain: "Poco tempo, troppe decisioni dopo il lavoro", need: "Piani rapidi e automatici" },
  { icon: Home, title: "Famiglia", age: "30-45", pain: "Bilanciare gusti diversi, allergie dei figli, budget", need: "Personalizzazione per più persone" },
  { icon: GraduationCap, title: "Studente", age: "18-25", pain: "Budget limitato, poca esperienza in cucina", need: "Ricette facili e risparmio massimo" },
];

const differentiators = [
  { icon: Layers, title: "Integrazione end-to-end", desc: "Dalla dispensa al supermercato, tutto in un unico flusso." },
  { icon: Smile, title: "Mood-based planning", desc: "Il primo sistema che adatta i pasti al tuo stato d'animo." },
  { icon: Sparkles, title: "AI personalizzata", desc: "Un algoritmo che impara e migliora ad ogni utilizzo." },
  { icon: TrendingUp, title: "Risparmio misurabile", desc: "Confronto prezzi reale tra supermercati della tua zona." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-4 py-16 md:py-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Powered by AI
          </div>
          <h1 className="max-w-4xl text-[clamp(1.75rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-foreground">
            Non decidere di più.{" "}
            <span className="gradient-primary-text">Decidi meglio.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-6 md:text-xl">
            L'assistente AI che pianifica i tuoi pasti, gestisce la dispensa e ottimizza la spesa. Tutto in un'unica app.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
            <Button
              size="lg"
              className="rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
              onClick={() => navigate("/demo")}
            >
              Inizia gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium"
              onClick={() => navigate("/come-funziona")}
            >
              Scopri come funziona
            </Button>
          </div>

          {/* App mockup */}
          <div className="mt-10 w-full max-w-3xl animate-fade-in md:mt-16">
            <div className="relative rounded-2xl border border-border/60 bg-card p-1 shadow-2xl shadow-foreground/5">
              <div className="flex items-center gap-1.5 px-4 py-2 md:py-3">
                <div className="h-2 w-2 rounded-full bg-destructive/60 md:h-2.5 md:w-2.5" />
                <div className="h-2 w-2 rounded-full bg-accent/60 md:h-2.5 md:w-2.5" />
                <div className="h-2 w-2 rounded-full bg-primary/60 md:h-2.5 md:w-2.5" />
                <span className="ml-3 text-xs text-muted-foreground">planeat.app</span>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4 md:p-8">
                <div className="grid gap-2 grid-cols-3 md:gap-3">
                  {[
                    { day: "Lunedì", pranzo: "Bowl proteica quinoa", cena: "Vellutata di zucca" },
                    { day: "Martedì", pranzo: "Insalata di farro", cena: "Risotto ai funghi" },
                    { day: "Mercoledì", pranzo: "Wrap integrale", cena: "Salmone al forno" },
                  ].map((d) => (
                    <div key={d.day} className="rounded-xl bg-card p-2 md:p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary md:text-xs">{d.day}</p>
                      <p className="mt-1 text-xs text-foreground md:mt-2 md:text-sm">{d.pranzo}</p>
                      <p className="text-xs text-muted-foreground md:text-sm">{d.cena}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMA ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Troppo complesso per essere <span className="gradient-primary-text">solo una spesa.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Decision fatigue: pianificare i pasti è una delle attività più stressanti della settimana.
            </p>
            <div className="mt-10 grid gap-4 md:mt-16 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {problems.map((p) => (
                <div key={p.title} className="group rounded-2xl border border-border/60 bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:gradient-primary md:mb-5 md:h-12 md:w-12">
                    <p.icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-white md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── SOLUZIONE ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Un ecosistema unico. <span className="gradient-primary-text">Intelligenza applicata.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Meal planning + dispensa + confronto prezzi, integrati dall'AI.
            </p>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {solutionPoints.map((s) => (
                <div key={s.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20 md:mb-5 md:h-14 md:w-14">
                    <s.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── VALUE PROPOSITION ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Target className="h-4 w-4" />
              Value Proposition
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground">
              Non risparmiare di più.{" "}
              <span className="gradient-primary-text">Decidere di meno.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              PlanEat riduce il carico mentale della spesa. L'AI decide per te: cosa cucinare, cosa comprare, dove risparmiare. Tu ti godi solo il risultato.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ─── MARKET (TAM/SAM/SOM) ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Il mercato
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Un'opportunità enorme nel mercato italiano food-tech.
            </p>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {marketData.map((m) => (
                <div key={m.label} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 text-center shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{m.label}</span>
                  <p className={`mt-2 text-4xl font-bold md:text-5xl ${m.color === "accent" ? "text-accent" : "text-primary"}`}>{m.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── COMPETITOR ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Confronto competitivo
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              PlanEat è l'unica piattaforma che copre tutto il ciclo della spesa.
            </p>
            <div className="mt-10 overflow-x-auto md:mt-16">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground"></th>
                    <th className="py-3 px-4 text-center font-medium text-muted-foreground">Lista spesa</th>
                    <th className="py-3 px-4 text-center font-medium text-muted-foreground">Meal plan</th>
                    <th className="py-3 px-4 text-center font-medium text-muted-foreground">Prezzi</th>
                    <th className="py-3 px-4 text-center font-medium text-muted-foreground">AI</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((c) => {
                    const isPlanEat = c.name === "PlanEat";
                    return (
                      <tr key={c.name} className={`border-b border-border/40 ${isPlanEat ? "bg-primary/5" : ""}`}>
                        <td className={`py-3 px-4 font-medium ${isPlanEat ? "text-primary font-semibold" : "text-foreground"}`}>{c.name}</td>
                        {[c.lista, c.meal, c.prezzi, c.ai].map((v, i) => (
                          <td key={i} className="py-3 px-4 text-center">
                            {v ? <Check className={`h-4 w-4 mx-auto ${isPlanEat ? "text-primary" : "text-muted-foreground"}`} /> : <X className="h-4 w-4 mx-auto text-border" />}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── MARKETING INSIGHTS ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Cosa vogliono gli utenti
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Insight dalla nostra ricerca. Il dato chiave: le persone vogliono decidere meno, non spendere meno.
            </p>
            <div className="mt-10 md:mt-16">
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">R² = 61.7%</p>
                    <p className="text-xs text-muted-foreground">Varianza spiegata dal modello di analisi</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Meal planning automatico", pct: 38 },
                    { label: "Gestione dispensa", pct: 28 },
                    { label: "Integrazione supermercati", pct: 22 },
                    { label: "Risparmio diretto", pct: 12 },
                  ].map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground font-medium">{d.label}</span>
                        <span className="text-muted-foreground">{d.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary">
                        <div className="h-2 rounded-full gradient-primary" style={{ width: `${d.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 md:p-6 text-center">
                <p className="text-sm font-semibold text-accent md:text-base">
                  💡 Insight chiave: gli utenti vogliono decidere meno, non spendere meno.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── BUYER PERSONAS ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Per chi è <span className="gradient-primary-text">PlanEat?</span>
            </h2>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {personas.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary md:h-14 md:w-14">
                    <p.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground md:text-lg">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{p.age} anni</p>
                  <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Pain:</strong> {p.pain}</p>
                  <p className="text-sm text-muted-foreground"><strong className="text-foreground">Need:</strong> {p.need}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── POSIZIONAMENTO ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container max-w-3xl text-center">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Non un'app di ricette.
            </h2>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight gradient-primary-text">
              Un sistema integrato.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              PlanEat è per chi vuole smettere di pensare alla spesa e iniziare a viverla. Uniamo AI, nutrizione e retail in un'unica piattaforma.
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ─── DIFFERENZIAZIONE ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Le 4 leve di <span className="gradient-primary-text">PlanEat</span>
            </h2>
            <div className="mt-10 grid gap-6 md:mt-16 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {differentiators.map((d) => (
                <div key={d.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20 md:mb-5 md:h-14 md:w-14">
                    <d.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── BUSINESS MODEL ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Business Model
            </h2>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {[
                { icon: Utensils, title: "Freemium + Premium", desc: "Piano base gratuito. Premium a €3-5/mese con AI avanzata e confronto prezzi illimitato." },
                { icon: PieChart, title: "Affiliazione GDO", desc: "Revenue share con supermercati partner quando l'utente acquista tramite la piattaforma." },
                { icon: TrendingUp, title: "Data insights", desc: "Analisi anonimizzate delle tendenze alimentari per brand e retailer." },
              ].map((b) => (
                <div key={b.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm text-center">
                  <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary md:h-14 md:w-14">
                    <b.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      <Footer />
    </div>
  );
};

export default Index;
