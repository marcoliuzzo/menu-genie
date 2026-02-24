import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Film,
  Dumbbell,
  Wine,
  Users,
  PartyPopper,
  ArrowRight,
  Loader2,
  Repeat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DietUpload from "@/components/DietUpload";

const diets = ["Onnivoro", "Vegetariano", "Vegano", "Keto", "Mediterraneo"];
const allergies = ["Glutine", "Lattosio", "Frutta a guscio", "Uova", "Nessuna"];

const moods = [
  { emoji: "🧘", label: "Relax", colorClass: "bg-primary/10 border-primary/30 text-primary" },
  { emoji: "⚡", label: "Energia", colorClass: "bg-destructive/10 border-destructive/30 text-destructive" },
  { emoji: "🎯", label: "Focus", colorClass: "bg-accent/10 border-accent/30 text-accent" },
  { emoji: "💕", label: "Romantico", colorClass: "bg-pink-100 border-pink-300 text-pink-600" },
  { emoji: "🌞", label: "Conviviale", colorClass: "bg-amber-100 border-amber-300 text-amber-600" },
];

const occasions = [
  { icon: Wine, label: "Cena romantica" },
  { icon: PartyPopper, label: "Con amici" },
  { icon: Users, label: "In famiglia" },
  { icon: Dumbbell, label: "Post allenamento" },
  { icon: Film, label: "Serata film" },
];

const moodMenus: Record<string, { day: string; pranzo: string; cena: string; tempo: string }[]> = {
  Relax: [
    { day: "Lunedì", pranzo: "Zuppa di lenticchie con pane croccante", cena: "Risotto ai funghi porcini", tempo: "25 min" },
    { day: "Martedì", pranzo: "Insalata tiepida di farro e verdure", cena: "Vellutata di zucca con crostini", tempo: "20 min" },
    { day: "Mercoledì", pranzo: "Pasta cacio e pepe", cena: "Frittata di patate al forno", tempo: "15 min" },
  ],
  Energia: [
    { day: "Lunedì", pranzo: "Bowl proteica con quinoa e pollo", cena: "Salmone al forno con verdure", tempo: "30 min" },
    { day: "Martedì", pranzo: "Wrap integrale con hummus", cena: "Stir-fry di tofu e broccoli", tempo: "20 min" },
    { day: "Mercoledì", pranzo: "Insalata di tonno e fagioli", cena: "Pollo alla griglia con patate", tempo: "25 min" },
  ],
  Focus: [
    { day: "Lunedì", pranzo: "Pasta integrale al pesto di noci", cena: "Petto di pollo con spinaci", tempo: "20 min" },
    { day: "Martedì", pranzo: "Insalata di ceci e avocado", cena: "Omelette con verdure di stagione", tempo: "15 min" },
    { day: "Mercoledì", pranzo: "Riso basmati con lenticchie", cena: "Merluzzo al vapore con limone", tempo: "20 min" },
  ],
  Romantico: [
    { day: "Lunedì", pranzo: "Carpaccio di zucchine con menta", cena: "Tagliatelle al tartufo", tempo: "25 min" },
    { day: "Martedì", pranzo: "Insalata di gamberi e agrumi", cena: "Filetto con riduzione al vino", tempo: "35 min" },
    { day: "Mercoledì", pranzo: "Bruschette con burrata e pomodorini", cena: "Risotto allo zafferano", tempo: "30 min" },
  ],
  Conviviale: [
    { day: "Lunedì", pranzo: "Bruschette miste e affettati", cena: "Lasagna della tradizione", tempo: "40 min" },
    { day: "Martedì", pranzo: "Pizza fatta in casa", cena: "Grigliata mista con patate", tempo: "35 min" },
    { day: "Mercoledì", pranzo: "Piadine farcite miste", cena: "Polpette al sugo con purè", tempo: "30 min" },
  ],
};

const Demo = () => {
  const navigate = useNavigate();
  const [diet, setDiet] = useState("Onnivoro");
  const [allergy, setAllergy] = useState("Nessuna");
  const [budget, setBudget] = useState([60]);
  const [timeMode, setTimeMode] = useState<"rapido" | "elaborato">("rapido");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [schisciaEnabled, setSchisciaEnabled] = useState(false);

  const handleMoodSelect = (label: string) => {
    setSelectedMood(label);
    setShowResults(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1800);
  };

  const currentMenu = selectedMood ? moodMenus[selectedMood] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="px-4 py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Demo interattiva
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Prova <span className="gradient-primary-text">Spesa Smart</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Configura il tuo profilo e seleziona un mood per vedere il piano generato.
            </p>
          </div>

          {/* ─── PROFILO ─── */}
          <div className="mt-14 rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6">Il tuo profilo</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Diet */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Regime alimentare</label>
                <div className="flex flex-wrap gap-2">
                  {diets.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDiet(d)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                        diet === d
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Allergie / Intolleranze</label>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAllergy(a)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                        allergy === a
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Budget settimanale: <span className="text-accent font-bold">€{budget[0]}</span>
                </label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={20}
                  max={150}
                  step={5}
                  className="mt-3"
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>€20</span>
                  <span>€150</span>
                </div>
              </div>

              {/* Time mode */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tempo disponibile</label>
                <div className="flex gap-2">
                  {(["rapido", "elaborato"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeMode(t)}
                      className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
                        timeMode === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {t === "rapido" ? "⚡ Rapido (< 20 min)" : "👨‍🍳 Elaborato (> 30 min)"}
                    </button>
                  ))}
                </div>
              </div>
              </div>
            </div>

            {/* Diet Upload */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
              <DietUpload />
            </div>

            {/* Schiscia Mode */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${schisciaEnabled ? "bg-primary/10" : "bg-secondary"}`}>
                    <Repeat className={`h-5 w-5 ${schisciaEnabled ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Schiscia Mode</p>
                    <p className="text-xs text-muted-foreground">Porzioni doppie a cena → pranzo del giorno dopo</p>
                  </div>
                </div>
                <Switch checked={schisciaEnabled} onCheckedChange={setSchisciaEnabled} />
              </div>
            </div>

            {/* ─── MOOD SELECTOR ─── */}
          <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-2">Come ti vuoi sentire questa settimana?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Seleziona un mood e un'occasione. L'AI adatterà tutto per te.
            </p>

            <div className="flex flex-wrap gap-3">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => handleMoodSelect(m.label)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedMood === m.label ? m.colorClass + " shadow-md" : "border-border bg-card hover:border-muted-foreground/20"
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {occasions.map((o) => (
                <button
                  key={o.label}
                  onClick={() => setSelectedOccasion(o.label)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                    selectedOccasion === o.label
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-border text-muted-foreground hover:border-muted-foreground/20"
                  }`}
                >
                  <o.icon className="h-3.5 w-3.5" />
                  {o.label}
                </button>
              ))}
            </div>

            {/* Loading state */}
            {isGenerating && (
              <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
                <Loader2 className="h-8 w-8 text-accent animate-spin" />
                <p className="text-sm font-medium text-accent">L'AI sta creando il tuo piano…</p>
              </div>
            )}

            {/* Results */}
            {showResults && currentMenu && (
              <div className="mt-8 animate-fade-in">
                <p className="mb-4 text-sm font-medium text-primary flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  Piano generato per mood: {selectedMood}
                  {selectedOccasion && ` — ${selectedOccasion}`}
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {currentMenu.map((d) => (
                    <div
                      key={d.day}
                      className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.day}</span>
                        <span className="text-xs text-muted-foreground">{d.tempo}</span>
                      </div>
                      <p className="text-sm text-foreground">{d.pranzo}</p>
                      <p className="text-sm text-muted-foreground mt-1">{d.cena}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button
                    className="rounded-full bg-accent px-8 text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-105"
                    onClick={() => navigate("/dashboard")}
                  >
                    Vai alla dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
