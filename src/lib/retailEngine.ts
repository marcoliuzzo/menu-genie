/**
 * Retail Engine + Price Comparison Engine
 * Maps ingredients to real GDO products, manages supermarket data,
 * and compares prices across supermarkets using flyer promotions.
 */

import { GDOProduct, ShoppingListItem, SupermarketComparison } from "@/types";
import { isInPantry } from "./pantryEngine";
import { lookupCap } from "@/data/supermarketData";

// ── Real Italian GDO Product Database ──

export const gdoProducts: GDOProduct[] = [
  // PASTA
  { ingredient: "pasta", product: "Spaghetti n.5 500g", brand: "Barilla", supermarket: "Esselunga", price: 0.89, pricePerUnit: "€1.78/kg", category: "Secco", onPromotion: false },
  { ingredient: "pasta", product: "Spaghetti n.5 500g", brand: "Barilla", supermarket: "Coop", price: 0.95, pricePerUnit: "€1.90/kg", category: "Secco", onPromotion: false },
  { ingredient: "pasta", product: "Spaghetti n.5 500g", brand: "Barilla", supermarket: "Conad", price: 0.92, pricePerUnit: "€1.84/kg", category: "Secco", onPromotion: true, promotionLabel: "Volantino -15%" },
  { ingredient: "pasta", product: "Spaghetti n.5 500g", brand: "Barilla", supermarket: "Carrefour", price: 0.99, pricePerUnit: "€1.98/kg", category: "Secco", onPromotion: false },
  { ingredient: "pasta", product: "Spaghetti n.5 500g", brand: "Barilla", supermarket: "Lidl", price: 0.85, pricePerUnit: "€1.70/kg", category: "Secco", onPromotion: true, promotionLabel: "Offerta settimanale" },
  { ingredient: "pasta", product: "Spaghetti 500g", brand: "De Cecco", supermarket: "Esselunga", price: 1.19, pricePerUnit: "€2.38/kg", category: "Secco", onPromotion: false },
  { ingredient: "pasta", product: "Spaghetti 500g", brand: "De Cecco", supermarket: "Coop", price: 1.29, pricePerUnit: "€2.58/kg", category: "Secco", onPromotion: false },
  { ingredient: "pasta", product: "Penne rigate 500g", brand: "Barilla", supermarket: "Eurospin", price: 0.79, pricePerUnit: "€1.58/kg", category: "Secco", onPromotion: true, promotionLabel: "Prezzo basso sempre" },

  // PASSATA / POMODORO
  { ingredient: "pomodoro", product: "Passata di pomodoro 700g", brand: "Mutti", supermarket: "Esselunga", price: 1.49, pricePerUnit: "€2.13/kg", category: "Conserve", onPromotion: false },
  { ingredient: "pomodoro", product: "Passata di pomodoro 700g", brand: "Mutti", supermarket: "Coop", price: 1.59, pricePerUnit: "€2.27/kg", category: "Conserve", onPromotion: false },
  { ingredient: "pomodoro", product: "Passata di pomodoro 700g", brand: "Mutti", supermarket: "Conad", price: 1.39, pricePerUnit: "€1.99/kg", category: "Conserve", onPromotion: true, promotionLabel: "Volantino -20%" },
  { ingredient: "pomodoro", product: "Passata classica 680g", brand: "Cirio", supermarket: "Carrefour", price: 1.29, pricePerUnit: "€1.90/kg", category: "Conserve", onPromotion: false },
  { ingredient: "pomodoro", product: "Passata classica 680g", brand: "Cirio", supermarket: "Lidl", price: 1.09, pricePerUnit: "€1.60/kg", category: "Conserve", onPromotion: true, promotionLabel: "Super offerta" },
  { ingredient: "pomodoro", product: "Polpa di pomodoro 400g", brand: "Mutti", supermarket: "Eurospin", price: 0.89, pricePerUnit: "€2.23/kg", category: "Conserve", onPromotion: false },

  // TONNO
  { ingredient: "tonno", product: "Tonno all'olio d'oliva 3x80g", brand: "Rio Mare", supermarket: "Esselunga", price: 3.49, pricePerUnit: "€14.54/kg", category: "Conserve", onPromotion: false },
  { ingredient: "tonno", product: "Tonno all'olio d'oliva 3x80g", brand: "Rio Mare", supermarket: "Coop", price: 3.69, pricePerUnit: "€15.38/kg", category: "Conserve", onPromotion: false },
  { ingredient: "tonno", product: "Tonno all'olio d'oliva 3x80g", brand: "Rio Mare", supermarket: "Conad", price: 3.29, pricePerUnit: "€13.71/kg", category: "Conserve", onPromotion: true, promotionLabel: "Volantino -10%" },
  { ingredient: "tonno", product: "Tonno in olio 3x80g", brand: "Nostromo", supermarket: "Lidl", price: 2.79, pricePerUnit: "€11.63/kg", category: "Conserve", onPromotion: false },

  // LATTE
  { ingredient: "latte", product: "Latte fresco intero 1L", brand: "Granarolo", supermarket: "Esselunga", price: 1.59, pricePerUnit: "€1.59/L", category: "Latticini", onPromotion: false },
  { ingredient: "latte", product: "Latte fresco intero 1L", brand: "Granarolo", supermarket: "Coop", price: 1.65, pricePerUnit: "€1.65/L", category: "Latticini", onPromotion: false },
  { ingredient: "latte", product: "Latte fresco intero 1L", brand: "Granarolo", supermarket: "Conad", price: 1.55, pricePerUnit: "€1.55/L", category: "Latticini", onPromotion: true, promotionLabel: "2x€2.80" },

  // MOZZARELLA
  { ingredient: "mozzarella", product: "Mozzarella di bufala 125g", brand: "Santa Lucia", supermarket: "Esselunga", price: 1.99, pricePerUnit: "€15.92/kg", category: "Latticini", onPromotion: false },
  { ingredient: "mozzarella", product: "Mozzarella di bufala 125g", brand: "Santa Lucia", supermarket: "Coop", price: 2.09, pricePerUnit: "€16.72/kg", category: "Latticini", onPromotion: false },
  { ingredient: "mozzarella", product: "Mozzarella fior di latte 125g", brand: "Coop", supermarket: "Coop", price: 0.99, pricePerUnit: "€7.92/kg", category: "Latticini", onPromotion: true, promotionLabel: "Marca Coop" },
  { ingredient: "mozzarella", product: "Mozzarella di bufala 125g", brand: "Santa Lucia", supermarket: "Conad", price: 1.89, pricePerUnit: "€15.12/kg", category: "Latticini", onPromotion: true, promotionLabel: "Volantino" },

  // OLIO EVO
  { ingredient: "olio", product: "Olio EVO 100% italiano 750ml", brand: "Monini", supermarket: "Esselunga", price: 7.49, pricePerUnit: "€9.99/L", category: "Condimenti", onPromotion: false },
  { ingredient: "olio", product: "Olio EVO 100% italiano 750ml", brand: "Carapelli", supermarket: "Coop", price: 6.29, pricePerUnit: "€8.39/L", category: "Condimenti", onPromotion: true, promotionLabel: "Volantino -15%" },
  { ingredient: "olio", product: "Olio EVO 750ml", brand: "De Cecco", supermarket: "Conad", price: 5.99, pricePerUnit: "€7.99/L", category: "Condimenti", onPromotion: false },
  { ingredient: "olio", product: "Olio EVO 750ml", brand: "Lidl Bio", supermarket: "Lidl", price: 4.99, pricePerUnit: "€6.65/L", category: "Condimenti", onPromotion: true, promotionLabel: "Prezzo basso" },

  // RISO
  { ingredient: "riso", product: "Riso Arborio 1kg", brand: "Scotti", supermarket: "Esselunga", price: 2.29, pricePerUnit: "€2.29/kg", category: "Secco", onPromotion: false },
  { ingredient: "riso", product: "Riso Arborio 1kg", brand: "Riso Gallo", supermarket: "Coop", price: 2.49, pricePerUnit: "€2.49/kg", category: "Secco", onPromotion: false },
  { ingredient: "riso", product: "Riso Arborio 1kg", brand: "Scotti", supermarket: "Conad", price: 2.19, pricePerUnit: "€2.19/kg", category: "Secco", onPromotion: true, promotionLabel: "Volantino -10%" },
  { ingredient: "riso", product: "Riso Arborio 1kg", brand: "Eurospin", supermarket: "Eurospin", price: 1.89, pricePerUnit: "€1.89/kg", category: "Secco", onPromotion: false },

  // UOVA
  { ingredient: "uova", product: "Uova fresche allevamento a terra x6", brand: "Coop", supermarket: "Coop", price: 1.89, pricePerUnit: "€0.32/pz", category: "Freschi", onPromotion: false },
  { ingredient: "uova", product: "Uova bio x6", brand: "Ovito", supermarket: "Esselunga", price: 2.99, pricePerUnit: "€0.50/pz", category: "Freschi", onPromotion: false },
  { ingredient: "uova", product: "Uova fresche x6", brand: "Conad", supermarket: "Conad", price: 1.79, pricePerUnit: "€0.30/pz", category: "Freschi", onPromotion: true, promotionLabel: "Volantino" },
  { ingredient: "uova", product: "Uova fresche x10", brand: "Eurospin", supermarket: "Eurospin", price: 2.29, pricePerUnit: "€0.23/pz", category: "Freschi", onPromotion: false },

  // PARMIGIANO
  { ingredient: "parmigiano", product: "Parmigiano Reggiano DOP 200g", brand: "Parmareggio", supermarket: "Esselunga", price: 4.99, pricePerUnit: "€24.95/kg", category: "Latticini", onPromotion: false },
  { ingredient: "parmigiano", product: "Parmigiano Reggiano DOP 200g", brand: "Granarolo", supermarket: "Coop", price: 4.49, pricePerUnit: "€22.45/kg", category: "Latticini", onPromotion: true, promotionLabel: "Volantino -10%" },
  { ingredient: "parmigiano", product: "Parmigiano Reggiano DOP 200g", brand: "Conad", supermarket: "Conad", price: 4.29, pricePerUnit: "€21.45/kg", category: "Latticini", onPromotion: false },

  // POLLO
  { ingredient: "pollo", product: "Petto di pollo 500g", brand: "Amadori", supermarket: "Esselunga", price: 4.90, pricePerUnit: "€9.80/kg", category: "Proteine", onPromotion: false },
  { ingredient: "pollo", product: "Petto di pollo 500g", brand: "AIA", supermarket: "Coop", price: 5.29, pricePerUnit: "€10.58/kg", category: "Proteine", onPromotion: false },
  { ingredient: "pollo", product: "Petto di pollo 500g", brand: "Amadori", supermarket: "Conad", price: 4.49, pricePerUnit: "€8.98/kg", category: "Proteine", onPromotion: true, promotionLabel: "Volantino -15%" },
  { ingredient: "pollo", product: "Petto di pollo 500g", brand: "Lidl", supermarket: "Lidl", price: 3.99, pricePerUnit: "€7.98/kg", category: "Proteine", onPromotion: true, promotionLabel: "Prezzo basso" },

  // SALMONE
  { ingredient: "salmone", product: "Filetto di salmone 300g", brand: "Fresco banco", supermarket: "Esselunga", price: 6.90, pricePerUnit: "€23.00/kg", category: "Proteine", onPromotion: false },
  { ingredient: "salmone", product: "Filetto di salmone 300g", brand: "Fresco banco", supermarket: "Coop", price: 7.49, pricePerUnit: "€24.97/kg", category: "Proteine", onPromotion: false },
  { ingredient: "salmone", product: "Salmone norvegese 300g", brand: "Conad", supermarket: "Conad", price: 5.99, pricePerUnit: "€19.97/kg", category: "Proteine", onPromotion: true, promotionLabel: "Volantino -20%" },

  // VERDURE
  { ingredient: "zucchine", product: "Zucchine italiane 500g", brand: "Sfuso", supermarket: "Esselunga", price: 1.49, pricePerUnit: "€2.98/kg", category: "Verdura", onPromotion: false },
  { ingredient: "zucchine", product: "Zucchine italiane 500g", brand: "Sfuso", supermarket: "Lidl", price: 0.99, pricePerUnit: "€1.98/kg", category: "Verdura", onPromotion: true, promotionLabel: "Super weekend" },
  { ingredient: "spinaci", product: "Spinaci freschi 400g", brand: "Bonduelle", supermarket: "Coop", price: 1.89, pricePerUnit: "€4.73/kg", category: "Verdura", onPromotion: false },
  { ingredient: "spinaci", product: "Spinaci freschi 400g", brand: "Sfuso", supermarket: "Lidl", price: 1.29, pricePerUnit: "€3.23/kg", category: "Verdura", onPromotion: false },
  { ingredient: "broccoli", product: "Broccoli 500g", brand: "Sfuso", supermarket: "Esselunga", price: 1.79, pricePerUnit: "€3.58/kg", category: "Verdura", onPromotion: false },
  { ingredient: "broccoli", product: "Broccoli 500g", brand: "Sfuso", supermarket: "Lidl", price: 1.29, pricePerUnit: "€2.58/kg", category: "Verdura", onPromotion: true, promotionLabel: "Offerta" },
  { ingredient: "carote", product: "Carote 1kg", brand: "Sfuso", supermarket: "Eurospin", price: 0.89, pricePerUnit: "€0.89/kg", category: "Verdura", onPromotion: false },
  { ingredient: "carote", product: "Carote 1kg", brand: "Sfuso", supermarket: "Coop", price: 1.29, pricePerUnit: "€1.29/kg", category: "Verdura", onPromotion: false },
  { ingredient: "pomodori", product: "Pomodori ciliegino 500g", brand: "Sfuso", supermarket: "Lidl", price: 1.49, pricePerUnit: "€2.98/kg", category: "Verdura", onPromotion: true, promotionLabel: "Volantino" },
  { ingredient: "pomodori", product: "Pomodori ciliegino 500g", brand: "Sfuso", supermarket: "Coop", price: 1.79, pricePerUnit: "€3.58/kg", category: "Verdura", onPromotion: false },
  { ingredient: "pomodori", product: "Pomodori ciliegino 500g", brand: "Sfuso", supermarket: "Conad", price: 1.59, pricePerUnit: "€3.18/kg", category: "Verdura", onPromotion: false },

  // LEGUMI
  { ingredient: "ceci", product: "Ceci lessati 400g", brand: "Valfrutta", supermarket: "Esselunga", price: 0.99, pricePerUnit: "€2.48/kg", category: "Conserve", onPromotion: false },
  { ingredient: "ceci", product: "Ceci lessati 400g", brand: "Coop", supermarket: "Coop", price: 0.79, pricePerUnit: "€1.98/kg", category: "Conserve", onPromotion: true, promotionLabel: "Marca Coop" },
  { ingredient: "lenticchie", product: "Lenticchie secche 500g", brand: "Pedon", supermarket: "Conad", price: 1.69, pricePerUnit: "€3.38/kg", category: "Secco", onPromotion: false },
  { ingredient: "lenticchie", product: "Lenticchie secche 500g", brand: "Eurospin", supermarket: "Eurospin", price: 1.19, pricePerUnit: "€2.38/kg", category: "Secco", onPromotion: false },
  { ingredient: "fagioli", product: "Fagioli borlotti 400g", brand: "Valfrutta", supermarket: "Coop", price: 0.89, pricePerUnit: "€2.23/kg", category: "Conserve", onPromotion: false },

  // PANE
  { ingredient: "pane", product: "Pane integrale 400g", brand: "Mulino Bianco", supermarket: "Esselunga", price: 1.89, pricePerUnit: "€4.73/kg", category: "Panetteria", onPromotion: false },
  { ingredient: "pane", product: "Pane integrale 400g", brand: "Conad", supermarket: "Conad", price: 1.49, pricePerUnit: "€3.73/kg", category: "Panetteria", onPromotion: true, promotionLabel: "Volantino" },

  // QUINOA / FARRO
  { ingredient: "quinoa", product: "Quinoa biologica 300g", brand: "Pedon", supermarket: "Esselunga", price: 2.99, pricePerUnit: "€9.97/kg", category: "Secco", onPromotion: false },
  { ingredient: "quinoa", product: "Quinoa bio 300g", brand: "Coop Bio", supermarket: "Coop", price: 2.49, pricePerUnit: "€8.30/kg", category: "Secco", onPromotion: true, promotionLabel: "Bio week" },
  { ingredient: "farro", product: "Farro perlato 500g", brand: "Pedon", supermarket: "Conad", price: 1.99, pricePerUnit: "€3.98/kg", category: "Secco", onPromotion: false },

  // TOFU / TEMPEH
  { ingredient: "tofu", product: "Tofu naturale 400g", brand: "Sojasun", supermarket: "Esselunga", price: 2.49, pricePerUnit: "€6.23/kg", category: "Proteine vegetali", onPromotion: false },
  { ingredient: "tofu", product: "Tofu naturale 400g", brand: "Coop Veg", supermarket: "Coop", price: 2.29, pricePerUnit: "€5.73/kg", category: "Proteine vegetali", onPromotion: true, promotionLabel: "Veg week" },
  { ingredient: "tempeh", product: "Tempeh bio 200g", brand: "Sojasun", supermarket: "Esselunga", price: 2.99, pricePerUnit: "€14.95/kg", category: "Proteine vegetali", onPromotion: false },

  // AVOCADO
  { ingredient: "avocado", product: "Avocado maturo x2", brand: "Sfuso", supermarket: "Esselunga", price: 2.99, pricePerUnit: "€1.50/pz", category: "Verdura", onPromotion: false },
  { ingredient: "avocado", product: "Avocado maturo x2", brand: "Sfuso", supermarket: "Lidl", price: 1.99, pricePerUnit: "€1.00/pz", category: "Verdura", onPromotion: true, promotionLabel: "Super weekend" },
];

// ── Ingredient keywords to product mapping ──

const ingredientKeywords: Record<string, string[]> = {
  pasta: ["pasta", "penne", "spaghetti", "tagliatelle", "fusilli"],
  pomodoro: ["pomodoro", "pomodori", "pomodorini", "passata", "sugo"],
  tonno: ["tonno"],
  latte: ["latte"],
  mozzarella: ["mozzarella", "burrata"],
  olio: ["olio", "olio extravergine", "evo"],
  riso: ["riso", "risotto", "arborio", "carnaroli"],
  uova: ["uova", "uovo"],
  parmigiano: ["parmigiano", "grana"],
  pollo: ["pollo", "petto di pollo"],
  salmone: ["salmone"],
  zucchine: ["zucchine"],
  spinaci: ["spinaci"],
  broccoli: ["broccoli"],
  carote: ["carote"],
  pomodori: ["pomodori", "pomodorini", "ciliegino"],
  ceci: ["ceci", "hummus"],
  lenticchie: ["lenticchie"],
  fagioli: ["fagioli"],
  pane: ["pane", "crostini", "bruschette"],
  quinoa: ["quinoa"],
  farro: ["farro"],
  tofu: ["tofu"],
  tempeh: ["tempeh"],
  avocado: ["avocado"],
};

/**
 * Find matching products for a meal name
 */
function extractIngredientsFromMeal(mealName: string): string[] {
  const lower = mealName.toLowerCase();
  const matched: string[] = [];
  
  for (const [ingredient, keywords] of Object.entries(ingredientKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      matched.push(ingredient);
    }
  }
  
  return matched;
}

/**
 * Get products for a specific ingredient, optionally filtered by supermarket region
 */
export function getProductsForIngredient(ingredient: string, supermarkets?: string[]): GDOProduct[] {
  const products = gdoProducts.filter(p => p.ingredient === ingredient);
  if (supermarkets && supermarkets.length > 0) {
    return products.filter(p => supermarkets.includes(p.supermarket));
  }
  return products;
}

/**
 * Generate shopping list from meal names, checking against pantry
 */
export function generateShoppingList(
  mealNames: string[],
  pantryNames: string[],
  cap?: string
): ShoppingListItem[] {
  // Extract all ingredients from all meals
  const allIngredients = new Set<string>();
  for (const meal of mealNames) {
    const ingredients = extractIngredientsFromMeal(meal);
    ingredients.forEach(i => allIngredients.add(i));
  }

  // Get available supermarkets for the region
  let availableSupermarkets: string[] | undefined;
  if (cap) {
    const info = lookupCap(cap);
    if (info) {
      const regionChains: Record<string, string[]> = {
        nord: ["Esselunga", "Coop", "Carrefour", "Conad", "Lidl", "Aldi", "Eurospin"],
        centro: ["Coop", "Conad", "Carrefour", "Lidl", "Eurospin", "Penny Market"],
        sud: ["Conad", "Carrefour", "Lidl", "MD", "Eurospin", "Penny Market"],
        sardegna: ["Conad", "Carrefour", "Lidl", "Eurospin", "MD"],
        sicilia: ["Conad", "Carrefour", "Lidl", "Eurospin", "MD", "Penny Market"],
      };
      availableSupermarkets = regionChains[info.region] || undefined;
    }
  }

  const items: ShoppingListItem[] = [];

  for (const ingredient of allIngredients) {
    const inPantryFlag = isInPantry(ingredient, pantryNames);
    const products = getProductsForIngredient(ingredient, availableSupermarkets);
    const prices = products.map(p => p.price);

    items.push({
      ingredient,
      inPantry: inPantryFlag,
      neededQuantity: "1",
      products,
      bestPrice: prices.length > 0 ? Math.min(...prices) : 0,
      worstPrice: prices.length > 0 ? Math.max(...prices) : 0,
    });
  }

  // Sort: non-pantry first, then by ingredient name
  return items.sort((a, b) => {
    if (a.inPantry !== b.inPantry) return a.inPantry ? 1 : -1;
    return a.ingredient.localeCompare(b.ingredient);
  });
}

/**
 * Compare total costs across supermarkets for a given shopping list
 */
export function comparePricesAcrossSupermarkets(
  shoppingList: ShoppingListItem[],
  cap: string
): SupermarketComparison[] {
  const info = lookupCap(cap);
  if (!info) return [];

  const regionChains: Record<string, string[]> = {
    nord: ["Esselunga", "Coop", "Conad", "Lidl", "Eurospin"],
    centro: ["Coop", "Conad", "Carrefour", "Lidl", "Eurospin"],
    sud: ["Conad", "Carrefour", "Lidl", "Eurospin", "MD"],
    sardegna: ["Conad", "Lidl", "Eurospin", "MD"],
    sicilia: ["Conad", "Carrefour", "Lidl", "Eurospin"],
  };

  const supermarkets = regionChains[info.region] || regionChains.nord;
  const neededItems = shoppingList.filter(i => !i.inPantry);

  return supermarkets.map(supermarket => {
    let totalCost = 0;
    let promotionCount = 0;
    const items: SupermarketComparison["items"] = [];

    for (const item of neededItems) {
      // Find best product for this ingredient at this supermarket
      const available = item.products.filter(p => p.supermarket === supermarket);
      if (available.length > 0) {
        const cheapest = available.reduce((a, b) => a.price < b.price ? a : b);
        totalCost += cheapest.price;
        if (cheapest.onPromotion) promotionCount++;
        items.push({
          ingredient: item.ingredient,
          product: cheapest.product,
          brand: cheapest.brand,
          price: cheapest.price,
          onPromotion: cheapest.onPromotion,
        });
      } else {
        // Fallback: use average price across all supermarkets
        const avg = item.products.length > 0
          ? item.products.reduce((s, p) => s + p.price, 0) / item.products.length
          : 2.00;
        totalCost += avg;
        items.push({
          ingredient: item.ingredient,
          product: `${item.ingredient} (stima)`,
          brand: "Generico",
          price: +avg.toFixed(2),
          onPromotion: false,
        });
      }
    }

    return {
      supermarket,
      totalCost: +totalCost.toFixed(2),
      itemCount: items.length,
      promotionCount,
      items,
    };
  }).sort((a, b) => a.totalCost - b.totalCost);
}
