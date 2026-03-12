/**
 * Pantry Engine
 * Manages pantry items, expiry estimation, and ingredient matching
 */

export function estimateExpiry(purchaseDate: string, category: "fresco" | "confezionato" | "congelato") {
  const date = new Date(purchaseDate);
  const daysToAdd = category === "fresco" ? 5 : category === "confezionato" ? 180 : 90;
  date.setDate(date.getDate() + daysToAdd);
  const now = new Date();
  const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { estimatedExpiry: date.toISOString().split("T")[0], daysLeft };
}

export function getStatusColor(daysLeft: number) {
  if (daysLeft <= 2) return "text-destructive bg-destructive/10 border-destructive/20";
  if (daysLeft <= 5) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-primary bg-primary/10 border-primary/20";
}

export function getStatusLabel(daysLeft: number) {
  if (daysLeft <= 0) return "Scaduto";
  if (daysLeft <= 2) return "Priorità utilizzo";
  if (daysLeft <= 5) return "Da consumare presto";
  return "Fresco";
}

/**
 * Check if an ingredient from a recipe is already in the pantry
 */
export function isInPantry(ingredient: string, pantryNames: string[]): boolean {
  const lower = ingredient.toLowerCase();
  return pantryNames.some(p => {
    const pLower = p.toLowerCase();
    return pLower.includes(lower) || lower.includes(pLower);
  });
}
