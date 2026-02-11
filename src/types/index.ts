export interface UserProfile {
  diet: string;
  allergies: string[];
  goals: string[];
  budget: number;
  cookingTime: string;
  pantry: string[];
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
