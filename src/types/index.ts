export interface UserProfile {
  diet: string;
  allergies: string[];
  goals: string[];
  budget: number;
  cookingTime: string;
  pantry: string[];
  energy: number;
  mood: string;
  equipment: string[];
  cap: string;
  preferredSupermarkets: string[];
  schisciaMode: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  purchaseDate: string;
  quantity: string;
  category: "fresco" | "confezionato" | "congelato";
  estimatedExpiry: string;
  daysLeft: number;
}

export interface Recipe {
  name: string;
  prepTime: number;
  difficulty: "facile" | "media" | "elaborata";
}

export interface DayMenu {
  day: string;
  lunch: Recipe;
  dinner: Recipe;
}

export interface GroceryItem {
  name: string;
  category: string;
  inPantry: boolean;
}

export interface MealPlanResult {
  moodAnalysis: string;
  weeklyMenu: DayMenu[];
  groceryList: GroceryItem[];
  smartTips: string[];
  estimatedCost: number;
}

// ── GDO Product Types ──

export interface GDOProduct {
  ingredient: string;
  product: string;
  brand: string;
  supermarket: string;
  price: number;
  pricePerUnit: string;
  category: string;
  onPromotion: boolean;
  promotionLabel?: string;
}

export interface IngredientProductMapping {
  ingredient: string;
  products: GDOProduct[];
}

export interface ShoppingListItem {
  ingredient: string;
  inPantry: boolean;
  neededQuantity: string;
  products: GDOProduct[];
  bestPrice: number;
  worstPrice: number;
}

export interface SupermarketComparison {
  supermarket: string;
  totalCost: number;
  itemCount: number;
  promotionCount: number;
  items: { ingredient: string; product: string; brand: string; price: number; onPromotion: boolean }[];
}
