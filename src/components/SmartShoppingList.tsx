import { useState, useEffect } from "react";
import {
  ShoppingCart, Info, TrendingDown, Tag, BarChart3, ArrowUpDown,
  Leaf, Sparkles, Loader2, Check, MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/context/ProfileContext";
import { GDOProduct } from "@/types";

type Priority = "risparmio" | "equilibrio" | "sostenibilita";

const priorityOptions: { value: Priority; label: string; icon: typeof TrendingDown }[] = [
  { value: "risparmio", label: "Risparmio massimo", icon: TrendingDown },
  { value: "equilibrio", label: "Prezzo/Qualità", icon: ArrowUpDown },
  { value: "sostenibilita", label: "Sostenibilità", icon: Leaf },
];

const SmartShoppingList = () => {
  const { profile, updateProfile, shoppingList, supermarketComparisons, recomputeSystem } = useProfile();
  const [priority, setPriority] = useState<Priority>("equilibrio");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [capInput, setCapInput] = useState(profile.cap || "");

  // Refresh shopping data when component mounts or profile changes
  useEffect(() => {
    recomputeSystem();
  }, [profile.diet, profile.allergies, profile.cap]);

  const handleCapSearch = () => {
    if (capInput.trim().length >= 4) {
      updateProfile({ cap: capInput.trim() });
      setIsRecalculating(true);
      setTimeout(() => {
        recomputeSystem();
        setIsRecalculating(false);
      }, 1200);
    }
  };

  const handlePriorityChange = (p: Priority) => {
    setPriority(p);
    setIsRecalculating(true);
    setTimeout(() => setIsRecalculating(false), 800);
  };

  const toggleCheck = (name: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const neededItems = shoppingList.filter(i => !i.inPantry);
  const pantryMatched = shoppingList.filter(i => i.inPantry);
  const totalMin = neededItems.reduce((s, i) => s + i.bestPrice, 0);
  const totalMax = neededItems.reduce((s, i) => s + i.worstPrice, 0);

  const sortedItems = [...neededItems].sort((a, b) => {
    if (priority === "risparmio") return a.bestPrice - b.bestPrice;
    return a.ingredient.localeCompare(b.ingredient);
  });

  // Group by category
  const grouped: Record<string, typeof sortedItems> = {};
  for (const item of sortedItems) {
    const cat = item.products[0]?.category || "Altro";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Lista della spesa intelligente
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {neededItems.length} da comprare · {pantryMatched.length} già in dispensa
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Range stimato</p>
          <p className="text-sm font-semibold text-foreground">€{totalMin.toFixed(2)} – €{totalMax.toFixed(2)}</p>
        </div>
      </div>

      {/* CAP input for price comparison */}
      <div className="rounded-xl border border-border/60 bg-secondary/20 p-4">
        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Confronta prezzi nella tua zona
        </p>
        <div className="flex gap-2">
          <Input
            value={capInput}
            onChange={(e) => setCapInput(e.target.value.replace(/\D/g, "").slice(0, 5))}
            onKeyDown={(e) => e.key === "Enter" && handleCapSearch()}
            placeholder="Inserisci CAP (es. 20100)"
            className="text-sm"
            inputMode="numeric"
            maxLength={5}
          />
          <Button onClick={handleCapSearch} size="sm" disabled={capInput.length < 4 || isRecalculating} className="rounded-lg">
            {isRecalculating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Cerca"}
          </Button>
        </div>
      </div>

      {/* Supermarket price comparison */}
      {supermarketComparisons.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card p-4">
          <p className="text-sm font-semibold text-foreground mb-3">Confronto supermercati</p>
          <div className="space-y-2">
            {supermarketComparisons.slice(0, 4).map((sc, i) => (
              <div key={sc.supermarket} className={`flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${i === 0 ? "bg-primary/5 border border-primary/20" : "hover:bg-secondary/30"}`}>
                <div className="flex items-center gap-2">
                  {i === 0 && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                  <span className="text-sm font-medium text-foreground">{sc.supermarket}</span>
                  {sc.promotionCount > 0 && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      <Tag className="h-2.5 w-2.5 mr-0.5" />{sc.promotionCount} offerte
                    </Badge>
                  )}
                </div>
                <span className={`text-sm font-bold ${i === 0 ? "text-primary" : "text-foreground"}`}>
                  €{sc.totalCost.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Priority selector */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Cosa conta di più?</p>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePriorityChange(p.value)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                priority === p.value
                  ? "border-accent/30 bg-accent/10 text-accent shadow-sm"
                  : "border-border text-muted-foreground hover:border-muted-foreground/30"
              }`}
            >
              <p.icon className="h-3.5 w-3.5" />
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {isRecalculating && (
        <div className="flex items-center gap-2 justify-center py-3 animate-fade-in">
          <Loader2 className="h-5 w-5 text-accent animate-spin" />
          <span className="text-sm font-medium text-accent">L'AI sta ricalcolando…</span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3">
        <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          I prezzi sono proiezioni basate su volantini, offerte online e medie. Possono variare in negozio.
        </p>
      </div>

      {/* Items list grouped by category */}
      {!isRecalculating && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-2">{category}</h3>
              <div className="space-y-1">
                {items.map((item) => {
                  const isExpanded = expandedItem === item.ingredient;
                  const isChecked = checkedItems.has(item.ingredient);

                  return (
                    <div key={item.ingredient}>
                      <div
                        onClick={() => setExpandedItem(isExpanded ? null : item.ingredient)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          isChecked ? "border-primary/20 bg-primary/5" : "border-border/40 bg-card hover:border-primary/20"
                        }`}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCheck(item.ingredient); }}
                          className={`h-4 w-4 rounded border-2 shrink-0 transition-colors flex items-center justify-center ${
                            isChecked ? "bg-primary border-primary" : "border-border"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 text-primary-foreground" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm capitalize ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {item.ingredient}
                          </span>
                          {item.products.some(p => p.onPromotion) && (
                            <div className="mt-0.5">
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-0.5">
                                <Tag className="h-2.5 w-2.5" />In offerta
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-foreground">€{item.bestPrice.toFixed(2)}</p>
                          {item.bestPrice !== item.worstPrice && (
                            <p className="text-[10px] text-muted-foreground">fino a €{item.worstPrice.toFixed(2)}</p>
                          )}
                        </div>
                      </div>

                      {isExpanded && item.products.length > 0 && (
                        <div className="ml-7 mt-1 mb-2 rounded-xl border border-border/40 bg-secondary/20 p-4 animate-fade-in space-y-2">
                          <p className="text-xs font-semibold text-foreground">Confronto prodotti</p>
                          {item.products
                            .sort((a, b) => priority === "risparmio" ? a.price - b.price : a.brand.localeCompare(b.brand))
                            .map((product, i) => (
                              <div key={`${product.brand}-${product.supermarket}-${i}`} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-card transition-colors">
                                <div className="flex items-center gap-2 min-w-0">
                                  {i === 0 && <Sparkles className="h-3 w-3 text-accent shrink-0" />}
                                  <div className="min-w-0">
                                    <span className="text-sm text-foreground block truncate">{product.brand}</span>
                                    <span className="text-[10px] text-muted-foreground">{product.supermarket} · {product.pricePerUnit}</span>
                                  </div>
                                  {product.onPromotion && (
                                    <Badge variant="secondary" className="text-[10px] px-1 py-0 shrink-0">
                                      {product.promotionLabel || "Offerta"}
                                    </Badge>
                                  )}
                                </div>
                                <span className={`text-sm font-medium shrink-0 ml-2 ${product.onPromotion ? "text-primary" : "text-foreground"}`}>
                                  €{product.price.toFixed(2)}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Pantry matched items */}
          {pantryMatched.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                Già in dispensa
              </h3>
              <div className="space-y-1">
                {pantryMatched.map((item) => (
                  <div key={item.ingredient} className="flex items-center gap-3 rounded-lg border border-primary/10 bg-primary/5 px-4 py-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground line-through capitalize">{item.ingredient}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px]">In dispensa</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartShoppingList;
