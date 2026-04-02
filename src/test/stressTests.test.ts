import { describe, it, expect } from "vitest";
import {
  validateRecipeName,
  getDietAwareFullMenu,
  getDietAwareMenu,
} from "@/lib/dietaryConstraints";

/**
 * Stress tests: extreme combinations of diet + allergies + dislikes
 */

// Helper: validate entire 21-meal plan
function assertPlanValid(
  diet: string,
  allergies: string[],
  dislikes: string[] = [],
  label: string = ""
) {
  const menu = getDietAwareFullMenu(diet, allergies, "Relax", 0.5, 30, [], dislikes);
  expect(menu).toHaveLength(7);

  const violations: string[] = [];
  for (const day of menu) {
    for (const mealKey of ["colazione", "pranzo", "cena"] as const) {
      const mealName = day[mealKey];
      expect(mealName).toBeTruthy();
      const check = validateRecipeName(mealName, diet, allergies);
      if (!check.valid) {
        violations.push(`${label} ${day.day} ${mealKey}: "${mealName}" → ${check.violations.join(", ")}`);
      }
    }
  }
  if (violations.length > 0) {
    throw new Error(`Plan violations:\n${violations.join("\n")}`);
  }
}

describe("Stress Test: Extreme Combinations", () => {
  // Case 1: vegano + glutine + evita tofu
  it("vegano + glutine allergy + dislike tofu", () => {
    assertPlanValid("vegano", ["Glutine"], ["tofu"], "Case1");
  });

  // Case 2: keto + lattosio + evita carne
  it("keto + lattosio allergy + dislike carne", () => {
    assertPlanValid("keto", ["Lattosio"], ["carne"], "Case2");
  });

  // Case 3: vegetariano + evita many vegetables
  it("vegetariano + dislike many vegetables", () => {
    assertPlanValid("vegetariano", [], ["zucchine", "melanzane", "spinaci", "broccoli", "funghi"], "Case3");
  });

  // Case 4: mediterraneo + multiple allergies + many dislikes
  it("mediterraneo + glutine + lattosio + frutta a guscio allergies", () => {
    assertPlanValid("mediterraneo", ["Glutine", "Lattosio", "Frutta a guscio"], ["funghi"], "Case4");
  });

  // Case 5: vegano + soia allergy (no tofu/tempeh)
  it("vegano + soia allergy", () => {
    assertPlanValid("vegano", ["Soia"], [], "Case5");
  });

  // Case 6: vegano + glutine + soia + frutta a guscio (very restrictive)
  it("vegano + glutine + soia + nuts allergies", () => {
    assertPlanValid("vegano", ["Glutine", "Soia", "Frutta a guscio"], [], "Case6");
  });

  // Case 7: keto + uova allergy
  it("keto + uova allergy", () => {
    assertPlanValid("keto", ["Uova"], [], "Case7");
  });

  // Case 8: onnivoro + all major allergies
  it("onnivoro + glutine + lattosio + uova", () => {
    assertPlanValid("onnivoro", ["Glutine", "Lattosio", "Uova"], [], "Case8");
  });

  // Case 9: vegetariano + lattosio + uova (very limiting)
  it("vegetariano + lattosio + uova allergies", () => {
    assertPlanValid("vegetariano", ["Lattosio", "Uova"], [], "Case9");
  });

  // Case 10: keto + pesce allergy + dislike pollo
  it("keto + pesce allergy + dislike pollo", () => {
    assertPlanValid("keto", ["Pesce"], ["pollo"], "Case10");
  });
});

describe("Stress Test: Breakfast Validation", () => {
  it("vegan breakfasts contain no animal products", () => {
    const menu = getDietAwareFullMenu("vegano", [], "Relax", 0.5, 30, []);
    for (const day of menu) {
      const check = validateRecipeName(day.colazione, "vegano", []);
      expect(check.valid).toBe(true);
    }
  });

  it("keto breakfasts contain no high-carb items", () => {
    const menu = getDietAwareFullMenu("keto", [], "Relax", 0.5, 30, []);
    for (const day of menu) {
      const check = validateRecipeName(day.colazione, "keto", []);
      expect(check.valid).toBe(true);
    }
  });

  it("vegetariano+lattosio breakfasts have no dairy", () => {
    const menu = getDietAwareFullMenu("vegetariano", ["Lattosio"], "Relax", 0.5, 30, []);
    for (const day of menu) {
      const check = validateRecipeName(day.colazione, "vegetariano", ["Lattosio"]);
      expect(check.valid).toBe(true);
    }
  });
});

describe("Stress Test: All Moods work with all diets", () => {
  const moods = ["Relax", "Energia", "Focus", "Romantico", "Conviviale"];
  const diets = ["vegano", "vegetariano", "keto", "mediterraneo", "onnivoro"];

  for (const diet of diets) {
    for (const mood of moods) {
      it(`${diet} + ${mood} generates valid plan`, () => {
        const menu = getDietAwareFullMenu(diet, [], mood, 0.8, 30, []);
        expect(menu).toHaveLength(7);
        for (const day of menu) {
          expect(validateRecipeName(day.pranzo, diet, []).valid).toBe(true);
          expect(validateRecipeName(day.cena, diet, []).valid).toBe(true);
        }
      });
    }
  }
});

describe("Stress Test: Explainable AI fields always present", () => {
  it("every meal has explain object with required fields", () => {
    const menu = getDietAwareFullMenu("vegano", ["Lattosio"], "Energia", 0.7, 25, ["spinaci"]);
    for (const day of menu) {
      expect(day.explain).toBeDefined();
      for (const key of ["colazione", "pranzo", "cena"] as const) {
        const e = day.explain[key];
        expect(e).toBeDefined();
        expect(typeof e.dietMatch).toBe("boolean");
        expect(Array.isArray(e.pantryIngredients)).toBe(true);
        expect(Array.isArray(e.reusedIngredients)).toBe(true);
        expect(typeof e.prepTime).toBe("number");
      }
    }
  });
});
