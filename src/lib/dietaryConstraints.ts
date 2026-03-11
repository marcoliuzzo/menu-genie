/**
 * Dietary Constraints Engine
 * Validates recipes and ingredients against user diet and allergy preferences.
 */

// ── Ingredient Classification ──

export type IngredientCategory =
  | "animal_protein"
  | "fish"
  | "seafood"
  | "dairy"
  | "eggs"
  | "vegetables"
  | "fruits"
  | "legumes"
  | "grains"
  | "low_carb"
  | "plant_protein"
  | "nuts"
  | "condiments"
  | "sweeteners"
  | "processed";

export interface ClassifiedIngredient {
  name: string;
  category: IngredientCategory;
  allergens: string[]; // e.g. ["glutine","lattosio"]
  isHighCarb?: boolean;
}

// Comprehensive ingredient database with Italian names
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

  // Grains (high carb)
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

  // Soy
  { name: "soia", category: "plant_protein", allergens: ["soia"] },
  { name: "latte di soia", category: "plant_protein", allergens: ["soia"] },
];

// ── Diet Rules ──

export type DietType = "onnivoro" | "vegetariano" | "vegano" | "pescetariano" | "flexitariano" | "keto" | "mediterraneo" | "";

interface DietRule {
  forbiddenCategories: IngredientCategory[];
  forbiddenKeywords: string[];
  restrictedCategories?: IngredientCategory[]; // for keto: limit but not fully ban
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
      "zucchero", "miele", "marmellata",
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
  ],
  lattosio: [
    "latte", "burro", "parmigiano", "mozzarella", "ricotta", "gorgonzola", "pecorino",
    "formaggio", "formaggi", "yogurt", "panna", "mascarpone", "stracchino", "burrata",
    "scamorza", "provolone", "taleggio", "fontina", "crescenza", "pesto",
  ],
  uova: ["uova", "uovo", "frittata", "omelette"],
  "frutta a guscio": [
    "noci", "mandorle", "nocciole", "pistacchi", "pinoli", "anacardi", "frutta secca", "pesto",
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

// ── Validation Engine ──

/**
 * Checks if a recipe name contains forbidden ingredients for a diet + allergy combo.
 * Returns { valid, violations[] }
 */
export function validateRecipeName(
  recipeName: string,
  dietType: string,
  allergies: string[]
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  const lowerName = recipeName.toLowerCase();

  // Check diet rules
  const rules = dietRules[dietType.toLowerCase()] || dietRules.onnivoro;
  for (const keyword of rules.forbiddenKeywords) {
    if (lowerName.includes(keyword.toLowerCase())) {
      violations.push(`"${keyword}" non è compatibile con dieta ${dietType}`);
    }
  }

  // Check allergies
  for (const allergy of allergies) {
    const allergyLower = allergy.toLowerCase();
    const keywords = allergyKeywords[allergyLower];
    if (keywords) {
      for (const keyword of keywords) {
        if (lowerName.includes(keyword.toLowerCase())) {
          violations.push(`"${keyword}" contiene allergene: ${allergy}`);
        }
      }
    }
  }

  return { valid: violations.length === 0, violations };
}

/**
 * Validates a full ingredient list
 */
export function validateIngredients(
  ingredients: string[],
  dietType: string,
  allergies: string[]
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  const rules = dietRules[dietType.toLowerCase()] || dietRules.onnivoro;

  for (const ingredient of ingredients) {
    const lower = ingredient.toLowerCase();

    // Diet check
    for (const keyword of rules.forbiddenKeywords) {
      if (lower.includes(keyword.toLowerCase())) {
        violations.push(`Ingrediente "${ingredient}" non compatibile con dieta ${dietType}`);
      }
    }

    // Allergy check
    for (const allergy of allergies) {
      const allergyLower = allergy.toLowerCase();
      const keywords = allergyKeywords[allergyLower];
      if (keywords) {
        for (const keyword of keywords) {
          if (lower.includes(keyword.toLowerCase())) {
            violations.push(`Ingrediente "${ingredient}" contiene allergene: ${allergy}`);
          }
        }
      }
    }
  }

  return { valid: violations.length === 0, violations };
}

/**
 * Validates a complete meal plan
 */
export function validateMealPlan(
  weeklyMenu: Array<{ day: string; lunch: { name: string }; dinner: { name: string } }>,
  dietType: string,
  allergies: string[]
): { valid: boolean; violations: Array<{ day: string; meal: string; issues: string[] }> } {
  const violations: Array<{ day: string; meal: string; issues: string[] }> = [];

  for (const day of weeklyMenu) {
    const lunchCheck = validateRecipeName(day.lunch.name, dietType, allergies);
    if (!lunchCheck.valid) {
      violations.push({ day: day.day, meal: day.lunch.name, issues: lunchCheck.violations });
    }

    const dinnerCheck = validateRecipeName(day.dinner.name, dietType, allergies);
    if (!dinnerCheck.valid) {
      violations.push({ day: day.day, meal: day.dinner.name, issues: dinnerCheck.violations });
    }
  }

  return { valid: violations.length === 0, violations };
}

// ── AI Prompt Builder ──

/**
 * Generates strict dietary constraint instructions for AI prompts
 */
export function buildDietaryPromptConstraints(
  dietType: string,
  allergies: string[]
): string {
  const rules = dietRules[dietType.toLowerCase()];
  if (!rules) return "";

  let prompt = "";

  // Diet constraints
  if (rules.forbiddenKeywords.length > 0) {
    prompt += `\n\nVINCOLI DIETETICI OBBLIGATORI (dieta: ${dietType}):`;
    prompt += `\n- VIETATO usare questi ingredienti: ${rules.forbiddenKeywords.join(", ")}`;
    prompt += `\n- ${rules.description}`;
  }

  if (rules.preferredCategories && rules.preferredCategories.length > 0) {
    const categoryLabels: Record<string, string> = {
      vegetables: "verdure",
      fruits: "frutta",
      legumes: "legumi",
      grains: "cereali",
      fish: "pesce",
      dairy: "latticini",
      eggs: "uova",
      plant_protein: "proteine vegetali (tofu, tempeh, seitan)",
      nuts: "frutta secca",
      animal_protein: "carne",
      condiments: "condimenti",
      low_carb: "verdure low-carb",
    };
    const preferred = rules.preferredCategories.map(c => categoryLabels[c] || c).join(", ");
    prompt += `\n- PRIVILEGIA questi ingredienti: ${preferred}`;
  }

  if (dietType.toLowerCase() === "keto") {
    prompt += `\n- Le ricette DEVONO essere low-carb (< 20g carbs per porzione)`;
    prompt += `\n- VIETATO: pasta, riso, pane, patate, pizza, cereali, zuccheri`;
    prompt += `\n- CONSIGLIATO: avocado, uova, carne, pesce, formaggi, olio, burro, verdure low-carb (zucchine, spinaci, broccoli, cavolfiore)`;
  }

  if (dietType.toLowerCase() === "mediterraneo") {
    prompt += `\n- Le ricette DEVONO seguire la dieta mediterranea tradizionale`;
    prompt += `\n- PRIVILEGIA: verdure, frutta, legumi, pesce, olio extravergine di oliva, cereali integrali, frutta secca`;
    prompt += `\n- LIMITA: carni rosse, cibi ultra-processati, zuccheri raffinati`;
  }

  // Allergy constraints
  if (allergies.length > 0) {
    prompt += `\n\nALLERGIE/INTOLLERANZE DELL'UTENTE:`;
    for (const allergy of allergies) {
      const keywords = allergyKeywords[allergy.toLowerCase()];
      if (keywords) {
        prompt += `\n- ALLERGIA ${allergy.toUpperCase()}: VIETATO usare ${keywords.join(", ")}`;
      }
    }
    prompt += `\n- NON includere MAI ingredienti che contengono questi allergeni, nemmeno come ingredienti secondari.`;
  }

  // Combined check for vegetariano + lattosio
  if (dietType.toLowerCase() === "vegetariano" && allergies.some(a => a.toLowerCase() === "lattosio")) {
    prompt += `\n\nATTENZIONE SPECIALE: L'utente è vegetariano CON intolleranza al lattosio.`;
    prompt += `\n- VIETATO: carne, pesce, E ANCHE tutti i latticini (formaggi, latte, burro, panna, yogurt, pesto tradizionale)`;
    prompt += `\n- USA alternative vegetali: latte vegetale, burro vegetale, pesto senza parmigiano`;
  }

  if (dietType.toLowerCase() === "vegano") {
    prompt += `\n\nATTENZIONE: Dieta VEGANA significa ZERO ingredienti animali.`;
    prompt += `\n- ZERO carne, pesce, latticini, uova, miele`;
    prompt += `\n- USA SOLO: verdure, frutta, legumi, cereali, tofu, tempeh, seitan, frutta secca, latte vegetale`;
  }

  prompt += `\n\nOGNI ricetta generata DEVE rispettare TUTTI i vincoli sopra. Se non puoi rispettare un vincolo, NON generare quella ricetta.`;

  return prompt;
}

// ── Diet-Aware Mock Menu Generator ──

interface MockMeal {
  pranzo: string;
  cena: string;
  tempo: string;
  cal: string;
  calNum: number;
  protein: number;
  carbs: number;
  fat: number;
}

const veganMeals: MockMeal[] = [
  { pranzo: "Bowl di quinoa con ceci e avocado", cena: "Curry di lenticchie con riso basmati", tempo: "25 min", cal: "1380 kcal", calNum: 1380, protein: 48, carbs: 195, fat: 42 },
  { pranzo: "Insalata di farro e verdure grigliate", cena: "Vellutata di zucca con crostini", tempo: "20 min", cal: "1320 kcal", calNum: 1320, protein: 40, carbs: 200, fat: 38 },
  { pranzo: "Pasta al pomodoro fresco e basilico", cena: "Zuppa di legumi misti", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 45, carbs: 190, fat: 40 },
  { pranzo: "Couscous con verdure e hummus", cena: "Tofu saltato con broccoli e sesamo", tempo: "20 min", cal: "1400 kcal", calNum: 1400, protein: 52, carbs: 175, fat: 48 },
  { pranzo: "Riso integrale con fagioli neri", cena: "Melanzane alla parmigiana vegana", tempo: "25 min", cal: "1360 kcal", calNum: 1360, protein: 42, carbs: 198, fat: 39 },
  { pranzo: "Wrap di verdure con hummus", cena: "Minestrone con legumi e verdure", tempo: "15 min", cal: "1300 kcal", calNum: 1300, protein: 38, carbs: 188, fat: 36 },
  { pranzo: "Polpette di ceci con insalata", cena: "Pasta e fagioli", tempo: "25 min", cal: "1420 kcal", calNum: 1420, protein: 50, carbs: 195, fat: 44 },
];

const vegetarianMeals: MockMeal[] = [
  { pranzo: "Risotto alle zucchine e menta", cena: "Frittata di verdure al forno", tempo: "25 min", cal: "1420 kcal", calNum: 1420, protein: 52, carbs: 185, fat: 50 },
  { pranzo: "Pasta al pesto di basilico", cena: "Insalata caprese con pane integrale", tempo: "20 min", cal: "1380 kcal", calNum: 1380, protein: 48, carbs: 178, fat: 52 },
  { pranzo: "Gnocchi al pomodoro", cena: "Vellutata di carote e zenzero", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 42, carbs: 195, fat: 40 },
  { pranzo: "Penne integrali con broccoli", cena: "Pizza margherita fatta in casa", tempo: "30 min", cal: "1500 kcal", calNum: 1500, protein: 55, carbs: 200, fat: 48 },
  { pranzo: "Insalata di farro con verdure", cena: "Lasagna vegetariana", tempo: "40 min", cal: "1550 kcal", calNum: 1550, protein: 58, carbs: 198, fat: 55 },
  { pranzo: "Bowl di riso e ceci", cena: "Omelette con verdure di stagione", tempo: "15 min", cal: "1320 kcal", calNum: 1320, protein: 50, carbs: 170, fat: 46 },
  { pranzo: "Bruschette con pomodoro e basilico", cena: "Zuppa di lenticchie", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 46, carbs: 188, fat: 42 },
];

const vegetarianLactoseFreeMeals: MockMeal[] = [
  { pranzo: "Pasta al pomodoro fresco e basilico", cena: "Zuppa di lenticchie con crostini", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 45, carbs: 195, fat: 38 },
  { pranzo: "Riso con verdure saltate", cena: "Frittata di verdure (senza latticini)", tempo: "20 min", cal: "1380 kcal", calNum: 1380, protein: 48, carbs: 180, fat: 44 },
  { pranzo: "Insalata di quinoa e ceci", cena: "Vellutata di zucca", tempo: "20 min", cal: "1320 kcal", calNum: 1320, protein: 42, carbs: 190, fat: 36 },
  { pranzo: "Couscous con verdure grigliate", cena: "Polpette di lenticchie", tempo: "25 min", cal: "1400 kcal", calNum: 1400, protein: 50, carbs: 192, fat: 42 },
  { pranzo: "Farro con pomodorini e olive", cena: "Minestrone ricco", tempo: "20 min", cal: "1300 kcal", calNum: 1300, protein: 40, carbs: 188, fat: 35 },
  { pranzo: "Pasta e fagioli", cena: "Verdure grigliate con hummus", tempo: "25 min", cal: "1360 kcal", calNum: 1360, protein: 44, carbs: 185, fat: 40 },
  { pranzo: "Wrap con hummus e verdure", cena: "Zuppa di ceci e spinaci", tempo: "15 min", cal: "1280 kcal", calNum: 1280, protein: 42, carbs: 178, fat: 38 },
];

const ketoMeals: MockMeal[] = [
  { pranzo: "Insalata di avocado e uova sode", cena: "Salmone al forno con broccoli", tempo: "25 min", cal: "1450 kcal", calNum: 1450, protein: 70, carbs: 18, fat: 110 },
  { pranzo: "Petto di pollo con spinaci e formaggio", cena: "Bistecca con verdure grigliate", tempo: "30 min", cal: "1520 kcal", calNum: 1520, protein: 85, carbs: 15, fat: 115 },
  { pranzo: "Omelette con zucchine e formaggio", cena: "Merluzzo al burro con cavolfiore", tempo: "20 min", cal: "1400 kcal", calNum: 1400, protein: 72, carbs: 16, fat: 105 },
  { pranzo: "Insalata greca con feta e olive", cena: "Pollo al forno con peperoni", tempo: "25 min", cal: "1380 kcal", calNum: 1380, protein: 68, carbs: 20, fat: 100 },
  { pranzo: "Uova strapazzate con avocado", cena: "Tacchino con funghi trifolati", tempo: "15 min", cal: "1350 kcal", calNum: 1350, protein: 65, carbs: 14, fat: 102 },
  { pranzo: "Carpaccio di zucchine con noci", cena: "Filetto di maiale con spinaci", tempo: "20 min", cal: "1420 kcal", calNum: 1420, protein: 75, carbs: 12, fat: 108 },
  { pranzo: "Insalata di tonno e avocado", cena: "Pollo alla griglia con insalata", tempo: "20 min", cal: "1480 kcal", calNum: 1480, protein: 80, carbs: 16, fat: 112 },
];

const mediterraneanMeals: MockMeal[] = [
  { pranzo: "Insalata mediterranea con feta e olive", cena: "Orata al forno con patate", tempo: "30 min", cal: "1420 kcal", calNum: 1420, protein: 62, carbs: 170, fat: 52 },
  { pranzo: "Pasta integrale al pomodoro e basilico", cena: "Branzino al vapore con verdure", tempo: "25 min", cal: "1380 kcal", calNum: 1380, protein: 58, carbs: 180, fat: 45 },
  { pranzo: "Farro con ceci e verdure grigliate", cena: "Zuppa di pesce alla marinara", tempo: "30 min", cal: "1450 kcal", calNum: 1450, protein: 65, carbs: 175, fat: 48 },
  { pranzo: "Bruschette con pomodorini e basilico", cena: "Sgombro alla griglia con insalata", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 60, carbs: 165, fat: 50 },
  { pranzo: "Insalata di farro e legumi", cena: "Salmone con verdure al forno", tempo: "25 min", cal: "1400 kcal", calNum: 1400, protein: 63, carbs: 172, fat: 48 },
  { pranzo: "Panzanella toscana", cena: "Merluzzo al cartoccio con olive", tempo: "20 min", cal: "1320 kcal", calNum: 1320, protein: 55, carbs: 168, fat: 44 },
  { pranzo: "Minestrone con pesto leggero", cena: "Sardine al forno con limone", tempo: "25 min", cal: "1360 kcal", calNum: 1360, protein: 58, carbs: 175, fat: 46 },
];

const defaultMeals: MockMeal[] = [
  { pranzo: "Bowl proteica con quinoa e pollo", cena: "Salmone al forno con broccoli", tempo: "25 min", cal: "1450 kcal", calNum: 1450, protein: 65, carbs: 180, fat: 52 },
  { pranzo: "Insalata di farro e verdure", cena: "Risotto ai funghi porcini", tempo: "30 min", cal: "1380 kcal", calNum: 1380, protein: 58, carbs: 175, fat: 48 },
  { pranzo: "Wrap integrale con hummus", cena: "Petto di pollo con spinaci", tempo: "20 min", cal: "1400 kcal", calNum: 1400, protein: 62, carbs: 170, fat: 50 },
  { pranzo: "Pasta al pesto di noci", cena: "Frittata di verdure", tempo: "20 min", cal: "1350 kcal", calNum: 1350, protein: 55, carbs: 185, fat: 46 },
  { pranzo: "Insalata di ceci e avocado", cena: "Merluzzo al vapore con limone", tempo: "20 min", cal: "1380 kcal", calNum: 1380, protein: 60, carbs: 168, fat: 50 },
  { pranzo: "Bruschette miste", cena: "Lasagna tradizionale", tempo: "40 min", cal: "1600 kcal", calNum: 1600, protein: 60, carbs: 200, fat: 58 },
  { pranzo: "Pizza fatta in casa", cena: "Zuppa di legumi", tempo: "35 min", cal: "1480 kcal", calNum: 1480, protein: 63, carbs: 185, fat: 51 },
];

const days = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

export function getDietAwareMenu(dietType: string, allergies: string[]) {
  const diet = dietType.toLowerCase();
  const hasLactoseAllergy = allergies.some(a => a.toLowerCase() === "lattosio");

  let meals: MockMeal[];

  if (diet === "vegano") {
    meals = veganMeals;
  } else if (diet === "vegetariano" && hasLactoseAllergy) {
    meals = vegetarianLactoseFreeMeals;
  } else if (diet === "vegetariano") {
    meals = vegetarianMeals;
  } else if (diet === "keto") {
    meals = ketoMeals;
  } else if (diet === "mediterraneo") {
    meals = mediterraneanMeals;
  } else {
    meals = defaultMeals;
  }

  // Final validation pass: filter out any meals with violations
  return days.map((day, i) => {
    const meal = meals[i % meals.length];
    const lunchCheck = validateRecipeName(meal.pranzo, dietType, allergies);
    const dinnerCheck = validateRecipeName(meal.cena, dietType, allergies);

    // If validation fails, try to find a safe alternative
    let safeMeal = { ...meal };
    if (!lunchCheck.valid) {
      const alt = meals.find(m => validateRecipeName(m.pranzo, dietType, allergies).valid);
      if (alt) safeMeal.pranzo = alt.pranzo;
    }
    if (!dinnerCheck.valid) {
      const alt = meals.find(m => validateRecipeName(m.cena, dietType, allergies).valid);
      if (alt) safeMeal.cena = alt.cena;
    }

    return { day, ...safeMeal };
  });
}

// ── Demo Mood Menus (diet-aware) ──

interface DemoMeal { day: string; pranzo: string; cena: string; tempo: string }

const demoMenusByDiet: Record<string, Record<string, DemoMeal[]>> = {
  vegano: {
    Relax: [
      { day: "Lunedì", pranzo: "Vellutata di zucca con crostini", cena: "Riso integrale con lenticchie", tempo: "25 min" },
      { day: "Martedì", pranzo: "Insalata tiepida di farro e verdure", cena: "Curry di ceci con riso basmati", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Pasta al pomodoro e basilico", cena: "Minestrone con legumi", tempo: "15 min" },
    ],
    Energia: [
      { day: "Lunedì", pranzo: "Bowl di quinoa con ceci e avocado", cena: "Tofu saltato con verdure e sesamo", tempo: "25 min" },
      { day: "Martedì", pranzo: "Wrap con hummus e verdure grigliate", cena: "Polpette di lenticchie con insalata", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Couscous con verdure e ceci", cena: "Stir-fry di tempeh con broccoli", tempo: "20 min" },
    ],
    Focus: [
      { day: "Lunedì", pranzo: "Pasta integrale con broccoli e pinoli", cena: "Zuppa di legumi misti", tempo: "20 min" },
      { day: "Martedì", pranzo: "Insalata di ceci e avocado", cena: "Riso con verdure e tofu", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Farro con pomodorini e olive", cena: "Vellutata di carote e zenzero", tempo: "15 min" },
    ],
    Romantico: [
      { day: "Lunedì", pranzo: "Carpaccio di zucchine con menta", cena: "Risotto agli asparagi", tempo: "25 min" },
      { day: "Martedì", pranzo: "Tartare di pomodori con avocado", cena: "Pasta con crema di zucca", tempo: "30 min" },
      { day: "Mercoledì", pranzo: "Insalata esotica con mango", cena: "Funghi ripieni con noci", tempo: "25 min" },
    ],
    Conviviale: [
      { day: "Lunedì", pranzo: "Bruschette con pomodoro e basilico", cena: "Pasta e fagioli", tempo: "30 min" },
      { day: "Martedì", pranzo: "Focaccia con verdure grigliate", cena: "Polenta con funghi trifolati", tempo: "35 min" },
      { day: "Mercoledì", pranzo: "Polpette di ceci al sugo", cena: "Minestrone della tradizione", tempo: "30 min" },
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
    Focus: [
      { day: "Lunedì", pranzo: "Pasta integrale al pesto di noci", cena: "Omelette con verdure di stagione", tempo: "20 min" },
      { day: "Martedì", pranzo: "Insalata di ceci e avocado", cena: "Risotto ai funghi porcini", tempo: "25 min" },
      { day: "Mercoledì", pranzo: "Riso con lenticchie e verdure", cena: "Frittata di zucchine", tempo: "20 min" },
    ],
    Romantico: [
      { day: "Lunedì", pranzo: "Carpaccio di zucchine con menta", cena: "Tagliatelle ai funghi porcini", tempo: "25 min" },
      { day: "Martedì", pranzo: "Insalata caprese con burrata", cena: "Risotto allo zafferano", tempo: "30 min" },
      { day: "Mercoledì", pranzo: "Bruschette con ricotta e miele", cena: "Gnocchi al gorgonzola e noci", tempo: "25 min" },
    ],
    Conviviale: [
      { day: "Lunedì", pranzo: "Bruschette miste", cena: "Lasagna vegetariana", tempo: "40 min" },
      { day: "Martedì", pranzo: "Pizza fatta in casa", cena: "Parmigiana di melanzane", tempo: "35 min" },
      { day: "Mercoledì", pranzo: "Piadine con verdure e formaggi", cena: "Polpette di melanzane al sugo", tempo: "30 min" },
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
    Focus: [
      { day: "Lunedì", pranzo: "Insalata greca con feta", cena: "Petto di pollo con spinaci", tempo: "20 min" },
      { day: "Martedì", pranzo: "Uova sode con avocado", cena: "Tacchino con funghi trifolati", tempo: "20 min" },
      { day: "Mercoledì", pranzo: "Carpaccio di manzo con rucola", cena: "Orata al forno con verdure", tempo: "25 min" },
    ],
    Romantico: [
      { day: "Lunedì", pranzo: "Carpaccio di salmone", cena: "Filetto con riduzione al vino rosso", tempo: "30 min" },
      { day: "Martedì", pranzo: "Insalata di gamberi e avocado", cena: "Orata al sale con verdure", tempo: "35 min" },
      { day: "Mercoledì", pranzo: "Tartare di tonno fresco", cena: "Bistecca con funghi porcini", tempo: "30 min" },
    ],
    Conviviale: [
      { day: "Lunedì", pranzo: "Antipasto misto con formaggi", cena: "Grigliata mista con verdure", tempo: "35 min" },
      { day: "Martedì", pranzo: "Insalatona ricca con uova e avocado", cena: "Pollo arrosto con contorno", tempo: "40 min" },
      { day: "Mercoledì", pranzo: "Tagliere di salumi e formaggi", cena: "Spiedini di carne con verdure", tempo: "30 min" },
    ],
  },
};

export function getDemoMenuForMoodAndDiet(
  mood: string,
  dietType: string,
  allergies: string[]
): DemoMeal[] | null {
  const diet = dietType.toLowerCase();

  // Check for specific diet menus
  const dietMenus = demoMenusByDiet[diet];
  if (dietMenus && dietMenus[mood]) {
    let menu = dietMenus[mood];
    // Final validation pass
    menu = menu.map(meal => {
      const lCheck = validateRecipeName(meal.pranzo, dietType, allergies);
      const dCheck = validateRecipeName(meal.cena, dietType, allergies);
      if (!lCheck.valid || !dCheck.valid) {
        // Find safe replacement from same diet
        const safeMeals = Object.values(dietMenus).flat();
        const safeLunch = safeMeals.find(m => validateRecipeName(m.pranzo, dietType, allergies).valid);
        const safeDinner = safeMeals.find(m => validateRecipeName(m.cena, dietType, allergies).valid);
        return {
          ...meal,
          pranzo: !lCheck.valid && safeLunch ? safeLunch.pranzo : meal.pranzo,
          cena: !dCheck.valid && safeDinner ? safeDinner.cena : meal.cena,
        };
      }
      return meal;
    });
    return menu;
  }

  // Fallback: return null and let the caller use the default
  return null;
}
