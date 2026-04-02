/**
 * Dietary Constraints Engine (Nutrition Engine)
 * Generates 21-meal weekly plans (colazione/pranzo/cena × 7)
 * with diet validation, allergy filtering, ingredient reuse optimization,
 * mood influence, cooking time constraints, and explainable AI tags.
 */

import { FullDayMenu, MealExplain } from "@/types";

// ── Ingredient Classification ──

export type IngredientCategory =
  | "animal_protein" | "fish" | "seafood" | "dairy" | "eggs"
  | "vegetables" | "fruits" | "legumes" | "grains" | "low_carb"
  | "plant_protein" | "nuts" | "condiments" | "sweeteners" | "processed";

export interface ClassifiedIngredient {
  name: string;
  category: IngredientCategory;
  allergens: string[];
  isHighCarb?: boolean;
}

export const ingredientDatabase: ClassifiedIngredient[] = [
  // Animal protein
  { name: "pollo", category: "animal_protein", allergens: [] },
  { name: "petto di pollo", category: "animal_protein", allergens: [] },
  { name: "manzo", category: "animal_protein", allergens: [] },
  { name: "vitello", category: "animal_protein", allergens: [] },
  { name: "maiale", category: "animal_protein", allergens: [] },
  { name: "prosciutto", category: "animal_protein", allergens: [] },
  { name: "salame", category: "animal_protein", allergens: [] },
  { name: "pancetta", category: "animal_protein", allergens: [] },
  { name: "bresaola", category: "animal_protein", allergens: [] },
  { name: "affettati", category: "animal_protein", allergens: [] },
  { name: "carne", category: "animal_protein", allergens: [] },
  { name: "polpette", category: "animal_protein", allergens: [] },
  { name: "filetto", category: "animal_protein", allergens: [] },
  { name: "bistecca", category: "animal_protein", allergens: [] },
  { name: "agnello", category: "animal_protein", allergens: [] },
  { name: "coniglio", category: "animal_protein", allergens: [] },
  { name: "tacchino", category: "animal_protein", allergens: [] },
  // Fish
  { name: "salmone", category: "fish", allergens: ["pesce"] },
  { name: "tonno", category: "fish", allergens: ["pesce"] },
  { name: "merluzzo", category: "fish", allergens: ["pesce"] },
  { name: "pesce", category: "fish", allergens: ["pesce"] },
  { name: "orata", category: "fish", allergens: ["pesce"] },
  { name: "branzino", category: "fish", allergens: ["pesce"] },
  { name: "acciughe", category: "fish", allergens: ["pesce"] },
  { name: "pesce spada", category: "fish", allergens: ["pesce"] },
  { name: "sgombro", category: "fish", allergens: ["pesce"] },
  { name: "sardine", category: "fish", allergens: ["pesce"] },
  { name: "baccalà", category: "fish", allergens: ["pesce"] },
  { name: "trota", category: "fish", allergens: ["pesce"] },
  // Seafood
  { name: "gamberi", category: "seafood", allergens: ["crostacei"] },
  { name: "gamberetti", category: "seafood", allergens: ["crostacei"] },
  { name: "cozze", category: "seafood", allergens: ["crostacei"] },
  { name: "vongole", category: "seafood", allergens: ["crostacei"] },
  { name: "calamari", category: "seafood", allergens: ["crostacei"] },
  { name: "polpo", category: "seafood", allergens: ["crostacei"] },
  { name: "aragosta", category: "seafood", allergens: ["crostacei"] },
  { name: "crostacei", category: "seafood", allergens: ["crostacei"] },
  // Dairy
  { name: "latte", category: "dairy", allergens: ["lattosio"] },
  { name: "burro", category: "dairy", allergens: ["lattosio"] },
  { name: "parmigiano", category: "dairy", allergens: ["lattosio"] },
  { name: "mozzarella", category: "dairy", allergens: ["lattosio"] },
  { name: "ricotta", category: "dairy", allergens: ["lattosio"] },
  { name: "gorgonzola", category: "dairy", allergens: ["lattosio"] },
  { name: "pecorino", category: "dairy", allergens: ["lattosio"] },
  { name: "formaggio", category: "dairy", allergens: ["lattosio"] },
  { name: "formaggi", category: "dairy", allergens: ["lattosio"] },
  { name: "yogurt", category: "dairy", allergens: ["lattosio"] },
  { name: "panna", category: "dairy", allergens: ["lattosio"] },
  { name: "mascarpone", category: "dairy", allergens: ["lattosio"] },
  { name: "stracchino", category: "dairy", allergens: ["lattosio"] },
  { name: "burrata", category: "dairy", allergens: ["lattosio"] },
  { name: "scamorza", category: "dairy", allergens: ["lattosio"] },
  { name: "provolone", category: "dairy", allergens: ["lattosio"] },
  { name: "taleggio", category: "dairy", allergens: ["lattosio"] },
  { name: "fontina", category: "dairy", allergens: ["lattosio"] },
  { name: "crescenza", category: "dairy", allergens: ["lattosio"] },
  // Eggs
  { name: "uova", category: "eggs", allergens: ["uova"] },
  { name: "uovo", category: "eggs", allergens: ["uova"] },
  { name: "frittata", category: "eggs", allergens: ["uova"] },
  { name: "omelette", category: "eggs", allergens: ["uova"] },
  // Grains
  { name: "pasta", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "penne", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "spaghetti", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "tagliatelle", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "fusilli", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "lasagna", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "gnocchi", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "pane", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "riso", category: "grains", allergens: [], isHighCarb: true },
  { name: "risotto", category: "grains", allergens: [], isHighCarb: true },
  { name: "farro", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "orzo", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "couscous", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "quinoa", category: "grains", allergens: [], isHighCarb: false },
  { name: "pizza", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "focaccia", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "bruschette", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "crostini", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "polenta", category: "grains", allergens: [], isHighCarb: true },
  { name: "patate", category: "grains", allergens: [], isHighCarb: true },
  { name: "piadine", category: "grains", allergens: ["glutine"], isHighCarb: true },
  { name: "wrap", category: "grains", allergens: ["glutine"], isHighCarb: true },
  // Legumes
  { name: "ceci", category: "legumes", allergens: [] },
  { name: "lenticchie", category: "legumes", allergens: [] },
  { name: "fagioli", category: "legumes", allergens: [] },
  { name: "piselli", category: "legumes", allergens: [] },
  { name: "fave", category: "legumes", allergens: [] },
  { name: "edamame", category: "legumes", allergens: ["soia"] },
  { name: "hummus", category: "legumes", allergens: [] },
  { name: "legumi", category: "legumes", allergens: [] },
  // Plant protein
  { name: "tofu", category: "plant_protein", allergens: ["soia"] },
  { name: "tempeh", category: "plant_protein", allergens: ["soia"] },
  { name: "seitan", category: "plant_protein", allergens: ["glutine"] },
  // Vegetables
  { name: "zucchine", category: "vegetables", allergens: [] },
  { name: "spinaci", category: "vegetables", allergens: [] },
  { name: "broccoli", category: "vegetables", allergens: [] },
  { name: "pomodori", category: "vegetables", allergens: [] },
  { name: "carote", category: "vegetables", allergens: [] },
  { name: "zucca", category: "vegetables", allergens: [] },
  { name: "peperoni", category: "vegetables", allergens: [] },
  { name: "melanzane", category: "vegetables", allergens: [] },
  { name: "cavolfiore", category: "vegetables", allergens: [] },
  { name: "funghi", category: "vegetables", allergens: [] },
  { name: "verdure", category: "vegetables", allergens: [] },
  { name: "insalata", category: "vegetables", allergens: [] },
  { name: "avocado", category: "vegetables", allergens: [] },
  { name: "basilico", category: "vegetables", allergens: [] },
  { name: "cipolla", category: "vegetables", allergens: [] },
  { name: "aglio", category: "vegetables", allergens: [] },
  { name: "sedano", category: "vegetables", allergens: [] },
  { name: "cavolo", category: "vegetables", allergens: [] },
  // Fruits
  { name: "mela", category: "fruits", allergens: [] },
  { name: "banana", category: "fruits", allergens: [] },
  { name: "arancia", category: "fruits", allergens: [] },
  { name: "limone", category: "fruits", allergens: [] },
  { name: "fragole", category: "fruits", allergens: [] },
  { name: "agrumi", category: "fruits", allergens: [] },
  { name: "frutta", category: "fruits", allergens: [] },
  { name: "mirtilli", category: "fruits", allergens: [] },
  // Nuts
  { name: "noci", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "mandorle", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "nocciole", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "pistacchi", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "pinoli", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "arachidi", category: "nuts", allergens: ["arachidi", "frutta a guscio"] },
  { name: "anacardi", category: "nuts", allergens: ["frutta a guscio"] },
  { name: "frutta secca", category: "nuts", allergens: ["frutta a guscio"] },
  // Condiments
  { name: "olio", category: "condiments", allergens: [] },
  { name: "olio extravergine", category: "condiments", allergens: [] },
  { name: "aceto", category: "condiments", allergens: [] },
  { name: "salsa di soia", category: "condiments", allergens: ["soia", "glutine"] },
  { name: "pesto", category: "condiments", allergens: ["frutta a guscio", "lattosio"] },
  { name: "tahina", category: "condiments", allergens: ["sesamo"] },
  { name: "sesamo", category: "condiments", allergens: ["sesamo"] },
  { name: "miele", category: "sweeteners", allergens: [] },
  { name: "soia", category: "plant_protein", allergens: ["soia"] },
  { name: "latte di soia", category: "plant_protein", allergens: ["soia"] },
];

// ── Diet Rules ──

export type DietType = "onnivoro" | "vegetariano" | "vegano" | "pescetariano" | "flexitariano" | "keto" | "mediterraneo" | "";

interface DietRule {
  forbiddenCategories: IngredientCategory[];
  forbiddenKeywords: string[];
  restrictedCategories?: IngredientCategory[];
  preferredCategories?: IngredientCategory[];
  description: string;
}

export const dietRules: Record<string, DietRule> = {
  vegano: {
    forbiddenCategories: ["animal_protein", "fish", "seafood", "dairy", "eggs"],
    forbiddenKeywords: [
      "carne", "pollo", "manzo", "maiale", "vitello", "agnello", "tacchino", "coniglio",
      "prosciutto", "salame", "pancetta", "bresaola", "affettati", "polpette", "filetto", "bistecca",
      "salmone", "tonno", "merluzzo", "pesce", "orata", "branzino", "acciughe", "sgombro", "sardine", "baccalà", "trota",
      "gamberi", "gamberetti", "cozze", "vongole", "calamari", "polpo", "aragosta", "crostacei",
      "latte", "burro", "parmigiano", "mozzarella", "ricotta", "gorgonzola", "pecorino",
      "formaggio", "formaggi", "yogurt", "panna", "mascarpone", "stracchino", "burrata",
      "scamorza", "provolone", "taleggio", "fontina", "crescenza",
      "uova", "uovo", "frittata", "omelette",
      "miele",
    ],
    preferredCategories: ["vegetables", "fruits", "legumes", "grains", "plant_protein", "nuts"],
    description: "Nessun ingrediente di origine animale",
  },
  vegetariano: {
    forbiddenCategories: ["animal_protein", "fish", "seafood"],
    forbiddenKeywords: [
      "carne", "pollo", "manzo", "maiale", "vitello", "agnello", "tacchino", "coniglio",
      "prosciutto", "salame", "pancetta", "bresaola", "affettati", "polpette", "filetto", "bistecca",
      "salmone", "tonno", "merluzzo", "pesce", "orata", "branzino", "acciughe", "sgombro", "sardine", "baccalà", "trota",
      "gamberi", "gamberetti", "cozze", "vongole", "calamari", "polpo", "aragosta", "crostacei",
    ],
    preferredCategories: ["vegetables", "fruits", "legumes", "grains", "dairy", "eggs", "nuts"],
    description: "Niente carne né pesce",
  },
  pescetariano: {
    forbiddenCategories: ["animal_protein"],
    forbiddenKeywords: [
      "carne", "pollo", "manzo", "maiale", "vitello", "agnello", "tacchino", "coniglio",
      "prosciutto", "salame", "pancetta", "bresaola", "affettati", "polpette", "filetto", "bistecca",
    ],
    description: "Niente carne, sì al pesce",
  },
  keto: {
    forbiddenCategories: [],
    forbiddenKeywords: [
      "pasta", "penne", "spaghetti", "tagliatelle", "fusilli", "lasagna",
      "riso", "risotto", "pane", "pizza", "focaccia", "gnocchi",
      "patate", "polenta", "couscous", "farro", "orzo",
      "bruschette", "crostini", "piadine", "wrap",
      "zucchero", "miele", "marmellata", "cereali", "granola", "muesli", "cornetto", "biscotti",
    ],
    restrictedCategories: ["grains"],
    preferredCategories: ["vegetables", "fish", "eggs", "dairy", "nuts", "animal_protein"],
    description: "Low-carb, high-fat",
  },
  mediterraneo: {
    forbiddenCategories: [],
    forbiddenKeywords: [],
    preferredCategories: ["vegetables", "fruits", "legumes", "fish", "grains", "nuts", "condiments"],
    description: "Verdure, pesce, olio EVO, cereali integrali",
  },
  flexitariano: {
    forbiddenCategories: [],
    forbiddenKeywords: [],
    preferredCategories: ["vegetables", "fruits", "legumes", "grains", "plant_protein"],
    description: "Prevalentemente vegetale con eccezioni",
  },
  onnivoro: {
    forbiddenCategories: [],
    forbiddenKeywords: [],
    description: "Nessuna restrizione",
  },
};

// ── Allergy Rules ──

export const allergyKeywords: Record<string, string[]> = {
  glutine: [
    "pasta", "penne", "spaghetti", "tagliatelle", "fusilli", "lasagna", "gnocchi",
    "pane", "pizza", "focaccia", "farro", "orzo", "couscous", "seitan",
    "bruschette", "crostini", "piadine", "wrap", "salsa di soia",
    "cornetto", "biscotti", "cereali", "granola", "muesli", "fette biscottate",
  ],
  lattosio: [
    "latte", "burro", "parmigiano", "mozzarella", "ricotta", "gorgonzola", "pecorino",
    "formaggio", "formaggi", "yogurt", "panna", "mascarpone", "stracchino", "burrata",
    "scamorza", "provolone", "taleggio", "fontina", "crescenza", "pesto",
    "cappuccino", "latte macchiato",
  ],
  uova: ["uova", "uovo", "frittata", "omelette"],
  "frutta a guscio": [
    "noci", "mandorle", "nocciole", "pistacchi", "pinoli", "anacardi", "frutta secca", "pesto", "granola",
  ],
  crostacei: ["gamberi", "gamberetti", "cozze", "vongole", "calamari", "polpo", "aragosta", "crostacei"],
  pesce: [
    "salmone", "tonno", "merluzzo", "pesce", "orata", "branzino",
    "acciughe", "sgombro", "sardine", "baccalà", "trota", "pesce spada",
  ],
  soia: ["soia", "tofu", "tempeh", "edamame", "salsa di soia", "latte di soia"],
  sesamo: ["sesamo", "tahina"],
  arachidi: ["arachidi"],
};

// ── Validation ──

export function validateRecipeName(
  recipeName: string,
  dietType: string,
  allergies: string[],
  dislikedIngredients: string[] = []
): { valid: boolean; violations: string[]; hasDisliked: boolean; dislikedFound: string[] } {
  const violations: string[] = [];
  const dislikedFound: string[] = [];
  const lowerName = recipeName.toLowerCase();
  const rules = dietRules[dietType.toLowerCase()] || dietRules.onnivoro;
  
  for (const keyword of rules.forbiddenKeywords) {
    if (lowerName.includes(keyword.toLowerCase())) {
      violations.push(`"${keyword}" non compatibile con dieta ${dietType}`);
    }
  }
  for (const allergy of allergies) {
    const keywords = allergyKeywords[allergy.toLowerCase()];
    if (keywords) {
      for (const keyword of keywords) {
        if (lowerName.includes(keyword.toLowerCase())) {
          violations.push(`"${keyword}" contiene allergene: ${allergy}`);
        }
      }
    }
  }
  for (const disliked of dislikedIngredients) {
    if (lowerName.includes(disliked.toLowerCase())) {
      dislikedFound.push(disliked);
    }
  }
  return { valid: violations.length === 0, violations, hasDisliked: dislikedFound.length > 0, dislikedFound };
}

export function validateIngredients(
  ingredients: string[],
  dietType: string,
  allergies: string[]
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  const rules = dietRules[dietType.toLowerCase()] || dietRules.onnivoro;
  for (const ingredient of ingredients) {
    const lower = ingredient.toLowerCase();
    for (const keyword of rules.forbiddenKeywords) {
      if (lower.includes(keyword.toLowerCase())) {
        violations.push(`"${ingredient}" non compatibile con dieta ${dietType}`);
      }
    }
    for (const allergy of allergies) {
      const keywords = allergyKeywords[allergy.toLowerCase()];
      if (keywords) {
        for (const keyword of keywords) {
          if (lower.includes(keyword.toLowerCase())) {
            violations.push(`"${ingredient}" contiene allergene: ${allergy}`);
          }
        }
      }
    }
  }
  return { valid: violations.length === 0, violations };
}

// ── AI Prompt Builder ──

export function buildDietaryPromptConstraints(dietType: string, allergies: string[]): string {
  const rules = dietRules[dietType.toLowerCase()];
  if (!rules) return "";
  let prompt = "";
  if (rules.forbiddenKeywords.length > 0) {
    prompt += `\n\nVINCOLI DIETETICI OBBLIGATORI (dieta: ${dietType}):`;
    prompt += `\n- VIETATO usare: ${rules.forbiddenKeywords.join(", ")}`;
    prompt += `\n- ${rules.description}`;
  }
  if (rules.preferredCategories?.length) {
    const labels: Record<string, string> = {
      vegetables: "verdure", fruits: "frutta", legumes: "legumi", grains: "cereali",
      fish: "pesce", dairy: "latticini", eggs: "uova",
      plant_protein: "proteine vegetali (tofu, tempeh, seitan)",
      nuts: "frutta secca", animal_protein: "carne", condiments: "condimenti",
    };
    prompt += `\n- PRIVILEGIA: ${rules.preferredCategories.map(c => labels[c] || c).join(", ")}`;
  }
  if (dietType.toLowerCase() === "keto") {
    prompt += `\n- VIETATO: pasta, riso, pane, patate, pizza, cereali, zuccheri`;
    prompt += `\n- CONSIGLIATO: avocado, uova, carne, pesce, formaggi, verdure low-carb`;
  }
  if (dietType.toLowerCase() === "mediterraneo") {
    prompt += `\n- PRIVILEGIA: verdure, frutta, legumi, pesce, olio EVO, cereali integrali`;
    prompt += `\n- LIMITA: carni rosse, cibi ultra-processati`;
  }
  if (allergies.length > 0) {
    prompt += `\n\nALLERGIE:`;
    for (const a of allergies) {
      const kw = allergyKeywords[a.toLowerCase()];
      if (kw) prompt += `\n- ${a.toUpperCase()}: VIETATO ${kw.join(", ")}`;
    }
  }
  if (dietType.toLowerCase() === "vegano") {
    prompt += `\n\nDIETA VEGANA: ZERO ingredienti animali.`;
  }
  prompt += `\n\nOGNI ricetta DEVE rispettare TUTTI i vincoli.`;
  return prompt;
}

// ── 21-Meal Plan Generator ──

interface RawMeal {
  colazione: string;
  pranzo: string;
  cena: string;
  tempo: string;
  cal: string;
  calNum: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Breakfast pools per diet
const breakfasts: Record<string, string[]> = {
  vegano: [
    "Porridge di avena con banana e noci",
    "Smoothie bowl con frutti di bosco e granola",
    "Toast integrale con avocado e pomodorini",
    "Pancake di banana e avena",
    "Frullato proteico con latte di mandorla",
    "Budino di chia con frutta fresca",
    "Muesli con latte di cocco e mirtilli",
  ],
  vegetariano: [
    "Yogurt greco con miele e noci",
    "Toast con ricotta e marmellata",
    "Pancake con mirtilli e sciroppo d'acero",
    "Uova strapazzate con pane tostato",
    "Porridge con mela e cannella",
    "Cappuccino e cornetto integrale",
    "Frullato di banana e yogurt",
  ],
  keto: [
    "Uova strapazzate con avocado",
    "Omelette con spinaci e formaggio",
    "Yogurt greco intero con noci",
    "Pancake proteici con burro di mandorle",
    "Uova al tegamino con pancetta",
    "Smoothie con avocado e cacao",
    "Frittata di verdure low-carb",
  ],
  mediterraneo: [
    "Yogurt greco con miele e noci",
    "Pane integrale con olio EVO e pomodorini",
    "Frutta fresca con mandorle",
    "Fette biscottate con marmellata di agrumi",
    "Porridge di avena con fichi e noci",
    "Spremuta d'arancia e fette con ricotta",
    "Muesli integrale con frutta secca",
  ],
  onnivoro: [
    "Cappuccino e cornetto",
    "Yogurt con cereali e frutta",
    "Toast con prosciutto e formaggio",
    "Uova strapazzate con pane tostato",
    "Porridge con banana e miele",
    "Pancake con sciroppo d'acero",
    "Frullato di frutta e yogurt",
  ],
};

const getMealPool = (diet: string, allergies: string[], dislikedIngredients: string[] = []): RawMeal[] => {
  const hasLactose = allergies.some(a => a.toLowerCase() === "lattosio");
  const hasGluten = allergies.some(a => a.toLowerCase() === "glutine");

  // Get breakfast pool
  let bfPool = breakfasts[diet] || breakfasts.onnivoro;
  // Filter breakfasts by allergies and dislikes
  bfPool = bfPool.filter(b => {
    const v = validateRecipeName(b, diet, allergies, dislikedIngredients);
    return v.valid && !v.hasDisliked;
  });
  if (bfPool.length === 0) {
    // Fallback: relax dislikes, keep allergies/diet
    bfPool = (breakfasts[diet] || breakfasts.onnivoro).filter(b => validateRecipeName(b, diet, allergies).valid);
  }
  if (bfPool.length === 0) bfPool = ["Frutta fresca di stagione"];

  // Get lunch/dinner pool based on diet
  let lunchDinnerPool: { pranzo: string; cena: string; tempo: string; calNum: number; protein: number; carbs: number; fat: number }[];

  if (diet === "vegano") {
    lunchDinnerPool = [
      { pranzo: "Bowl di quinoa con ceci e avocado", cena: "Curry di lenticchie con riso basmati", tempo: "25 min", calNum: 1380, protein: 48, carbs: 195, fat: 42 },
      { pranzo: "Insalata di farro e verdure grigliate", cena: "Vellutata di zucca con crostini", tempo: "20 min", calNum: 1320, protein: 40, carbs: 200, fat: 38 },
      { pranzo: "Pasta al pomodoro fresco e basilico", cena: "Zuppa di legumi misti", tempo: "20 min", calNum: 1350, protein: 45, carbs: 190, fat: 40 },
      { pranzo: "Couscous con verdure e hummus", cena: "Tofu saltato con broccoli", tempo: "20 min", calNum: 1400, protein: 52, carbs: 175, fat: 48 },
      { pranzo: "Riso integrale con fagioli neri", cena: "Melanzane alla parmigiana vegana", tempo: "25 min", calNum: 1360, protein: 42, carbs: 198, fat: 39 },
      { pranzo: "Wrap di verdure con hummus", cena: "Minestrone con legumi e verdure", tempo: "15 min", calNum: 1300, protein: 38, carbs: 188, fat: 36 },
      { pranzo: "Polpette di ceci con insalata", cena: "Pasta e fagioli", tempo: "25 min", calNum: 1420, protein: 50, carbs: 195, fat: 44 },
    ];
  } else if (diet === "vegetariano" && hasLactose) {
    lunchDinnerPool = [
      { pranzo: "Pasta al pomodoro fresco e basilico", cena: "Zuppa di lenticchie con crostini", tempo: "20 min", calNum: 1350, protein: 45, carbs: 195, fat: 38 },
      { pranzo: "Riso con verdure saltate", cena: "Frittata di verdure (senza latticini)", tempo: "20 min", calNum: 1380, protein: 48, carbs: 180, fat: 44 },
      { pranzo: "Insalata di quinoa e ceci", cena: "Vellutata di zucca", tempo: "20 min", calNum: 1320, protein: 42, carbs: 190, fat: 36 },
      { pranzo: "Couscous con verdure grigliate", cena: "Polpette di lenticchie", tempo: "25 min", calNum: 1400, protein: 50, carbs: 192, fat: 42 },
      { pranzo: "Farro con pomodorini e olive", cena: "Minestrone ricco", tempo: "20 min", calNum: 1300, protein: 40, carbs: 188, fat: 35 },
      { pranzo: "Pasta e fagioli", cena: "Verdure grigliate con hummus", tempo: "25 min", calNum: 1360, protein: 44, carbs: 185, fat: 40 },
      { pranzo: "Wrap con hummus e verdure", cena: "Zuppa di ceci e spinaci", tempo: "15 min", calNum: 1280, protein: 42, carbs: 178, fat: 38 },
    ];
  } else if (diet === "vegetariano") {
    lunchDinnerPool = [
      { pranzo: "Risotto alle zucchine e menta", cena: "Frittata di verdure al forno", tempo: "25 min", calNum: 1420, protein: 52, carbs: 185, fat: 50 },
      { pranzo: "Pasta al pesto di basilico", cena: "Insalata caprese con pane integrale", tempo: "20 min", calNum: 1380, protein: 48, carbs: 178, fat: 52 },
      { pranzo: "Gnocchi al pomodoro", cena: "Vellutata di carote e zenzero", tempo: "20 min", calNum: 1350, protein: 42, carbs: 195, fat: 40 },
      { pranzo: "Penne integrali con broccoli", cena: "Pizza margherita fatta in casa", tempo: "30 min", calNum: 1500, protein: 55, carbs: 200, fat: 48 },
      { pranzo: "Insalata di farro con verdure", cena: "Lasagna vegetariana", tempo: "40 min", calNum: 1550, protein: 58, carbs: 198, fat: 55 },
      { pranzo: "Bowl di riso e ceci", cena: "Omelette con verdure di stagione", tempo: "15 min", calNum: 1320, protein: 50, carbs: 170, fat: 46 },
      { pranzo: "Bruschette con pomodoro e basilico", cena: "Zuppa di lenticchie", tempo: "20 min", calNum: 1350, protein: 46, carbs: 188, fat: 42 },
    ];
  } else if (diet === "keto") {
    lunchDinnerPool = [
      { pranzo: "Insalata di avocado e uova sode", cena: "Salmone al forno con broccoli", tempo: "25 min", calNum: 1450, protein: 70, carbs: 18, fat: 110 },
      { pranzo: "Petto di pollo con spinaci e formaggio", cena: "Bistecca con verdure grigliate", tempo: "30 min", calNum: 1520, protein: 85, carbs: 15, fat: 115 },
      { pranzo: "Omelette con zucchine e formaggio", cena: "Merluzzo al burro con cavolfiore", tempo: "20 min", calNum: 1400, protein: 72, carbs: 16, fat: 105 },
      { pranzo: "Insalata greca con feta e olive", cena: "Pollo al forno con peperoni", tempo: "25 min", calNum: 1380, protein: 68, carbs: 20, fat: 100 },
      { pranzo: "Uova strapazzate con avocado", cena: "Tacchino con funghi trifolati", tempo: "15 min", calNum: 1350, protein: 65, carbs: 14, fat: 102 },
      { pranzo: "Carpaccio di zucchine con noci", cena: "Filetto di maiale con spinaci", tempo: "20 min", calNum: 1420, protein: 75, carbs: 12, fat: 108 },
      { pranzo: "Insalata di tonno e avocado", cena: "Pollo alla griglia con insalata", tempo: "20 min", calNum: 1480, protein: 80, carbs: 16, fat: 112 },
    ];
  } else if (diet === "mediterraneo") {
    lunchDinnerPool = [
      { pranzo: "Insalata mediterranea con feta e olive", cena: "Orata al forno con patate", tempo: "30 min", calNum: 1420, protein: 62, carbs: 170, fat: 52 },
      { pranzo: "Pasta integrale al pomodoro e basilico", cena: "Branzino al vapore con verdure", tempo: "25 min", calNum: 1380, protein: 58, carbs: 180, fat: 45 },
      { pranzo: "Farro con ceci e verdure grigliate", cena: "Zuppa di pesce alla marinara", tempo: "30 min", calNum: 1450, protein: 65, carbs: 175, fat: 48 },
      { pranzo: "Bruschette con pomodorini e basilico", cena: "Sgombro alla griglia con insalata", tempo: "20 min", calNum: 1350, protein: 60, carbs: 165, fat: 50 },
      { pranzo: "Insalata di farro e legumi", cena: "Salmone con verdure al forno", tempo: "25 min", calNum: 1400, protein: 63, carbs: 172, fat: 48 },
      { pranzo: "Panzanella toscana", cena: "Merluzzo al cartoccio con olive", tempo: "20 min", calNum: 1320, protein: 55, carbs: 168, fat: 44 },
      { pranzo: "Minestrone con pesto leggero", cena: "Sardine al forno con limone", tempo: "25 min", calNum: 1360, protein: 58, carbs: 175, fat: 46 },
    ];
  } else {
    lunchDinnerPool = [
      { pranzo: "Bowl proteica con quinoa e pollo", cena: "Salmone al forno con broccoli", tempo: "25 min", calNum: 1450, protein: 65, carbs: 180, fat: 52 },
      { pranzo: "Insalata di farro e verdure", cena: "Risotto ai funghi porcini", tempo: "30 min", calNum: 1380, protein: 58, carbs: 175, fat: 48 },
      { pranzo: "Wrap integrale con hummus", cena: "Petto di pollo con spinaci", tempo: "20 min", calNum: 1400, protein: 62, carbs: 170, fat: 50 },
      { pranzo: "Pasta al pesto di noci", cena: "Frittata di verdure", tempo: "20 min", calNum: 1350, protein: 55, carbs: 185, fat: 46 },
      { pranzo: "Insalata di ceci e avocado", cena: "Merluzzo al vapore con limone", tempo: "20 min", calNum: 1380, protein: 60, carbs: 168, fat: 50 },
      { pranzo: "Bruschette miste", cena: "Lasagna tradizionale", tempo: "40 min", calNum: 1600, protein: 60, carbs: 200, fat: 58 },
      { pranzo: "Pizza fatta in casa", cena: "Zuppa di legumi", tempo: "35 min", calNum: 1480, protein: 63, carbs: 185, fat: 51 },
    ];
  }

  // Filter lunch/dinner by allergies and dislikes
  const strictFiltered = lunchDinnerPool.filter(m => {
    const pV = validateRecipeName(m.pranzo, diet, allergies, dislikedIngredients);
    const cV = validateRecipeName(m.cena, diet, allergies, dislikedIngredients);
    return pV.valid && !pV.hasDisliked && cV.valid && !cV.hasDisliked;
  });

  if (strictFiltered.length > 0) {
    lunchDinnerPool = strictFiltered;
  } else {
    // Fallback: relax dislikes, keep allergies/diet
    const relaxed = lunchDinnerPool.filter(m =>
      validateRecipeName(m.pranzo, diet, allergies).valid &&
      validateRecipeName(m.cena, diet, allergies).valid
    );
    lunchDinnerPool = relaxed.length > 0 ? relaxed : [
      { pranzo: "Insalata mista di stagione", cena: "Verdure grigliate con olio EVO", tempo: "15 min", calNum: 1100, protein: 30, carbs: 140, fat: 35 },
    ];
  }

  // Build 7-day plan reusing ingredients across days
  return Array.from({ length: 7 }, (_, i) => {
    const ld = lunchDinnerPool[i % lunchDinnerPool.length];
    return {
      colazione: bfPool[i % bfPool.length],
      pranzo: ld.pranzo,
      cena: ld.cena,
      tempo: ld.tempo,
      cal: `${ld.calNum + 350} kcal`,
      calNum: ld.calNum + 350,
      protein: ld.protein + 12,
      carbs: ld.carbs + 45,
      fat: ld.fat + 10,
    };
  });
};

// ── Mood modifiers (applied when moodWeight > 0.3) ──
const moodModifiers: Record<string, { style: string; preferQuick: boolean }> = {
  Relax: { style: "comfort food leggero", preferQuick: true },
  Energia: { style: "proteico ed energetico", preferQuick: false },
  Focus: { style: "brain food ricco di omega-3", preferQuick: true },
  Romantico: { style: "piatti eleganti e curati", preferQuick: false },
  Conviviale: { style: "piatti da condivisione abbondanti", preferQuick: false },
};

const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

/**
 * Main entry: generates 21-meal weekly plan with explainable AI tags
 */
export function getDietAwareFullMenu(
  dietType: string,
  allergies: string[],
  mood: string,
  moodWeight: number,
  cookingTimeMax: number,
  pantryNames: string[]
): FullDayMenu[] {
  const diet = dietType.toLowerCase();
  const pool = getMealPool(diet, allergies);

  // Track ingredient reuse across meals for optimization
  const allMealNames: string[] = [];

  return days.map((day, i) => {
    const raw = pool[i];
    allMealNames.push(raw.colazione, raw.pranzo, raw.cena);

    const buildExplain = (mealName: string): MealExplain => {
      const lower = mealName.toLowerCase();
      const pantryHits = pantryNames.filter(p => lower.includes(p.split(" ")[0].toLowerCase()));
      const reusedAcross = allMealNames
        .filter(m => m !== mealName)
        .some(m => {
          const mLower = m.toLowerCase();
          return ["pomodor", "spinaci", "zucchine", "ceci", "avocado", "riso", "pasta", "quinoa"]
            .some(ing => lower.includes(ing) && mLower.includes(ing));
        });

      return {
        dietMatch: validateRecipeName(mealName, diet, allergies).valid,
        pantryIngredients: pantryHits,
        reusedIngredients: reusedAcross ? ["ingredienti condivisi"] : [],
        onSaleIngredients: [],
        prepTime: parseInt(raw.tempo) || 20,
      };
    };

    return {
      day,
      colazione: raw.colazione,
      pranzo: raw.pranzo,
      cena: raw.cena,
      tempo: raw.tempo,
      cal: raw.cal,
      calNum: raw.calNum,
      protein: raw.protein,
      carbs: raw.carbs,
      fat: raw.fat,
      explain: {
        colazione: buildExplain(raw.colazione),
        pranzo: buildExplain(raw.pranzo),
        cena: buildExplain(raw.cena),
      },
    };
  });
}

// Legacy compatibility wrapper
export function getDietAwareMenu(dietType: string, allergies: string[]) {
  return getDietAwareFullMenu(dietType, allergies, "Relax", 0.5, 30, []);
}

// ── Demo Mood Menus ──
interface DemoMeal { day: string; pranzo: string; cena: string; tempo: string }

const demoMenusByDiet: Record<string, Record<string, DemoMeal[]>> = {
  vegano: {
    Relax: [
      { day: "Lunedì", pranzo: "Vellutata di zucca con crostini", cena: "Riso integrale con lenticchie", tempo: "25 min" },
      { day: "Martedì", pranzo: "Insalata tiepida di farro e verdure", cena: "Curry di ceci con riso basmati", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Pasta al pomodoro e basilico", cena: "Minestrone con legumi", tempo: "15 min" },
    ],
    Energia: [
      { day: "Lunedì", pranzo: "Bowl di quinoa con ceci e avocado", cena: "Tofu saltato con verdure", tempo: "25 min" },
      { day: "Martedì", pranzo: "Wrap con hummus e verdure grigliate", cena: "Polpette di lenticchie con insalata", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Couscous con verdure e ceci", cena: "Stir-fry di tempeh con broccoli", tempo: "20 min" },
    ],
  },
  vegetariano: {
    Relax: [
      { day: "Lunedì", pranzo: "Zuppa di lenticchie con pane", cena: "Risotto alle zucchine", tempo: "25 min" },
      { day: "Martedì", pranzo: "Insalata tiepida di farro", cena: "Vellutata di zucca con crostini", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Pasta cacio e pepe", cena: "Frittata di verdure al forno", tempo: "15 min" },
    ],
    Energia: [
      { day: "Lunedì", pranzo: "Bowl di quinoa con uova e verdure", cena: "Omelette con spinaci e formaggio", tempo: "20 min" },
      { day: "Martedì", pranzo: "Wrap integrale con hummus", cena: "Pasta al pesto con pomodorini", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Insalata di ceci e avocado", cena: "Pizza margherita fatta in casa", tempo: "25 min" },
    ],
  },
  keto: {
    Relax: [
      { day: "Lunedì", pranzo: "Insalata di avocado e uova", cena: "Salmone al forno con broccoli", tempo: "25 min" },
      { day: "Martedì", pranzo: "Omelette con zucchine", cena: "Pollo al forno con verdure", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Carpaccio di zucchine con noci", cena: "Merluzzo al burro con spinaci", tempo: "20 min" },
    ],
    Energia: [
      { day: "Lunedì", pranzo: "Uova strapazzate con avocado", cena: "Bistecca con verdure grigliate", tempo: "25 min" },
      { day: "Martedì", pranzo: "Insalata di tonno e avocado", cena: "Pollo alla griglia con insalata", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Omelette proteica con formaggio", cena: "Salmone con cavolfiore al forno", tempo: "25 min" },
    ],
  },
};

export function getDemoMenuForMoodAndDiet(
  mood: string,
  diet: string,
  allergies: string[]
): DemoMeal[] | null {
  const dietKey = diet.toLowerCase();
  const menus = demoMenusByDiet[dietKey];
  if (!menus) return null;
  const moodMenus = menus[mood];
  if (!moodMenus) return null;

  // Filter by allergies
  const filtered = moodMenus.filter(m =>
    validateRecipeName(m.pranzo, dietKey, allergies).valid &&
    validateRecipeName(m.cena, dietKey, allergies).valid
  );
  return filtered.length > 0 ? filtered : null;
}
