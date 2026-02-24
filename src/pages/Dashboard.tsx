import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, ShoppingCart, Store, Settings,
  Sparkles, RefreshCw, ChevronLeft, ChevronRight, Loader2, Flame, Package
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

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: CalendarDays, label: "Menù settimanale", id: "menu" },
  { icon: ShoppingCart, label: "Lista spesa", id: "lista" },
  { icon: Package, label: "Dispensa", id: "dispensa" },
  { icon: Flame, label: "Nutrizione", id: "nutrizione" },
  { icon: Store, label: "Supermercato", id: "super", link: "/supermercato" },
  { icon: Settings, label: "Impostazioni", id: "settings" },
];

const weekMenu = [
  { day: "Lunedì", pranzo: "Bowl proteica con quinoa", cena: "Vellutata di zucca", cal: "1450 kcal", calNum: 1450, protein: 65, carbs: 180, fat: 52 },
  { day: "Martedì", pranzo: "Insalata di farro e verdure", cena: "Risotto ai funghi porcini", cal: "1380 kcal", calNum: 1380, protein: 58, carbs: 175, fat: 48 },
  { day: "Mercoledì", pranzo: "Wrap integrale con hummus", cena: "Salmone al forno con broccoli", cal: "1520 kcal", calNum: 1520, protein: 70, carbs: 190, fat: 50 },
  { day: "Giovedì", pranzo: "Pasta al pesto di noci", cena: "Petto di pollo con spinaci", cal: "1410 kcal", calNum: 1410, protein: 62, carbs: 170, fat: 53 },
  { day: "Venerdì", pranzo: "Insalata di ceci e avocado", cena: "Frittata di verdure", cal: "1350 kcal", calNum: 1350, protein: 55, carbs: 165, fat: 49 },
  { day: "Sabato", pranzo: "Bruschette e affettati", cena: "Lasagna tradizionale", cal: "1600 kcal", calNum: 1600, protein: 60, carbs: 200, fat: 58 },
  { day: "Domenica", pranzo: "Pizza fatta in casa", cena: "Zuppa di legumi", cal: "1480 kcal", calNum: 1480, protein: 63, carbs: 185, fat: 51 },
];

// Schiscia pairs: dinner index → next day lunch uses leftovers
const schisciaPairs = new Set([0, 2, 4]); // Lun, Mer, Ven cena → Mar, Gio, Sab pranzo

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  const [schisciaEnabled, setSchisciaEnabled] = useState(false);
  const [swapIngredient, setSwapIngredient] = useState<string | null>(null);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 2000);
  };

  const handleLongPress = (ingredient: string) => {
    setSwapIngredient(ingredient);
  };

  const MealCard = ({ day, meal, label, dayIndex }: { day: string; meal: string; label: string; dayIndex: number }) => {
    const mealKey = `${day}-${label}`;
    const isExpanded = expandedMeal === mealKey;
    const isSchisciaLunch = schisciaEnabled && label === "Pranzo" && dayIndex > 0 && schisciaPairs.has(dayIndex - 1);
    const isDoubleDinner = schisciaEnabled && label === "Cena" && schisciaPairs.has(dayIndex);

    return (
      <div>
        <button
          onClick={() => setExpandedMeal(isExpanded ? null : mealKey)}
          onContextMenu={(e) => { e.preventDefault(); handleLongPress(meal); }}
          className="w-full text-left group"
        >
          <div className="flex items-center gap-1.5">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">{label}</div>
            {isSchisciaLunch && <SchisciaBadge />}
            {isDoubleDinner && <DoublePrepBadge />}
          </div>
          <p className="text-sm text-foreground group-hover:text-primary transition-colors">{meal}</p>
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
            onClose={() => setExpandedMeal(null)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`hidden md:flex flex-col border-r border-border/40 bg-card transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-56"}`}>
          <div className="flex items-center justify-end p-2">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id;
              const content = (
                <button
                  key={item.id}
                  onClick={() => !item.link && setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
              return item.link ? (
                <Link to={item.link} key={item.id}>{content}</Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden flex border-b border-border/40 overflow-x-auto px-2 py-2 gap-1 bg-card">
          {sidebarItems.map((item) =>
            item.link ? (
              <Link key={item.id} to={item.link} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground whitespace-nowrap">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ) : (
              <button key={item.id} onClick={() => setActiveSection(item.id)} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${activeSection === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Dashboard overview */}
          {activeSection === "dashboard" && (
            <div className="max-w-5xl animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">La tua settimana</h1>
                  <p className="text-sm text-muted-foreground mt-1">Piano generato per mood: Relax 🧘</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleRegenerate} disabled={isRegenerating}>
                  {isRegenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Rigenera piano
                </Button>
              </div>

              {/* Schiscia Mode toggle */}
              <div className="mb-6">
                <SchisciaMode enabled={schisciaEnabled} onToggle={setSchisciaEnabled} />
              </div>

              {/* Stats */}
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
                {[
                  { label: "Budget", value: "€55 / €70", accent: false },
                  { label: "Risparmio", value: "€12.40", accent: true },
                  { label: "Ricette", value: "14", accent: false },
                  { label: "Tempo medio", value: schisciaEnabled ? "15 min" : "22 min", accent: false },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`mt-1 text-xl font-bold ${s.accent ? "text-primary" : "text-foreground"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick week view */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {weekMenu.slice(0, 4).map((d, i) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.day}</span>
                      <span className="text-xs text-muted-foreground">{d.cal}</span>
                    </div>
                    <MealCard day={d.day} meal={d.pranzo} label="Pranzo" dayIndex={i} />
                    <div className="mt-2">
                      <MealCard day={d.day} meal={d.cena} label="Cena" dayIndex={i} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm" onClick={() => setActiveSection("menu")} className="text-accent gap-1">
                  Vedi tutti i giorni <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Full menu */}
          {activeSection === "menu" && (
            <div className="max-w-5xl animate-fade-in">
              <h1 className="text-2xl font-bold text-foreground mb-2">Menù settimanale</h1>
              <p className="text-sm text-muted-foreground mb-6">Clicca su un pasto per la ricetta AI. Tieni premuto su un ingrediente per sostituirlo.</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {weekMenu.map((d, i) => (
                  <div key={d.day} className="rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">{d.day}</span>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">{d.cal}</span>
                        <div className="text-[10px] text-muted-foreground">P:{d.protein}g C:{d.carbs}g F:{d.fat}g</div>
                      </div>
                    </div>
                    <MealCard day={d.day} meal={d.pranzo} label="Pranzo" dayIndex={i} />
                    <div className="mt-3">
                      <MealCard day={d.day} meal={d.cena} label="Cena" dayIndex={i} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Smart Shopping list */}
          {activeSection === "lista" && (
            <div className="max-w-3xl animate-fade-in">
              <SmartShoppingList />
            </div>
          )}

          {/* Pantry */}
          {activeSection === "dispensa" && (
            <div className="max-w-3xl animate-fade-in">
              <PantryTracker />
            </div>
          )}

          {/* Nutrition */}
          {activeSection === "nutrizione" && (
            <div className="max-w-3xl animate-fade-in">
              <NutritionMonitor />
            </div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <div className="max-w-lg animate-fade-in space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Impostazioni</h1>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <DietUpload />
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <SchisciaMode enabled={schisciaEnabled} onToggle={setSchisciaEnabled} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Ingredient Swap Panel */}
      {swapIngredient && (
        <IngredientSwap
          ingredient={swapIngredient}
          onSwap={(newIng) => {
            console.log("Swapped to:", newIng);
            setSwapIngredient(null);
          }}
          onClose={() => setSwapIngredient(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
