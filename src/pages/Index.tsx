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
  Check,
  X,
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Home,
  Layers,
  Smile,
  Lightbulb,
  AlertTriangle,
  PieChart,
  BarChart3,
  Utensils,
  ShoppingCart,
  Database,
  Cpu,
  Megaphone,
  Handshake,
  Rocket,
  Crown,
  Lock,
  RefreshCw,
  Star,
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
  { icon: Zap, title: "Sovraccarico decisionale", desc: "Dieta, budget, allergie, tempo, gusti familiari. Troppe variabili contemporaneamente." },
  { icon: Clock, title: "Spreco di tempo e denaro", desc: "Lista disorganizzata, acquisti impulsivi, cibo che scade nel frigorifero." },
  { icon: Layers, title: "Strumenti non integrati", desc: "Un'app per le ricette, una per la lista, una per le offerte. Nessuna che fa tutto insieme." },
];

const solutionPoints = [
  { icon: Sparkles, title: "AI Meal Planning", desc: "21 pasti settimanali generati su misura per te, rispettando dieta, allergie e preferenze." },
  { icon: CreditCard, title: "Confronto prezzi", desc: "Confronta supermercati della tua zona e trova il risparmio migliore sulla tua lista." },
  { icon: Heart, title: "Gestione dispensa", desc: "Riduci sprechi riutilizzando ciò che hai già in casa. L'AI lo sa e ne tiene conto." },
];

const marketData = [
  { label: "TAM", value: "9-12M", desc: "Italiani che fanno la spesa settimanale", color: "primary" },
  { label: "SAM", value: "2.4-3.1M", desc: "Utenti attivi in app food/grocery", color: "accent" },
  { label: "SOM", value: "80-180K", desc: "Target raggiungibile nei primi 18 mesi", color: "primary" },
];

const competitors = [
  { name: "Bring! / Listonic", desc: "Lista spesa condivisa, input manuale", lista: true, meal: false, prezzi: false, ai: false },
  { name: "DoveConviene", desc: "Offerte e volantini digitali", lista: false, meal: false, prezzi: true, ai: false },
  { name: "Zeuler", desc: "Confronto prezzi e delivery", lista: true, meal: false, prezzi: true, ai: false },
  { name: "Foodder", desc: "Gestione dispensa anti-spreco", lista: false, meal: false, prezzi: false, ai: false },
  { name: "EasyPlan", desc: "Nutrizione e meal planning", lista: false, meal: true, prezzi: false, ai: false },
  { name: "PlanEat", desc: "Ecosistema AI integrato", lista: true, meal: true, prezzi: true, ai: true },
];

const personas = [
  { icon: Briefcase, name: "Lisa", title: "Target Primario", age: "27-35", pain: "Usa strumenti separati (note, app ricette, delivery). Frammentazione e perdita di tempo ogni giorno.", need: "Semplificazione totale: un unico flusso, zero decisioni inutili", behavior: "Alto carico decisionale quotidiano. Cerca semplificazione, non solo risparmio. Alta probabilità di adozione." },
  { icon: Home, name: "Marco", title: "Target Secondario", age: "35-50", pain: "Coordinare pasti, dispensa e budget familiare. Pianificazione parziale e attenzione alle promozioni.", need: "Ottimizzare e avere controllo su spesa e alimentazione familiare", behavior: "Pianifica parzialmente. Più propenso alla conversione Premium." },
  { icon: GraduationCap, name: "Siria", title: "Target Secondario", age: "20-26", pain: "Budget limitato, comportamento impulsivo, poca organizzazione. Sprechi frequenti e disordine.", need: "Soluzione immediata, semplice, zero configurazione", behavior: "Alta sensibilità al prezzo. Forte fit con la versione gratuita." },
];

const differentiators = [
  { icon: Layers, title: "Integrazione end-to-end", desc: "Dalla dispensa al supermercato, tutto in un unico flusso senza uscire dall'app." },
  { icon: Smile, title: "Mood-based planning", desc: "Il primo sistema che adatta i pasti al tuo stato d'animo del momento." },
  { icon: Sparkles, title: "AI personalizzata", desc: "Un algoritmo che impara dalle tue preferenze e migliora ad ogni utilizzo." },
  { icon: TrendingUp, title: "Risparmio misurabile", desc: "Confronto prezzi reale tra supermercati della tua zona con dati aggiornati." },
];

const canvasItems = [
  { icon: Handshake, title: "Key Partners", items: ["Provider dati retail", "Partner tecnologici AI/ML", "Piattaforme food & delivery"] },
  { icon: Cpu, title: "Key Activities", items: ["Sviluppo AI e personalizzazione", "Integrazione dati prodotti/prezzi", "Ottimizzazione UX e onboarding"] },
  { icon: Database, title: "Key Resources", items: ["Algoritmo AI proprietario", "Database prodotti e prezzi", "Dati comportamentali utenti"] },
  { icon: Target, title: "Value Proposition", items: ["Riduzione decision fatigue", "Automazione scelte quotidiane", "Più controllo, meno sforzo"] },
  { icon: Users, title: "Customer Segments", items: ["Lisa: professionista urbana (primario)", "Marco: famiglia con figli (secondario)", "Siria: studentessa fuori sede (secondario)"] },
  { icon: Megaphone, title: "Channels", items: ["App mobile (iOS/Android)", "App Store & Play Store", "Social media & passaparola"] },
  { icon: ShoppingCart, title: "Cost Structure", items: ["Sviluppo e manutenzione tech", "Infrastruttura cloud/digitale", "Marketing e acquisizione utenti"] },
  { icon: CreditCard, title: "Revenue Streams", items: ["Freemium → monetizzazione progressiva", "Abbonamento Premium (€3-5/mese)", "Affiliazione GDO & advertising"] },
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
              Fare la spesa è un'attività cognitivamente complessa. Decision fatigue, strumenti frammentati e zero integrazione portano a spreco di tempo, denaro ed energia mentale.
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
              PlanEat integra meal planning, gestione dispensa e confronto prezzi in un'unica piattaforma AI. Personalizzazione intelligente, non frammentazione.
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
              Il risparmio economico è un beneficio derivato. Il vero valore di PlanEat è la riduzione del carico mentale: l'AI decide per te cosa cucinare, cosa comprare e dove risparmiare. Tu ti godi solo il risultato.
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
            <p className="mt-6 text-center text-sm text-muted-foreground md:mt-8">
              Conversione freemium stimata: <strong className="text-foreground">5-10%</strong> degli utenti attivi verso il piano Premium.
            </p>
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
              PlanEat è l'unica piattaforma che copre tutte le dimensioni del ciclo della spesa.
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
                        <td className={`py-3 px-4 ${isPlanEat ? "text-primary font-semibold" : "text-foreground font-medium"}`}>
                          <div>{c.name}</div>
                          <div className="text-[10px] text-muted-foreground font-normal">{c.desc}</div>
                        </td>
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
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
              <p className="text-sm font-medium text-primary">
                🎯 Il mercato è frammentato: ogni player copre una singola funzione. PlanEat è l'unico che integra pasti + dispensa + lista + prezzi + AI in un'unica soluzione.
              </p>
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
              Insight dalla nostra ricerca su oltre 240 rispondenti. Il dato chiave: le persone vogliono decidere meno, non spendere meno.
            </p>
            <div className="mt-10 md:mt-16">
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">R² = 61.7%</p>
                      <p className="text-xs text-muted-foreground">Varianza spiegata dal modello di analisi</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">n &gt; 240</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Driver di adozione della piattaforma:</p>
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
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Utenti con alto carico decisionale nella gestione alimentare quotidiana.
            </p>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {personas.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary md:h-14 md:w-14">
                    <p.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground md:text-lg">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{p.age} anni</p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-destructive/5 p-2.5">
                      <p className="text-xs font-semibold text-destructive mb-0.5">Pain point</p>
                      <p className="text-xs text-muted-foreground">{p.pain}</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-2.5">
                      <p className="text-xs font-semibold text-primary mb-0.5">Bisogno</p>
                      <p className="text-xs text-muted-foreground">{p.need}</p>
                    </div>
                  </div>
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
              PlanEat è per chi vuole smettere di pensare alla spesa e iniziare a viverla. Uniamo AI, nutrizione e retail in un'unica piattaforma con copertura end-to-end.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 md:mt-10">
              {[
                { label: "Chi siamo", value: "Piattaforma AI integrata per la gestione alimentare" },
                { label: "Per chi", value: "Utenti con alto carico decisionale nella spesa" },
                { label: "Perché diversi", value: "Copertura end-to-end: dal menu al carrello" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-card p-5 text-left shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{item.label}</p>
                  <p className="text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
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

      {/* ─── BUSINESS MODEL CANVAS ─── */}
      <RevealSection>
        <section className="bg-secondary py-16 px-4 md:py-24">
          <div className="container">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Business Model <span className="gradient-primary-text">Canvas</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              La struttura completa del modello di business di PlanEat.
            </p>
            <div className="mt-10 grid gap-4 md:mt-16 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {canvasItems.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/60 bg-card p-5 md:p-6 shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary md:h-11 md:w-11">
                    <c.icon className="h-4 w-4 text-primary md:h-5 md:w-5" />
                  </div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground md:text-base">{c.title}</h3>
                  <ul className="space-y-1.5">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <Check className="h-3 w-3 mt-0.5 shrink-0 text-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── MODELLO FREEMIUM ─── */}
      <RevealSection>
        <section className="py-16 px-4 md:py-24">
          <div className="container max-w-4xl">
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-foreground">
              Modello <span className="gradient-primary-text">Freemium</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground md:mt-4 md:text-base">
              Prima acquisizione, poi monetizzazione. Valore immediato per tutti.
            </p>
            <div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
              {/* FREE */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Free</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">€0</p>
                <p className="text-xs text-muted-foreground mb-6">Per sempre</p>
                <ul className="space-y-3">
                  {[
                    "Pianificazione base dei pasti",
                    "Lista spesa automatica",
                    "Gestione dispensa",
                    "Supporto diete e allergie",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* PREMIUM */}
              <div className="relative rounded-2xl border-2 border-accent bg-card p-6 md:p-8 shadow-lg shadow-accent/10">
                <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                  Consigliato
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5">
                  <Crown className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">Premium</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">€3-5<span className="text-sm font-normal text-muted-foreground">/mese</span></p>
                <p className="text-xs text-muted-foreground mb-6">Tutto incluso</p>
                <ul className="space-y-3">
                  {[
                    "Confronto prezzi multi-supermercato",
                    "Ottimizzazione automatica spesa",
                    "Personalizzazione avanzata (diete, obiettivi)",
                    "Integrazione completa dati GDO",
                    "AI avanzata e suggerimenti proattivi",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Flywheel */}
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground md:text-base">Ciclo virtuoso</h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground md:text-sm">
                <span className="rounded-lg bg-secondary px-3 py-1.5 font-medium text-foreground">Più utenti</span>
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="rounded-lg bg-secondary px-3 py-1.5 font-medium text-foreground">Più dati</span>
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="rounded-lg bg-secondary px-3 py-1.5 font-medium text-foreground">Algoritmo migliore</span>
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="rounded-lg bg-secondary px-3 py-1.5 font-medium text-foreground">Più retention</span>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ─── CONCLUSIONE ─── */}
      <RevealSection>
        <section className="relative overflow-hidden py-20 px-4 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
          <div className="container relative z-10 max-w-3xl text-center">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground">
              Da attività complessa a{" "}
              <span className="gradient-primary-text">esperienza intelligente.</span>
            </h2>
            <div className="mx-auto mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 max-w-2xl">
              {[
                { icon: Brain, label: "Problema reale", desc: "Decision fatigue + spreco alimentare: un costo invisibile per milioni di famiglie." },
                { icon: BarChart3, label: "Soluzione validata", desc: "Ricerca su 240+ utenti, driver coerenti, R² = 61.7%." },
                { icon: Lock, label: "Posizionamento unico", desc: "Unica piattaforma integrata nel mercato italiano food-tech." },
                { icon: Handshake, label: "Sfida principale", desc: "Partnership strategiche con la GDO per dati prodotti e prezzi reali." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-card p-5 text-left shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{item.label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 md:mt-12">
              <p className="text-base font-semibold text-foreground md:text-lg">
                🚀 PlanEat trasforma la spesa da attività complessa a <span className="text-accent">esperienza intelligente e automatizzata.</span>
              </p>
            </div>
            <Button
              size="lg"
              className="mt-8 rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
              onClick={() => navigate("/demo")}
            >
              Inizia gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </RevealSection>

      <Footer />
    </div>
  );
};

export default Index;
