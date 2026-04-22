import { useNavigate } from "react-router-dom";
import { Clock, ChefHat, ShoppingCart, Check, RotateCcw, Settings, Download, Sparkles, Lightbulb, Zap, Wallet, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProfile } from "@/context/ProfileContext";
import { fallbackMealPlan } from "@/data/mockData";

const difficultyColor = {
  facile: "bg-primary/10 text-primary",
  media: "bg-amber-100 text-amber-700",
  elaborata: "bg-red-100 text-red-700",
};

const Results = () => {
  const navigate = useNavigate();
  const { profile, mealPlan } = useProfile();

  const plan = mealPlan || fallbackMealPlan;

  // Group grocery by category, mark pantry items
  const grouped = plan.groceryList.reduce<Record<string, typeof plan.groceryList>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({
      ...item,
      inPantry: item.inPantry || profile.pantry.some(
        (p) => p.toLowerCase() === item.name.toLowerCase()
      ),
    });
    return acc;
  }, {});

  const totalItems = plan.groceryList.length;
  const inPantryCount = Object.values(grouped)
    .flat()
    .filter((i) => i.inPantry).length;

  const estimatedCost = plan.estimatedCost;
  const budgetPercent = Math.min((estimatedCost / profile.weeklyBudget) * 100, 100);

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
          <div className="mb-6 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Creato per te in base a:
            </h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Tempo disponibile</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2">
                <ChefHat className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Le tue preferenze</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/60 px-3 py-2">
                <Check className="h-4 w-4 text-accent shrink-0" />
                <span className="text-xs text-foreground">Ingredienti in dispensa</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Ottimizzato per ridurre lo sforzo. Nessuna scelta da fare.
            </p>
          </div>

          {/* QUICK ACTIONS — controllo leggero */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full"
              onClick={() => navigate("/generazione")}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Rigenera settimana
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => navigate("/generazione")}>
              <Zap className="h-3.5 w-3.5" />
              Più veloce
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full" onClick={() => navigate("/generazione")}>
              <Wallet className="h-3.5 w-3.5" />
              Più economico
            </Button>
          </div>

          {/* Mood Analysis */}
          {plan.moodAnalysis && (
            <div className="mb-8 rounded-2xl border bg-primary/5 p-6 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                Perché questo piano funziona per te
              </h2>
              <p className="text-sm leading-relaxed text-foreground/80">
                {plan.moodAnalysis}
              </p>
            </div>
          )}

          {/* Weekly menu grid */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plan.weeklyMenu.map((day) => (
              <div
                key={day.day}
                className="rounded-2xl border bg-card p-5 shadow-sm"
              >
                <h3 className="mb-3 font-semibold text-foreground">{day.day}</h3>
                {[
                  { label: "Pranzo", meal: day.lunch },
                  { label: "Cena", meal: day.dinner },
                ].map(({ label, meal }) => (
                  <div key={label} className="mb-3 last:mb-0">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                      {label}
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
                ))}
              </div>
            ))}
          </div>

          {/* Budget */}
          <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <ChefHat className="h-5 w-5 text-primary" />
              Stima del budget
            </h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Spesa stimata</span>
              <span className="font-semibold text-foreground">{estimatedCost}€ / {profile.weeklyBudget}€</span>
            </div>
            <Progress value={budgetPercent} className="h-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              {estimatedCost <= profile.weeklyBudget
                ? "Ottimo! Sei dentro il tuo budget settimanale 🎉"
                : "Leggermente sopra budget. Prova a modificare le preferenze."}
            </p>
          </div>

          {/* Smart Tips */}
          {plan.smartTips && plan.smartTips.length > 0 && (
            <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Lightbulb className="h-5 w-5 text-primary" />
                Smart Tips
              </h2>
              <div className="space-y-3">
                {plan.smartTips.map((tip, i) => (
                  <div key={i} className="rounded-xl bg-secondary/50 px-4 py-3 text-sm text-foreground leading-relaxed">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grocery list */}
          <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm">
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
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
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
              className="gap-2 rounded-full"
              onClick={() => navigate("/profilo")}
            >
              <Settings className="h-4 w-4" />
              Modifica preferenze
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-full"
              onClick={() => navigate("/generazione")}
            >
              <RotateCcw className="h-4 w-4" />
              Rigenera menu
            </Button>
            <Button className="gap-2 rounded-full">
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
