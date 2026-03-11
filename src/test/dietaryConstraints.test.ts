import { describe, it, expect } from "vitest";
import {
  validateRecipeName,
  validateIngredients,
  validateMealPlan,
  getDietAwareMenu,
  getDemoMenuForMoodAndDiet,
} from "@/lib/dietaryConstraints";

describe("Dietary Constraints Engine", () => {
  // ── Test 1: Vegan ──
  describe("Vegan diet", () => {
    const diet = "vegano";
    const allergies: string[] = [];

    it("should reject recipes with animal protein", () => {
      expect(validateRecipeName("Petto di pollo con spinaci", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Bistecca alla griglia", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Salmone al forno", diet, allergies).valid).toBe(false);
    });

    it("should reject recipes with dairy", () => {
      expect(validateRecipeName("Risotto al parmigiano", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Insalata con mozzarella", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Pasta al burro", diet, allergies).valid).toBe(false);
    });

    it("should reject recipes with eggs", () => {
      expect(validateRecipeName("Frittata di verdure", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Omelette con spinaci", diet, allergies).valid).toBe(false);
    });

    it("should reject recipes with honey", () => {
      expect(validateRecipeName("Insalata con miele e noci", diet, allergies).valid).toBe(false);
    });

    it("should accept valid vegan recipes", () => {
      expect(validateRecipeName("Pasta al pomodoro e basilico", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Curry di lenticchie con riso basmati", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Tofu saltato con broccoli", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Zuppa di legumi misti", diet, allergies).valid).toBe(true);
    });

    it("should generate a fully valid weekly menu", () => {
      const menu = getDietAwareMenu(diet, allergies);
      expect(menu).toHaveLength(7);
      for (const day of menu) {
        const lunchCheck = validateRecipeName(day.pranzo, diet, allergies);
        const dinnerCheck = validateRecipeName(day.cena, diet, allergies);
        expect(lunchCheck.valid).toBe(true);
        expect(dinnerCheck.valid).toBe(true);
      }
    });
  });

  // ── Test 2: Vegetarian + Lactose intolerance ──
  describe("Vegetarian + Lactose intolerance", () => {
    const diet = "vegetariano";
    const allergies = ["Lattosio"];

    it("should reject recipes with meat", () => {
      expect(validateRecipeName("Pollo alla griglia", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Salmone al forno", diet, allergies).valid).toBe(false);
    });

    it("should reject recipes with dairy (lactose)", () => {
      expect(validateRecipeName("Risotto al parmigiano", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Insalata caprese con burrata", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Pasta al pesto", diet, allergies).valid).toBe(false); // pesto contains parmigiano
      expect(validateRecipeName("Gnocchi al gorgonzola", diet, allergies).valid).toBe(false);
    });

    it("should accept valid vegetarian lactose-free recipes", () => {
      expect(validateRecipeName("Pasta al pomodoro fresco", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Zuppa di lenticchie", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Riso con verdure saltate", diet, allergies).valid).toBe(true);
    });

    it("should generate a fully valid weekly menu", () => {
      const menu = getDietAwareMenu(diet, allergies);
      expect(menu).toHaveLength(7);
      for (const day of menu) {
        const lunchCheck = validateRecipeName(day.pranzo, diet, allergies);
        const dinnerCheck = validateRecipeName(day.cena, diet, allergies);
        expect(lunchCheck.valid).toBe(true);
        expect(dinnerCheck.valid).toBe(true);
      }
    });
  });

  // ── Test 3: Keto ──
  describe("Keto diet", () => {
    const diet = "keto";
    const allergies: string[] = [];

    it("should reject high-carb recipes", () => {
      expect(validateRecipeName("Pasta al pomodoro", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Risotto ai funghi", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Pizza fatta in casa", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Gnocchi al pesto", diet, allergies).valid).toBe(false);
      expect(validateRecipeName("Bruschette miste", diet, allergies).valid).toBe(false);
    });

    it("should accept valid keto recipes", () => {
      expect(validateRecipeName("Insalata di avocado e uova sode", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Salmone al forno con broccoli", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Bistecca con verdure grigliate", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Omelette con zucchine e formaggio", diet, allergies).valid).toBe(true);
    });

    it("should generate a fully valid weekly menu", () => {
      const menu = getDietAwareMenu(diet, allergies);
      expect(menu).toHaveLength(7);
      for (const day of menu) {
        const lunchCheck = validateRecipeName(day.pranzo, diet, allergies);
        const dinnerCheck = validateRecipeName(day.cena, diet, allergies);
        expect(lunchCheck.valid).toBe(true);
        expect(dinnerCheck.valid).toBe(true);
      }
    });
  });

  // ── Test 4: Mediterranean ──
  describe("Mediterranean diet", () => {
    const diet = "mediterraneo";
    const allergies: string[] = [];

    it("should accept mediterranean recipes", () => {
      expect(validateRecipeName("Orata al forno con patate", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Insalata mediterranea", diet, allergies).valid).toBe(true);
      expect(validateRecipeName("Pasta integrale al pomodoro", diet, allergies).valid).toBe(true);
    });

    it("should generate a fully valid weekly menu", () => {
      const menu = getDietAwareMenu(diet, allergies);
      expect(menu).toHaveLength(7);
      for (const day of menu) {
        const lunchCheck = validateRecipeName(day.pranzo, diet, allergies);
        const dinnerCheck = validateRecipeName(day.cena, diet, allergies);
        expect(lunchCheck.valid).toBe(true);
        expect(dinnerCheck.valid).toBe(true);
      }
    });
  });

  // ── Test 5: Allergy-only tests ──
  describe("Allergy filters", () => {
    it("should reject gluten for gluten allergy", () => {
      expect(validateRecipeName("Pasta al pomodoro", "onnivoro", ["Glutine"]).valid).toBe(false);
      expect(validateRecipeName("Pizza margherita", "onnivoro", ["Glutine"]).valid).toBe(false);
    });

    it("should reject nuts for nut allergy", () => {
      expect(validateRecipeName("Pasta al pesto di noci", "onnivoro", ["Frutta a guscio"]).valid).toBe(false);
    });

    it("should reject seafood for crustacean allergy", () => {
      expect(validateRecipeName("Insalata di gamberi", "onnivoro", ["Crostacei"]).valid).toBe(false);
    });
  });

  // ── Test 6: Ingredient validation ──
  describe("Ingredient validation", () => {
    it("should validate ingredient lists for vegan", () => {
      const result = validateIngredients(
        ["pomodori", "basilico", "olio", "aglio"],
        "vegano",
        []
      );
      expect(result.valid).toBe(true);
    });

    it("should reject dairy ingredients for vegan", () => {
      const result = validateIngredients(
        ["pomodori", "mozzarella", "basilico"],
        "vegano",
        []
      );
      expect(result.valid).toBe(false);
      expect(result.violations.length).toBeGreaterThan(0);
    });
  });

  // ── Test 7: Demo mood menus ──
  describe("Demo mood menus", () => {
    it("should return vegan menus for vegan diet", () => {
      const menu = getDemoMenuForMoodAndDiet("Relax", "vegano", []);
      expect(menu).not.toBeNull();
      if (menu) {
        for (const m of menu) {
          expect(validateRecipeName(m.pranzo, "vegano", []).valid).toBe(true);
          expect(validateRecipeName(m.cena, "vegano", []).valid).toBe(true);
        }
      }
    });

    it("should return keto menus for keto diet", () => {
      const menu = getDemoMenuForMoodAndDiet("Energia", "keto", []);
      expect(menu).not.toBeNull();
      if (menu) {
        for (const m of menu) {
          expect(validateRecipeName(m.pranzo, "keto", []).valid).toBe(true);
          expect(validateRecipeName(m.cena, "keto", []).valid).toBe(true);
        }
      }
    });
  });

  // ── Test 8: Meal plan validation ──
  describe("Meal plan validation", () => {
    it("should validate a correct vegan meal plan", () => {
      const result = validateMealPlan(
        [
          { day: "Lunedì", lunch: { name: "Pasta al pomodoro" }, dinner: { name: "Zuppa di legumi" } },
          { day: "Martedì", lunch: { name: "Riso con verdure" }, dinner: { name: "Curry di lenticchie" } },
        ],
        "vegano",
        []
      );
      expect(result.valid).toBe(true);
    });

    it("should reject a vegan plan with chicken", () => {
      const result = validateMealPlan(
        [
          { day: "Lunedì", lunch: { name: "Pollo alla griglia" }, dinner: { name: "Zuppa di legumi" } },
        ],
        "vegano",
        []
      );
      expect(result.valid).toBe(false);
      expect(result.violations[0].meal).toBe("Pollo alla griglia");
    });
  });
});
