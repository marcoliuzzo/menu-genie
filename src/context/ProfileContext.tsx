import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { UserProfile, MealPlanResult, PantryItem, ShoppingListItem, SupermarketComparison } from "@/types";
import { getDietAwareMenu, validateRecipeName } from "@/lib/dietaryConstraints";
import { generateShoppingList, comparePricesAcrossSupermarkets } from "@/lib/retailEngine";
import { estimateExpiry } from "@/lib/pantryEngine";

interface ProfileContextType {
  // User profile (single source of truth)
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Meal plan
  mealPlan: MealPlanResult | null;
  setMealPlan: (plan: MealPlanResult | null) => void;

  // Pantry
  pantryItems: PantryItem[];
  addPantryItem: (item: Omit<PantryItem, "id" | "estimatedExpiry" | "daysLeft">) => void;
  removePantryItem: (id: string) => void;

  // Derived data (computed from engines)
  weekMenu: ReturnType<typeof getDietAwareMenu>;
  shoppingList: ShoppingListItem[];
  supermarketComparisons: SupermarketComparison[];
  refreshShoppingData: () => void;
}

const defaultProfile: UserProfile = {
  diet: "",
  allergies: [],
  goals: [],
  budget: 60,
  cookingTime: "30",
  pantry: [],
  energy: 7,
  mood: "",
  equipment: ["fornelli"],
  cap: "",
  preferredSupermarkets: [],
  schisciaMode: false,
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

  // Nutrition Engine: diet-aware menu
  const weekMenu = getDietAwareMenu(profile.diet || "onnivoro", profile.allergies || []);

  // Refresh shopping data from engines
  const refreshShoppingData = useCallback(() => {
    // Extract ingredients from weekMenu
    const allMeals = weekMenu.map(d => [d.pranzo, d.cena]).flat();
    const pantryNames = pantryItems.map(p => p.name.toLowerCase());
    
    const list = generateShoppingList(allMeals, pantryNames, profile.cap);
    setShoppingList(list);

    if (profile.cap) {
      const comparisons = comparePricesAcrossSupermarkets(list, profile.cap);
      setSupermarketComparisons(comparisons);
    }
  }, [weekMenu, pantryItems, profile.cap]);

  return (
    <ProfileContext.Provider value={{
      profile, updateProfile,
      mealPlan, setMealPlan,
      pantryItems, addPantryItem, removePantryItem,
      weekMenu, shoppingList, supermarketComparisons,
      refreshShoppingData,
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
