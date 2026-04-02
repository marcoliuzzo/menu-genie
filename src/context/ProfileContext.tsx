import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from "react";
import { UserProfile, MealPlanResult, PantryItem, ShoppingListItem, SupermarketComparison, FullDayMenu, WeekOptimization } from "@/types";
import { getDietAwareFullMenu, validateRecipeName } from "@/lib/dietaryConstraints";
import { generateShoppingList, comparePricesAcrossSupermarkets } from "@/lib/retailEngine";
import { estimateExpiry } from "@/lib/pantryEngine";

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  mealPlan: MealPlanResult | null;
  setMealPlan: (plan: MealPlanResult | null) => void;

  pantryItems: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, "id" | "estimatedExpiry" | "daysLeft">) => void;
  removePantryItem: (id: string) => void;

  // 21-meal weekly plan (colazione/pranzo/cena × 7)
  weekMenu: FullDayMenu[];
  weekOptimization: WeekOptimization;

  shoppingList: ShoppingListItem[];
  supermarketComparisons: SupermarketComparison[];

  // Reactive recompute
  recomputeSystem: () => void;
  systemVersion: number; // increments on each recompute
}

const defaultProfile: UserProfile = {
  diet: "",
  allergies: [],
  goals: [],
  weeklyBudget: 60,
  cookingTime: "30",
  pantry: [],
  energy: 7,
  mood: "",
  moodWeight: 0.5,
  equipment: ["fornelli"],
  cap: "",
  preferredSupermarkets: [],
  schisciaMode: false,
  dislikedIngredients: [],
};

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

const defaultPantry: PantryItem[] = [
  { id: "1", name: "Spinaci freschi", purchaseDate: daysAgo(2), quantity: "300g", category: "fresco", ...estimateExpiry(daysAgo(2), "fresco") },
  { id: "2", name: "Yogurt greco", purchaseDate: daysAgo(4), quantity: "2 vasetti", category: "fresco", ...estimateExpiry(daysAgo(4), "fresco") },
  { id: "3", name: "Pasta integrale", purchaseDate: daysAgo(30), quantity: "500g", category: "confezionato", ...estimateExpiry(daysAgo(30), "confezionato") },
  { id: "4", name: "Petto di pollo", purchaseDate: daysAgo(10), quantity: "400g", category: "congelato", ...estimateExpiry(daysAgo(10), "congelato") },
  { id: "5", name: "Mozzarella", purchaseDate: daysAgo(3), quantity: "125g", category: "fresco", ...estimateExpiry(daysAgo(3), "fresco") },
  { id: "6", name: "Olio extravergine", purchaseDate: daysAgo(60), quantity: "750ml", category: "confezionato", ...estimateExpiry(daysAgo(60), "confezionato") },
  { id: "7", name: "Riso arborio", purchaseDate: daysAgo(15), quantity: "1kg", category: "confezionato", ...estimateExpiry(daysAgo(15), "confezionato") },
];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [mealPlan, setMealPlan] = useState<MealPlanResult | null>(null);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(defaultPantry);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [supermarketComparisons, setSupermarketComparisons] = useState<SupermarketComparison[]>([]);
  const [systemVersion, setSystemVersion] = useState(0);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const addPantryItem = useCallback((item: Omit<PantryItem, "id" | "estimatedExpiry" | "daysLeft">) => {
    const { estimatedExpiry: expiry, daysLeft } = estimateExpiry(item.purchaseDate, item.category);
    const newItem: PantryItem = {
      ...item,
      id: Date.now().toString(),
      estimatedExpiry: expiry,
      daysLeft,
    };
    setPantryItems((prev) => [...prev, newItem]);
  }, []);

  const removePantryItem = useCallback((id: string) => {
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // ── Compute 21-meal plan ──
  const pantryNames = useMemo(() => pantryItems.map(p => p.name.toLowerCase()), [pantryItems]);
  const dislikedNames = useMemo(() => profile.dislikedIngredients || [], [profile.dislikedIngredients]);

  const weekMenu = useMemo(() => {
    return getDietAwareFullMenu(
      profile.diet || "onnivoro",
      profile.allergies || [],
      profile.mood || "Relax",
      profile.moodWeight,
      parseInt(profile.cookingTime) || 30,
      pantryNames,
      dislikedNames
    );
  }, [profile.diet, profile.allergies, profile.mood, profile.moodWeight, profile.cookingTime, pantryNames, dislikedNames, systemVersion]);

  // ── Compute optimization stats ──
  const weekOptimization = useMemo((): WeekOptimization => {
    const allMealNames = weekMenu.flatMap(d => [d.colazione, d.pranzo, d.cena]);
    
    // Count ingredient reuse across meals
    const ingredientMealMap: Record<string, string[]> = {};
    const commonIngredients = [
      "pomodoro", "spinaci", "zucchine", "broccoli", "uova", "riso", "pasta",
      "pollo", "salmone", "avocado", "ceci", "lenticchie", "quinoa", "farro",
      "mozzarella", "parmigiano", "olio", "carote", "funghi", "tofu"
    ];
    
    for (const meal of allMealNames) {
      const lower = meal.toLowerCase();
      for (const ing of commonIngredients) {
        if (lower.includes(ing)) {
          if (!ingredientMealMap[ing]) ingredientMealMap[ing] = [];
          ingredientMealMap[ing].push(meal);
        }
      }
    }

    const reusedIngredients = Object.entries(ingredientMealMap)
      .filter(([, meals]) => meals.length >= 2)
      .map(([name, meals]) => ({ name, meals }));

    const pantryUsed = pantryNames.filter(p =>
      allMealNames.some(m => m.toLowerCase().includes(p.split(" ")[0].toLowerCase()))
    );

    // Rough cost estimate based on meal count
    const mealCost = profile.diet === "keto" ? 3.5 : profile.diet === "vegano" ? 2.2 : 2.8;
    const estimatedWeeklyCost = Math.round(allMealNames.length * mealCost);

    return {
      reusedIngredients,
      pantryUsed,
      estimatedWeeklyCost,
      budgetRespected: estimatedWeeklyCost <= profile.weeklyBudget,
      totalMeals: 21,
    };
  }, [weekMenu, pantryNames, profile.weeklyBudget, profile.diet]);

  // ── Compute shopping list & price comparisons ──
  const recomputeSystem = useCallback(() => {
    const allMeals = weekMenu.flatMap(d => [d.colazione, d.pranzo, d.cena]);
    const list = generateShoppingList(allMeals, pantryNames, profile.cap);
    setShoppingList(list);

    if (profile.cap) {
      const comparisons = comparePricesAcrossSupermarkets(list, profile.cap);
      setSupermarketComparisons(comparisons);
    }
    setSystemVersion(v => v + 1);
  }, [weekMenu, pantryNames, profile.cap]);

  // Auto-recompute on profile/pantry changes
  useEffect(() => {
    recomputeSystem();
  }, [profile.diet, profile.allergies, profile.cap, profile.weeklyBudget, profile.cookingTime, profile.mood, profile.moodWeight, profile.dislikedIngredients, pantryItems]);

  return (
    <ProfileContext.Provider value={{
      profile, updateProfile,
      mealPlan, setMealPlan,
      pantryItems, addPantryItem, removePantryItem,
      weekMenu, weekOptimization,
      shoppingList, supermarketComparisons,
      recomputeSystem, systemVersion,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
