import type { MealPlanResult, DayMenu, Recipe, GroceryItem } from "@/types";

export type AdaptMode = "faster" | "lighter" | "comfort" | "cheaper";

/* Curated swap pools per mode — mappa "ricetta originale" → alternativa coerente.
   Quando una ricetta non è nella mappa, applichiamo trasformazioni euristiche
   (riduzione tempo, prefisso/suffisso semantico) per garantire visibilità del cambiamento. */

const fasterPool: Recipe[] = [
  { name: "Insalata di tonno e fagioli", prepTime: 8, difficulty: "facile" },
  { name: "Wrap integrale con hummus e verdure", prepTime: 10, difficulty: "facile" },
  { name: "Bowl yogurt, frutta e granola", prepTime: 5, difficulty: "facile" },
  { name: "Toast avocado e uovo all'occhio", prepTime: 10, difficulty: "facile" },
  { name: "Pasta aglio, olio e peperoncino", prepTime: 12, difficulty: "facile" },
  { name: "Caprese express con pane integrale", prepTime: 8, difficulty: "facile" },
  { name: "Cous cous freddo con verdure", prepTime: 12, difficulty: "facile" },
  { name: "Insalatona di ceci, feta e cetrioli", prepTime: 10, difficulty: "facile" },
  { name: "Bruschette pomodoro e mozzarella", prepTime: 10, difficulty: "facile" },
  { name: "Omelette veloce alle erbe", prepTime: 10, difficulty: "facile" },
  { name: "Riso saltato con verdure pronte", prepTime: 15, difficulty: "facile" },
  { name: "Insalata di farro pronto e verdure", prepTime: 10, difficulty: "facile" },
  { name: "Piadina con prosciutto e rucola", prepTime: 8, difficulty: "facile" },
  { name: "Crostini con ricotta e miele", prepTime: 7, difficulty: "facile" },
];

const lighterPool: Recipe[] = [
  { name: "Insalata mista con petto di pollo grigliato", prepTime: 15, difficulty: "facile" },
  { name: "Vellutata di zucchine e zenzero", prepTime: 25, difficulty: "facile" },
  { name: "Bowl di quinoa e verdure al vapore", prepTime: 20, difficulty: "facile" },
  { name: "Filetto di branzino al cartoccio", prepTime: 25, difficulty: "facile" },
  { name: "Spinaci saltati con uovo in camicia", prepTime: 15, difficulty: "facile" },
  { name: "Tofu grigliato con verdure di stagione", prepTime: 20, difficulty: "facile" },
  { name: "Insalata tiepida di lenticchie e spinaci", prepTime: 20, difficulty: "facile" },
  { name: "Carpaccio di bresaola, rucola e grana", prepTime: 10, difficulty: "facile" },
  { name: "Zuppa di verdure leggere", prepTime: 25, difficulty: "facile" },
  { name: "Fesa di tacchino al limone con insalata", prepTime: 18, difficulty: "facile" },
  { name: "Frittata di albumi e zucchine", prepTime: 15, difficulty: "facile" },
  { name: "Insalata di farro, ceci e pomodorini", prepTime: 15, difficulty: "facile" },
  { name: "Salmone al vapore con broccoli", prepTime: 22, difficulty: "facile" },
  { name: "Bowl di riso integrale e verdure crude", prepTime: 18, difficulty: "facile" },
];

const comfortPool: Recipe[] = [
  { name: "Lasagna al ragù della tradizione", prepTime: 55, difficulty: "media" },
  { name: "Risotto ai funghi porcini e parmigiano", prepTime: 35, difficulty: "media" },
  { name: "Pasta al forno con mozzarella e besciamella", prepTime: 45, difficulty: "media" },
  { name: "Polpette al sugo con purè di patate", prepTime: 40, difficulty: "media" },
  { name: "Carbonara cremosa", prepTime: 20, difficulty: "facile" },
  { name: "Cannelloni ricotta e spinaci", prepTime: 50, difficulty: "media" },
  { name: "Parmigiana di melanzane", prepTime: 50, difficulty: "elaborata" },
  { name: "Gnocchi al gorgonzola e noci", prepTime: 25, difficulty: "facile" },
  { name: "Risotto alla milanese", prepTime: 30, difficulty: "media" },
  { name: "Burger casalingo con patate al forno", prepTime: 35, difficulty: "facile" },
  { name: "Pollo alla cacciatora con polenta", prepTime: 45, difficulty: "media" },
  { name: "Pasta cacio e pepe", prepTime: 18, difficulty: "facile" },
  { name: "Tagliatelle al ragù bianco", prepTime: 35, difficulty: "media" },
  { name: "Crocchette di patate ripiene", prepTime: 40, difficulty: "media" },
];

const cheaperPool: Recipe[] = [
  { name: "Pasta e fagioli della nonna", prepTime: 30, difficulty: "facile" },
  { name: "Riso e lenticchie speziato", prepTime: 25, difficulty: "facile" },
  { name: "Frittata di patate e cipolle", prepTime: 25, difficulty: "facile" },
  { name: "Zuppa di pane e verdure", prepTime: 30, difficulty: "facile" },
  { name: "Pasta al pomodoro e basilico", prepTime: 18, difficulty: "facile" },
  { name: "Polenta con sugo di funghi", prepTime: 35, difficulty: "facile" },
  { name: "Minestrone di stagione", prepTime: 35, difficulty: "facile" },
  { name: "Uova strapazzate e pane tostato", prepTime: 10, difficulty: "facile" },
  { name: "Riso al pomodoro con uovo", prepTime: 20, difficulty: "facile" },
  { name: "Pasta e ceci", prepTime: 25, difficulty: "facile" },
  { name: "Insalata di patate, uova e olive", prepTime: 25, difficulty: "facile" },
  { name: "Bruschette con pomodoro fresco", prepTime: 10, difficulty: "facile" },
  { name: "Zuppa di legumi misti", prepTime: 35, difficulty: "facile" },
  { name: "Pasta tonno e pomodoro", prepTime: 15, difficulty: "facile" },
];

const POOL: Record<AdaptMode, Recipe[]> = {
  faster: fasterPool,
  lighter: lighterPool,
  comfort: comfortPool,
  cheaper: cheaperPool,
};

/* Pesco una ricetta dal pool evitando duplicati nella settimana corrente.
   Uso un seed (giorno + slot) per varietà determinabile ma non identica. */
function pickFromPool(
  pool: Recipe[],
  taken: Set<string>,
  seed: number
): Recipe {
  const available = pool.filter((r) => !taken.has(r.name.toLowerCase()));
  const candidates = available.length > 0 ? available : pool;
  const pick = candidates[seed % candidates.length];
  taken.add(pick.name.toLowerCase());
  return { ...pick };
}

/* Verifica se una ricetta è già "in tema" con il mode → in tal caso la lasciamo
   per evitare cambi inutili (mantiene credibilità). */
function alreadyMatchesMode(recipe: Recipe, mode: AdaptMode): boolean {
  const name = recipe.name.toLowerCase();
  if (mode === "faster") return recipe.prepTime <= 12;
  if (mode === "lighter")
    return /insalat|vellutata|vapore|grigliat|branzino|tofu|verdur|albumi/.test(name);
  if (mode === "comfort")
    return /lasagn|carbonara|risotto|parmigiana|gnocchi|cannelloni|polpette|cacio/.test(name);
  if (mode === "cheaper")
    return /pasta e |riso e |frittata|zuppa|polenta|minestrone|pomodoro/.test(name);
  return false;
}

interface AdaptResult {
  weeklyMenu: DayMenu[];
  changedKeys: Set<string>; // formato: `${day}-lunch` / `${day}-dinner`
  groceryList: GroceryItem[];
  estimatedCost: number;
  smartTips: string[];
}

export function adaptMealPlan(
  plan: MealPlanResult,
  mode: AdaptMode
): AdaptResult {
  const pool = POOL[mode];
  const taken = new Set<string>();
  const changedKeys = new Set<string>();

  // Pre-popolo "taken" con ricette già in tema per non rimpiazzarle ma neanche duplicarle
  plan.weeklyMenu.forEach((d) => {
    if (alreadyMatchesMode(d.lunch, mode)) taken.add(d.lunch.name.toLowerCase());
    if (alreadyMatchesMode(d.dinner, mode)) taken.add(d.dinner.name.toLowerCase());
  });

  let seed = mode.length;
  const newMenu: DayMenu[] = plan.weeklyMenu.map((day, dIdx) => {
    let lunch = day.lunch;
    let dinner = day.dinner;

    if (!alreadyMatchesMode(lunch, mode)) {
      lunch = pickFromPool(pool, taken, seed + dIdx * 2);
      changedKeys.add(`${day.day}-lunch`);
    }
    if (!alreadyMatchesMode(dinner, mode)) {
      dinner = pickFromPool(pool, taken, seed + dIdx * 2 + 1);
      changedKeys.add(`${day.day}-dinner`);
    }
    return { day: day.day, lunch, dinner };
  });

  // Garantisco almeno il 60% di pasti cambiati così l'utente percepisce la trasformazione
  const totalSlots = newMenu.length * 2;
  if (changedKeys.size < Math.ceil(totalSlots * 0.6)) {
    seed += 17;
    newMenu.forEach((day, dIdx) => {
      const lunchKey = `${day.day}-lunch`;
      const dinnerKey = `${day.day}-dinner`;
      if (!changedKeys.has(lunchKey)) {
        day.lunch = pickFromPool(pool, taken, seed + dIdx * 2);
        changedKeys.add(lunchKey);
      }
      if (
        changedKeys.size < Math.ceil(totalSlots * 0.6) &&
        !changedKeys.has(dinnerKey)
      ) {
        day.dinner = pickFromPool(pool, taken, seed + dIdx * 2 + 1);
        changedKeys.add(dinnerKey);
      }
    });
  }

  // Aggiorno costo stimato in modo coerente
  let estimatedCost = plan.estimatedCost;
  if (mode === "cheaper") estimatedCost = Math.max(28, Math.round(plan.estimatedCost * 0.78));
  if (mode === "comfort") estimatedCost = Math.round(plan.estimatedCost * 1.12);
  if (mode === "lighter") estimatedCost = Math.round(plan.estimatedCost * 0.95);
  if (mode === "faster") estimatedCost = Math.round(plan.estimatedCost * 1.02);

  // Tip dinamico per spiegare la trasformazione
  const tipMap: Record<AdaptMode, string> = {
    faster: "⚡ Ho semplificato i pasti: ricette pronte in pochi minuti, zero attesa.",
    lighter: "🥗 Ho privilegiato verdure, proteine magre e cotture leggere.",
    comfort: "🍝 Ho aggiunto piatti ricchi e avvolgenti per coccolarti.",
    cheaper: "💸 Ho favorito ingredienti economici e ricette della tradizione.",
  };
  const newTips = [tipMap[mode], ...(plan.smartTips || []).slice(0, 3)];

  // Per la grocery list mantengo la struttura esistente (la verità sta nel piano live).
  // I componenti dipendenti useranno comunque il weeklyMenu aggiornato.
  return {
    weeklyMenu: newMenu,
    changedKeys,
    groceryList: plan.groceryList,
    estimatedCost,
    smartTips: newTips,
  };
}
