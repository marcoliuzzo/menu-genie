import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Clock,
  ChefHat,
  ShoppingCart,
  Check,
  RotateCcw,
  Settings,
  Download,
  Sparkles,
  Lightbulb,
  Wand2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanAdapterControls from "@/components/PlanAdapterControls";
import { useProfile } from "@/context/ProfileContext";
import { fallbackMealPlan } from "@/data/mockData";
import { adaptMealPlan, type AdaptMode } from "@/lib/planAdapter";
import type { MealPlanResult } from "@/types";

const difficultyColor = {
  facile: "bg-primary/10 text-primary",
  media: "bg-amber-100 text-amber-700",
  elaborata: "bg-red-100 text-red-700",
};

const Results = () => {
  const navigate = useNavigate();
  const { profile, mealPlan, setMealPlan } = useProfile();

  // Piano "vivo": parte dal piano in context, ma può essere adattato in-place
  const basePlan = mealPlan || fallbackMealPlan;
  const [livePlan, setLivePlan] = useState<MealPlanResult>(basePlan);
  const [activeMode, setActiveMode] = useState<AdaptMode | null>(null);
  const [isAdapting, setIsAdapting] = useState(false);
  const [changedKeys, setChangedKeys] = useState<Set<string>>(new Set());
  const [animationKey, setAnimationKey] = useState(0); // forza re-mount per fade-in

  const handleAdapt = (mode: AdaptMode) => {
    if (isAdapting) return;
    setIsAdapting(true);
    setActiveMode(mode);

    // Breve loading per comunicare "sto pensando", poi swap istantaneo
    window.setTimeout(() => {
      const result = adaptMealPlan(livePlan, mode);
      const next: MealPlanResult = {
        ...livePlan,
        weeklyMenu: result.weeklyMenu,
        estimatedCost: result.estimatedCost,
        smartTips: result.smartTips,
      };
      setLivePlan(next);
      setMealPlan(next); // sync globale
      setChangedKeys(result.changedKeys);
      setAnimationKey((k) => k + 1);
      setIsAdapting(false);

      // Pulisco l'highlight dopo l'animazione
      window.setTimeout(() => setChangedKeys(new Set()), 1800);
    }, 650);
  };

  // Group grocery by category, mark pantry items
  const grouped = useMemo(
    () =>
      livePlan.groceryList.reduce<Record<string, typeof livePlan.groceryList>>(
        (acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push({
            ...item,
            inPantry:
              item.inPantry ||
              profile.pantry.some(
                (p) => p.toLowerCase() === item.name.toLowerCase()
              ),
          });
          return acc;
        },
        {}
      ),
    [livePlan.groceryList, profile.pantry]
  );

  const totalItems = livePlan.groceryList.length;
  const inPantryCount = Object.values(grouped)
    .flat()
    .filter((i) => i.inPantry).length;

  const estimatedCost = livePlan.estimatedCost;
  const budgetPercent = Math.min(
    (estimatedCost / profile.weeklyBudget) * 100,
    100
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="container max-w-4xl">
          {/* Heading */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
              <Wand2 className="h-3.5 w-3.5" />
              Piano generato automaticamente
            </span>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
              È già pronto.
            </h1>
            <p className="mt-2 text-muted-foreground">
              Abbiamo organizzato la tua settimana. Puoi lasciarlo così — o ritoccarlo in un tap.
            </p>
          </div>

          {/* AI EXPLANATION — perché abbiamo scelto questo */}
          <div className="mb-6 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Creato per te in base a:
            </h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2 transition-colors hover:bg-card">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Tempo disponibile</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2 transition-colors hover:bg-card">
                <ChefHat className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Le tue preferenze</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2 transition-colors hover:bg-card">
                <Check className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Ingredienti in dispensa</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Ottimizzato per ridurre lo sforzo. Nessuna scelta da fare.
            </p>
          </div>

          {/* POST-GENERATION CONTROLS — adatta il piano in un click */}
          <PlanAdapterControls
            onAdapt={handleAdapt}
            active={activeMode}
            disabled={isAdapting}
          />

          {/* Mood Analysis */}
          {livePlan.moodAnalysis && (
            <div className="mb-8 rounded-2xl border bg-primary/5 p-6 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                Perché questo piano funziona per te
              </h2>
              <p className="text-sm leading-relaxed text-foreground/80">
                {livePlan.moodAnalysis}
              </p>
            </div>
          )}

          {/* Weekly menu grid — con loading overlay e animazioni di transformation */}
          <div className="relative mb-12">
            {isAdapting && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm transition-opacity duration-200">
                <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-md">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  Stiamo aggiornando il piano…
                </div>
              </div>
            )}

            <div
              key={animationKey}
              className={[
                "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-300",
                isAdapting ? "opacity-30" : "opacity-100",
              ].join(" ")}
            >
              {livePlan.weeklyMenu.map((day, idx) => (
                <div
                  key={day.day}
                  className="rounded-2xl border bg-card p-5 shadow-sm animate-fade-in-up transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ animationDelay: `${idx * 35}ms` }}
                >
                  <h3 className="mb-3 font-semibold text-foreground">{day.day}</h3>
                  {[
                    { label: "Pranzo", meal: day.lunch, slot: "lunch" as const },
                    { label: "Cena", meal: day.dinner, slot: "dinner" as const },
                  ].map(({ label, meal, slot }) => {
                    const key = `${day.day}-${slot}`;
                    const isChanged = changedKeys.has(key);
                    return (
                      <div
                        key={label}
                        className={[
                          "mb-3 last:mb-0 rounded-lg px-2 py-1.5 -mx-2 transition-colors duration-300",
                          isChanged ? "bg-accent/10 animate-highlight-pulse" : "",
                        ].join(" ")}
                      >
                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1 flex items-center gap-1.5">
                          {label}
                          {isChanged && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-accent/15 px-1.5 py-0 text-[9px] font-semibold uppercase text-accent">
                              <Sparkles className="h-2.5 w-2.5" />
                              nuovo
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-foreground leading-snug">
                          {meal.name}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {meal.prepTime} min
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[meal.difficulty]}`}
                          >
                            {meal.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <ChefHat className="h-5 w-5 text-primary" />
              Stima del budget
            </h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Spesa stimata</span>
              <span className="font-semibold text-foreground transition-all duration-300">
                {estimatedCost}€ / {profile.weeklyBudget}€
              </span>
            </div>
            <Progress value={budgetPercent} className="h-3 transition-all duration-500" />
            <p className="mt-2 text-xs text-muted-foreground">
              {estimatedCost <= profile.weeklyBudget
                ? "Ottimo! Sei dentro il tuo budget settimanale 🎉"
                : "Leggermente sopra budget. Prova \"Più economico\" qui sopra."}
            </p>
          </div>

          {/* Smart Tips */}
          {livePlan.smartTips && livePlan.smartTips.length > 0 && (
            <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Lightbulb className="h-5 w-5 text-primary" />
                Smart Tips
              </h2>
              <div className="space-y-3">
                {livePlan.smartTips.map((tip, i) => (
                  <div
                    key={`${animationKey}-${i}`}
                    className="rounded-xl bg-secondary/50 px-4 py-3 text-sm text-foreground leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grocery list */}
          <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-foreground">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Lista generata automaticamente
            </h2>
            <p className="mb-1 text-sm text-muted-foreground">
              Basata sul tuo piano pasti · ottimizzata per ridurre sprechi
            </p>
            <p className="mb-6 text-xs text-muted-foreground">
              {totalItems} ingredienti · {inPantryCount} già in dispensa
            </p>
            <div className="space-y-6">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {category}
                  </h3>
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-secondary/40 ${
                          item.inPantry ? "bg-primary/5" : ""
                        }`}
                      >
                        {item.inPantry ? (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded border border-border flex-shrink-0" />
                        )}
                        <span
                          className={
                            item.inPantry
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }
                        >
                          {item.name}
                        </span>
                        {item.inPantry && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            In dispensa
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-8">
            <Button
              variant="outline"
              className="gap-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => navigate("/profilo")}
            >
              <Settings className="h-4 w-4" />
              Modifica preferenze
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => navigate("/generazione")}
            >
              <RotateCcw className="h-4 w-4" />
              Rigenera menu
            </Button>
            <Button className="gap-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <Download className="h-4 w-4" />
              Salva lista
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
