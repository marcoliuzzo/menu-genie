import { DayMenu, GroceryItem, MealPlanResult } from "@/types";

export const weeklyMenu: DayMenu[] = [
  {
    day: "Lunedì",
    lunch: { name: "Pasta al pomodoro fresco e basilico", prepTime: 20, difficulty: "facile" },
    dinner: { name: "Insalata di quinoa con verdure grigliate", prepTime: 25, difficulty: "facile" },
  },
  {
    day: "Martedì",
    lunch: { name: "Risotto alle zucchine", prepTime: 30, difficulty: "media" },
    dinner: { name: "Vellutata di carote e zenzero", prepTime: 25, difficulty: "facile" },
  },
  {
    day: "Mercoledì",
    lunch: { name: "Bowl di riso, ceci e avocado", prepTime: 20, difficulty: "facile" },
    dinner: { name: "Frittata di verdure al forno", prepTime: 30, difficulty: "facile" },
  },
  {
    day: "Giovedì",
    lunch: { name: "Penne integrali con broccoli e noci", prepTime: 20, difficulty: "facile" },
    dinner: { name: "Minestrone con legumi misti", prepTime: 35, difficulty: "facile" },
  },
  {
    day: "Venerdì",
    lunch: { name: "Couscous con verdure e hummus", prepTime: 20, difficulty: "facile" },
    dinner: { name: "Pizza fatta in casa con verdure", prepTime: 45, difficulty: "media" },
  },
  {
    day: "Sabato",
    lunch: { name: "Lasagna vegetariana", prepTime: 50, difficulty: "media" },
    dinner: { name: "Bruschette miste e insalatona", prepTime: 15, difficulty: "facile" },
  },
  {
    day: "Domenica",
    lunch: { name: "Gnocchi al pesto di basilico", prepTime: 30, difficulty: "media" },
    dinner: { name: "Zuppa di lenticchie e crostini", prepTime: 30, difficulty: "facile" },
  },
];

export const groceryList: GroceryItem[] = [
  { name: "Pomodori", category: "Frutta e verdura", inPantry: false },
  { name: "Basilico fresco", category: "Frutta e verdura", inPantry: false },
  { name: "Zucchine", category: "Frutta e verdura", inPantry: false },
  { name: "Carote", category: "Frutta e verdura", inPantry: false },
  { name: "Broccoli", category: "Frutta e verdura", inPantry: false },
  { name: "Avocado", category: "Frutta e verdura", inPantry: false },
  { name: "Verdure miste", category: "Frutta e verdura", inPantry: false },
  { name: "Limoni", category: "Frutta e verdura", inPantry: false },
  { name: "Zenzero", category: "Frutta e verdura", inPantry: false },
  { name: "Pasta", category: "Dispensa", inPantry: true },
  { name: "Riso", category: "Dispensa", inPantry: true },
  { name: "Penne integrali", category: "Dispensa", inPantry: false },
  { name: "Quinoa", category: "Dispensa", inPantry: false },
  { name: "Couscous", category: "Dispensa", inPantry: false },
  { name: "Ceci", category: "Dispensa", inPantry: true },
  { name: "Lenticchie", category: "Dispensa", inPantry: false },
  { name: "Noci", category: "Dispensa", inPantry: false },
  { name: "Olio extravergine", category: "Dispensa", inPantry: true },
  { name: "Parmigiano", category: "Latticini", inPantry: false },
  { name: "Uova", category: "Latticini", inPantry: false },
  { name: "Mozzarella", category: "Latticini", inPantry: false },
  { name: "Pesto di basilico", category: "Condimenti", inPantry: false },
  { name: "Hummus", category: "Condimenti", inPantry: false },
  { name: "Gnocchi freschi", category: "Freschi", inPantry: false },
  { name: "Sfoglie per lasagna", category: "Freschi", inPantry: false },
  { name: "Pane per bruschette", category: "Panetteria", inPantry: false },
  { name: "Impasto per pizza", category: "Freschi", inPantry: false },
];

export const fallbackMealPlan: MealPlanResult = {
  moodAnalysis: "Il tuo mood suggerisce un bisogno di comfort e semplicità. Abbiamo scelto piatti rassicuranti, con sapori familiari e preparazioni semplici per accompagnarti in questa settimana.",
  weeklyMenu,
  groceryList,
  smartTips: [
    "🥘 Prepara il minestrone in quantità doppia giovedì: potrai congelare una porzione per la settimana prossima.",
    "🧅 Gli spinaci e le zucchine compaiono in più ricette: comprali in formato famiglia per risparmiare.",
    "⏱️ Domenica sera, taglia le verdure per lunedì e martedì — risparmierai 15 minuti a pasto.",
    "💡 Il pesto avanzato di domenica è perfetto per condire una pasta veloce durante la settimana.",
  ],
  estimatedCost: 52,
};

export const dietOptions = [
  { value: "onnivoro", label: "Onnivoro", description: "Mangio un po' di tutto" },
  { value: "vegetariano", label: "Vegetariano", description: "Niente carne né pesce" },
  { value: "vegano", label: "Vegano", description: "Solo alimenti vegetali" },
  { value: "pescetariano", label: "Pescetariano", description: "Niente carne, sì al pesce" },
  { value: "flexitariano", label: "Flexitariano", description: "Prevalentemente vegetale, con eccezioni" },
  { value: "keto", label: "Keto", description: "Pochi carboidrati, molti grassi sani" },
];

export const allergyOptions = [
  "Glutine", "Lattosio", "Frutta a guscio", "Uova", "Soia", "Crostacei", "Arachidi", "Sesamo",
];

export const goalOptions = [
  { value: "salute", label: "Mangiare più sano", icon: "Heart" },
  { value: "risparmio", label: "Risparmiare sulla spesa", icon: "PiggyBank" },
  { value: "sostenibilita", label: "Ridurre gli sprechi", icon: "Leaf" },
  { value: "tempo", label: "Cucinare più veloce", icon: "Clock" },
  { value: "performance", label: "Performance sportiva", icon: "Dumbbell" },
  { value: "dimagrimento", label: "Perdere peso", icon: "Scale" },
];

export const cookingTimeOptions = [
  { value: "15", label: "15 min", description: "Super veloce" },
  { value: "30", label: "30 min", description: "Tempo giusto" },
  { value: "45", label: "45 min", description: "Con calma" },
  { value: "60", label: "60+ min", description: "Amo cucinare" },
];

export const moodOptions = [
  { value: "energetico", label: "☀️ Energetico", description: "Giallo, Pop, Sole" },
  { value: "relax", label: "🌧️ Relax", description: "Grigio, Jazz, Pioggia" },
  { value: "avventuroso", label: "🌶️ Avventuroso", description: "Rosso, Rock, Spezie" },
  { value: "nostalgico", label: "🍂 Nostalgico", description: "Arancio, Classica, Casa" },
  { value: "leggero", label: "🌿 Leggero", description: "Verde, Lo-fi, Fresco" },
  { value: "festivo", label: "🎉 Festivo", description: "Colorato, Festa, Allegria" },
];

export const equipmentOptions = [
  { value: "fornelli", label: "Fornelli" },
  { value: "forno", label: "Forno" },
  { value: "microonde", label: "Microonde" },
  { value: "friggitrice-aria", label: "Friggitrice ad aria" },
  { value: "robot-cucina", label: "Robot da cucina" },
  { value: "pentola-pressione", label: "Pentola a pressione" },
];
