import { describe, it, expect } from "vitest";
import { validateRecipeName, getDietAwareFullMenu } from "@/lib/dietaryConstraints";

describe("Edge Case: Vegan + Gluten allergy pool filtering", () => {
  it("no gluten recipes appear in vegan+gluten plan", () => {
    const menu = getDietAwareFullMenu("vegano", ["Glutine"], "Relax", 0.5, 30, []);
    const violations: string[] = [];
    for (const day of menu) {
      for (const key of ["colazione", "pranzo", "cena"] as const) {
        const v = validateRecipeName(day[key], "vegano", ["Glutine"]);
        if (!v.valid) violations.push(`${day.day} ${key}: "${day[key]}" → ${v.violations.join(", ")}`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("no nut-allergen recipes in vegan+nuts plan", () => {
    const menu = getDietAwareFullMenu("vegano", ["Frutta a guscio"], "Relax", 0.5, 30, []);
    const violations: string[] = [];
    for (const day of menu) {
      for (const key of ["colazione", "pranzo", "cena"] as const) {
        const v = validateRecipeName(day[key], "vegano", ["Frutta a guscio"]);
        if (!v.valid) violations.push(`${day.day} ${key}: "${day[key]}" → ${v.violations.join(", ")}`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("keto+uova: no egg recipes", () => {
    const menu = getDietAwareFullMenu("keto", ["Uova"], "Relax", 0.5, 30, []);
    const violations: string[] = [];
    for (const day of menu) {
      for (const key of ["colazione", "pranzo", "cena"] as const) {
        const v = validateRecipeName(day[key], "keto", ["Uova"]);
        if (!v.valid) violations.push(`${day.day} ${key}: "${day[key]}" → ${v.violations.join(", ")}`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("vegetariano+lattosio+uova: no dairy or egg recipes", () => {
    const menu = getDietAwareFullMenu("vegetariano", ["Lattosio", "Uova"], "Relax", 0.5, 30, []);
    const violations: string[] = [];
    for (const day of menu) {
      for (const key of ["colazione", "pranzo", "cena"] as const) {
        const v = validateRecipeName(day[key], "vegetariano", ["Lattosio", "Uova"]);
        if (!v.valid) violations.push(`${day.day} ${key}: "${day[key]}" → ${v.violations.join(", ")}`);
      }
    }
    expect(violations).toEqual([]);
  });
});
