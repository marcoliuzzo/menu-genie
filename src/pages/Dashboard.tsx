import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, ShoppingCart, Store, Settings,
  Sparkles, RefreshCw, ChevronLeft, ChevronRight, Loader2, Flame, Package, ShieldCheck,
  Recycle, Leaf, TrendingDown, Coffee, Sun, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import RecipeDetail from "@/components/RecipeDetail";
import SmartShoppingList from "@/components/SmartShoppingList";
import SchisciaMode, { SchisciaBadge, DoublePrepBadge } from "@/components/SchisciaMode";
import PantryTracker from "@/components/PantryTracker";
import NutritionMonitor from "@/components/NutritionMonitor";
import DietUpload from "@/components/DietUpload";
import IngredientSwap from "@/components/IngredientSwap";
import DislikedIngredients from "@/components/DislikedIngredients";
import { useProfile } from "@/context/ProfileContext";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Menù", id: "menu" },
  { icon: ShoppingCart, label: "Lista spesa", id: "lista" },
  { icon: Package, label: "Dispensa", id: "dispensa" },
  { icon: Flame, label: "Nutrizione", id: "nutrizione" },
  { icon: Store, label: "Supermercato", id: "super", link: "/supermercato" },
  { icon: Settings, label: "Impostazioni", id: "settings" },
];

const schisciaPairs = new Set([0, 2, 4]);

const Dashboard = () => {
  const { profile, updateProfile, weekMenu, weekOptimization, recomputeSystem } = useProfile();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [swapIngredient, setSwapIngredient] = useState<string | null>(null);

  const schisciaEnabled = profile.schisciaMode;

  const handleRegenerate = () => {
    setIsRegenerating(true);
    recomputeSystem();
    setTimeout(() => setIsRegenerating(false), 1500);
  };

  const dietLabel = profile.diet && profile.diet !== "onnivoro"
    ? profile.diet.charAt(0).toUpperCase() + profile.diet.slice(1)
    : null;

  const MealCard = ({ day, meal, label, dayIndex, mealType }: {
    day: string; meal: string; label: string; dayIndex: number;
    mealType: "colazione" | "pranzo" | "cena";
  }) => {
    const mealKey = `${day}-${label}`;
    const isExpanded = expandedMeal === mealKey;
    const isSchisciaLunch = schisciaEnabled && mealType === "pranzo" && dayIndex > 0 && schisciaPairs.has(dayIndex - 1);
    const isDoubleDinner = schisciaEnabled && mealType === "cena" && schisciaPairs.has(dayIndex);
    const explain = weekMenu[dayIndex]?.explain?.[mealType];

    const MealIcon = mealType === "colazione" ? Coffee : mealType === "pranzo" ? Sun : Moon;

    return (
      <div>
        <button
          onClick={() => setExpandedMeal(isExpanded ? null : mealKey)}
          onContextMenu={(e) => { e.preventDefault(); setSwapIngredient(meal); }}
          className="w-full text-left group"
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <MealIcon className="h-3 w-3 text-muted-foreground" />
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
            {isSchisciaLunch && <SchisciaBadge />}
            {isDoubleDinner && <DoublePrepBadge />}
          </div>
          <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug mt-0.5">{meal}</p>
          {/* Explainable AI tags */}
          {explain && (
            <div className="flex flex-wrap gap-1 mt-1">
              {explain.pantryIngredients.length > 0 && (
                <span className="text-[9px] rounded-full bg-primary/10 text-primary px-1.5 py-0.5">🏠 In dispensa</span>
              )}
              {explain.reusedIngredients.length > 0 && (
                <span className="text-[9px] rounded-full bg-accent/10 text-accent px-1.5 py-0.5">♻️ Riutilizzo</span>
              )}
            </div>
          )}
          {isDoubleDinner && (
            <p className="text-[10px] text-primary mt-0.5">💡 Prepara 2 porzioni in più per domani</p>
          )}
          <p className="text-xs text-accent mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Vedi ricetta AI
          </p>
        </button>
        {isExpanded && (
          <RecipeDetail
            mealName={meal}
            diet={profile.diet}
            allergies={profile.allergies}
            onClose={() => setExpandedMeal(null)}
          />
        )}
      </div>
    );
  };

  const OptimizationSection = () => (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-4">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
        <Recycle className="h-4 w-4 text-primary" />
        Ottimizzazione della settimana
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center">
          <p className="text-lg font-bold text-primary">{weekOptimization.totalMeals}</p>
          <p className="text-[10px] text-muted-foreground">Pasti pianificati</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-accent">{weekOptimization.reusedIngredients.length}</p>
          <p className="text-[10px] text-muted-foreground">Ingredienti riutilizzati</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">{weekOptimization.pantryUsed.length}</p>
          <p className="text-[10px] text-muted-foreground">Da dispensa</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold ${weekOptimization.budgetRespected ? "text-primary" : "text-destructive"}`}>
            €{weekOptimization.estimatedWeeklyCost}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {weekOptimization.budgetRespected ? "✓ Nel budget" : `Sopra budget (€${profile.weeklyBudget})`}
          </p>
        </div>
      </div>
      {weekOptimization.reusedIngredients.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {weekOptimization.reusedIngredients.slice(0, 6).map(r => (
            <span key={r.name} className="text-[10px] rounded-full bg-accent/10 text-accent px-2 py-0.5 border border-accent/20">
              ♻️ {r.name} ({r.meals.length} pasti)
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar desktop */}
        <aside className={`hidden md:flex flex-col border-r border-border/40 bg-card transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-52"}`}>
          <div className="flex items-center justify-end p-2">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id;
              const btn = (
                <button
                  key={item.id}
                  onClick={() => !item.link && setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
              return item.link ? (
                <Link to={item.link} key={item.id}>{btn}</Link>
              ) : (
                <div key={item.id}>{btn}</div>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden flex border-b border-border/40 overflow-x-auto px-2 py-2 gap-1 bg-card scrollbar-none">
          {sidebarItems.map((item) =>
            item.link ? (
              <Link key={item.id} to={item.link} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap shrink-0">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ) : (
              <button key={item.id} onClick={() => setActiveSection(item.id)} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Main */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeSection === "dashboard" && (
            <div className="max-w-5xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h1 className="text-xl font-bold text-foreground md:text-2xl">La tua settimana</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <p className="text-sm text-muted-foreground">
                      21 pasti · Mood: {profile.mood || "Relax"} (peso: {Math.round((profile.moodWeight || 0.5) * 100)}%)
                    </p>
                    {dietLabel && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <ShieldCheck className="h-3 w-3" />{dietLabel}
                      </span>
                    )}
                    {profile.allergies.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                        Senza: {profile.allergies.join(", ")}
                      </span>
                    )}
                    {(profile.dislikedIngredients?.length || 0) > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                        Evitati: {profile.dislikedIngredients.slice(0, 3).join(", ")}{profile.dislikedIngredients.length > 3 ? ` +${profile.dislikedIngredients.length - 3}` : ""}
                      </span>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full gap-2 self-start" onClick={handleRegenerate} disabled={isRegenerating}>
                  {isRegenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Rigenera piano
                </Button>
              </div>

              <OptimizationSection />

              <div className="mb-4">
                <SchisciaMode enabled={schisciaEnabled} onToggle={(v) => updateProfile({ schisciaMode: v })} />
              </div>

              <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-6">
                {[
                  { label: "Budget", value: `€${weekOptimization.estimatedWeeklyCost} / €${profile.weeklyBudget}`, accent: false },
                  { label: "Risparmio", value: weekOptimization.budgetRespected ? `€${profile.weeklyBudget - weekOptimization.estimatedWeeklyCost}` : "—", accent: true },
                  { label: "Pasti", value: "21", accent: false },
                  { label: "Tempo medio", value: schisciaEnabled ? "15 min" : "22 min", accent: false },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-card p-3 md:p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`mt-1 text-lg font-bold md:text-xl ${s.accent ? "text-primary" : "text-foreground"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Preview first 4 days */}
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {weekMenu.slice(0, 4).map((d, i) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card p-3 md:p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.day}</span>
                      <span className="text-[10px] text-muted-foreground">{d.cal}</span>
                    </div>
                    <MealCard day={d.day} meal={d.colazione} label="Colazione" dayIndex={i} mealType="colazione" />
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <MealCard day={d.day} meal={d.pranzo} label="Pranzo" dayIndex={i} mealType="pranzo" />
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <MealCard day={d.day} meal={d.cena} label="Cena" dayIndex={i} mealType="cena" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" onClick={() => setActiveSection("menu")} className="text-accent gap-1">
                  Vedi tutti i 7 giorni <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {activeSection === "menu" && (
            <div className="max-w-5xl animate-fade-in">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground md:text-2xl">Menù settimanale completo</h1>
                {dietLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    <ShieldCheck className="h-3 w-3" />{dietLabel}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">21 pasti (colazione, pranzo, cena) · Clicca per la ricetta AI</p>

              <OptimizationSection />

              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {weekMenu.map((d, i) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card p-3 md:p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.day}</span>
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground">{d.cal}</span>
                        <div className="text-[9px] text-muted-foreground">P:{d.protein}g C:{d.carbs}g F:{d.fat}g</div>
                      </div>
                    </div>
                    <MealCard day={d.day} meal={d.colazione} label="Colazione" dayIndex={i} mealType="colazione" />
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <MealCard day={d.day} meal={d.pranzo} label="Pranzo" dayIndex={i} mealType="pranzo" />
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/30">
                      <MealCard day={d.day} meal={d.cena} label="Cena" dayIndex={i} mealType="cena" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "lista" && (
            <div className="max-w-3xl animate-fade-in">
              <SmartShoppingList />
            </div>
          )}

          {activeSection === "dispensa" && (
            <div className="max-w-3xl animate-fade-in">
              <PantryTracker />
            </div>
          )}

          {activeSection === "nutrizione" && (
            <div className="max-w-3xl animate-fade-in">
              <NutritionMonitor />
            </div>
          )}

          {activeSection === "settings" && (
            <div className="max-w-lg animate-fade-in space-y-4">
              <h1 className="text-xl font-bold text-foreground md:text-2xl">Impostazioni</h1>
              <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
                <DietUpload />
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-4 md:p-6">
                <SchisciaMode enabled={schisciaEnabled} onToggle={(v) => updateProfile({ schisciaMode: v })} />
              </div>
            </div>
          )}
        </main>
      </div>

      {swapIngredient && (
        <IngredientSwap
          ingredient={swapIngredient}
          onSwap={(newIng) => { console.log("Swapped to:", newIng); setSwapIngredient(null); }}
          onClose={() => setSwapIngredient(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
