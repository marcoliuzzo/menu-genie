import { useState } from "react";
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
  ShoppingCart,
  ChefHat,
  Smile,
  Users,
  Dumbbell,
  Film,
  Wine,
  PartyPopper,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ─── Problem cards ─── */
const problems = [
  {
    icon: Brain,
    title: "Carico mentale",
    desc: "Ogni giorno la stessa domanda: \"Cosa cucino?\". Il cervello merita di meglio.",
  },
  {
    icon: Zap,
    title: "Sovraccarico decisionale",
    desc: "Troppe opzioni, troppi vincoli. Budget, gusti, tempo: tutto pesa.",
  },
  {
    icon: Clock,
    title: "Spreco di tempo e denaro",
    desc: "Lista disorganizzata, acquisti impulsivi, cibo che finisce nel cestino.",
  },
];

/* ─── Steps ─── */
const steps = [
  { icon: ChefHat, title: "Crea il tuo profilo alimentare", step: "01" },
  { icon: CreditCard, title: "Inserisci budget e tempo", step: "02" },
  { icon: Smile, title: "Scegli il tuo MOOD", step: "03" },
  { icon: ShoppingCart, title: "Ottieni menù e lista ottimizzata", step: "04" },
];

/* ─── Moods ─── */
const moods = [
  { emoji: "🧘", label: "Relax", color: "160 36% 36%", bg: "bg-primary/10", border: "border-primary/30" },
  { emoji: "⚡", label: "Energia", color: "0 72% 51%", bg: "bg-red-50", border: "border-red-200" },
  { emoji: "🎯", label: "Focus", color: "222 100% 59%", bg: "bg-accent/10", border: "border-accent/30" },
  { emoji: "💕", label: "Romantic", color: "330 65% 60%", bg: "bg-pink-50", border: "border-pink-200" },
  { emoji: "🌞", label: "Conviviale", color: "45 93% 47%", bg: "bg-yellow-50", border: "border-yellow-200" },
];

const occasions = [
  { icon: Film, label: "Serata film" },
  { icon: Dumbbell, label: "Post allenamento" },
  { icon: Wine, label: "Cena romantica" },
  { icon: Users, label: "Cena in famiglia" },
  { icon: PartyPopper, label: "Con amici" },
];

/* ─── Mock menu preview per mood ─── */
const moodMenus: Record<string, { pranzo: string; cena: string }[]> = {
  Relax: [
    { pranzo: "Zuppa di lenticchie e pane croccante", cena: "Risotto ai funghi porcini" },
    { pranzo: "Insalata tiepida di farro", cena: "Vellutata di zucca e crostini" },
  ],
  Energia: [
    { pranzo: "Bowl proteica con quinoa e pollo", cena: "Salmone al forno con verdure" },
    { pranzo: "Wrap integrale con hummus e crudité", cena: "Stir-fry di tofu e broccoli" },
  ],
  Focus: [
    { pranzo: "Pasta integrale al pesto di noci", cena: "Petto di pollo con spinaci" },
    { pranzo: "Insalata di ceci e avocado", cena: "Omelette con verdure di stagione" },
  ],
  Romantic: [
    { pranzo: "Carpaccio di zucchine con menta", cena: "Tagliatelle al tartufo" },
    { pranzo: "Insalata di gamberi e agrumi", cena: "Filetto con riduzione al vino rosso" },
  ],
  Conviviale: [
    { pranzo: "Bruschette miste e affettati", cena: "Lasagna della tradizione" },
    { pranzo: "Pizza fatta in casa", cena: "Grigliata mista con patate" },
  ],
};

/* ─── Positioning pillars ─── */
const pillars = [
  { icon: CreditCard, title: "Ottimizzazione economica", desc: "Algoritmi che massimizzano ogni euro del tuo budget settimanale." },
  { icon: Target, title: "Personalizzazione intelligente", desc: "Ogni piano è unico, calibrato su di te e le tue esigenze reali." },
  { icon: Heart, title: "Pianificazione emotiva", desc: "Il primo sistema che considera come ti senti, non solo cosa mangi." },
];

/* ─── Component ─── */
const Index = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const currentMenu = selectedMood ? moodMenus[selectedMood] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* ─── 1. HERO ─── */}
      <section className="relative overflow-hidden px-4 py-24 md:py-36">
        {/* Gradient orb background */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Powered by AI
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Pianifichiamo esperienze.{" "}
            <span className="gradient-primary-text">Non solo pasti.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            L'app intelligente che organizza la tua spesa in base a budget, tempo, energia e mood.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
              onClick={() => navigate("/profilo")}
            >
              Prova la demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium"
              onClick={() => document.getElementById("come-funziona")?.scrollIntoView({ behavior: "smooth" })}
            >
              Scopri come funziona
            </Button>
          </div>

          {/* Mockup app floating */}
          <div className="mt-16 w-full max-w-3xl">
            <div className="relative rounded-2xl border border-border/60 bg-card p-1 shadow-2xl shadow-foreground/5">
              <div className="flex items-center gap-1.5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground">spesasmart.app</span>
              </div>
              <div className="rounded-xl bg-secondary/50 p-8">
                <div className="grid gap-3 md:grid-cols-3">
                  {["Lunedì", "Martedì", "Mercoledì"].map((day) => (
                    <div key={day} className="rounded-xl bg-card p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{day}</p>
                      <p className="mt-2 text-sm text-foreground">Pranzo: Pasta al pesto</p>
                      <p className="text-sm text-muted-foreground">Cena: Vellutata di zucca</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. PROBLEMA ─── */}
      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Troppo complesso per essere{" "}
            <span className="gradient-primary-text">solo una spesa.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
            La verità è che pianificare i pasti è una delle attività più stressanti della settimana.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:gradient-primary">
                  <p.icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. COME FUNZIONA ─── */}
      <section id="come-funziona" className="bg-secondary py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Come funziona
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
            Quattro passaggi. Zero stress.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="group relative flex flex-col items-center text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-border bg-card shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:scale-110">
                  <s.icon className="h-7 w-7 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{s.step}</span>
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. MOOD SELECTOR ─── */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Sezione interattiva
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Come ti vuoi sentire questa settimana?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Seleziona un mood e un'occasione. L'AI adatterà il piano per te.
            </p>
          </div>

          {/* Mood palette */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedMood === m.label
                    ? `${m.bg} ${m.border} shadow-md`
                    : "border-border bg-card hover:border-muted-foreground/20"
                }`}
              >
                <span className="text-lg">{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>

          {/* Occasions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {occasions.map((o) => (
              <button
                key={o.label}
                onClick={() => setSelectedOccasion(o.label)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                  selectedOccasion === o.label
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/20"
                }`}
              >
                <o.icon className="h-3.5 w-3.5" />
                {o.label}
              </button>
            ))}
          </div>

          {/* Dynamic preview */}
          {selectedMood && currentMenu && (
            <div className="mt-10 animate-fade-in">
              <p className="mb-4 text-center text-sm font-medium text-accent">
                <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                L'AI sta adattando il tuo piano settimanale…
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {currentMenu.map((day, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {["Lunedì", "Martedì"][i]}
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">Pranzo:</span> {day.pranzo}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">Cena:</span> {day.cena}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 5. OUTPUT AI PREVIEW ─── */}
      <section className="bg-secondary py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tutto in un'unica schermata
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
            Menù, lista della spesa e consigli per risparmiare. Generato in secondi.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Menù card */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <ChefHat className="h-5 w-5" />
                <span className="text-sm font-semibold">Menù settimanale</span>
              </div>
              <div className="space-y-3">
                {["Lun", "Mar", "Mer", "Gio"].map((d) => (
                  <div key={d} className="flex items-center gap-3 rounded-lg bg-secondary/60 px-3 py-2">
                    <span className="text-xs font-bold text-accent">{d}</span>
                    <span className="text-xs text-muted-foreground">Pranzo + Cena</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista spesa */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-semibold">Lista spesa ottimizzata</span>
              </div>
              <div className="space-y-2">
                {["🥦 Verdura — 4 articoli", "🥩 Proteine — 3 articoli", "🍝 Secco — 5 articoli"].map((item) => (
                  <div key={item} className="rounded-lg bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Supermercato */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <BadgeCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">Supermercato consigliato</span>
              </div>
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-sm font-semibold text-foreground">Esselunga — Via Roma 12</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                  <BadgeCheck className="h-3 w-3" />
                  Più conveniente
                </span>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Risparmio stimato: <span className="font-semibold text-primary">€12.40</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. POSIZIONAMENTO ─── */}
      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Oltre le app di ricette.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
            Non un ricettario. Un sistema di intelligenza alimentare.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
