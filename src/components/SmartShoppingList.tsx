import { useState } from "react";
import {
  ShoppingCart, Info, TrendingDown, Tag, BarChart3, ArrowUpDown,
  Leaf, Award, Shield, Sparkles, Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PriceSource = "volantino" | "storico" | "offerta_online";

interface PricedItem {
  name: string;
  category: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  source: PriceSource;
  checked: boolean;
  brands?: { name: string; price: number; rating?: number; bio?: boolean; fairTrade?: boolean }[];
  seasonal?: boolean;
  origin?: string;
}

type Priority = "risparmio" | "equilibrio" | "sostenibilita";

const sourceLabels: Record<PriceSource, { label: string; icon: typeof Tag }> = {
  volantino: { label: "Volantino", icon: Tag },
  storico: { label: "Media storica", icon: BarChart3 },
  offerta_online: { label: "Offerta online", icon: TrendingDown },
};

const priorityOptions: { value: Priority; label: string; icon: typeof TrendingDown }[] = [
  { value: "risparmio", label: "Risparmio massimo", icon: TrendingDown },
  { value: "equilibrio", label: "Prezzo/Qualità", icon: ArrowUpDown },
  { value: "sostenibilita", label: "Sostenibilità", icon: Leaf },
];

const mockItems: PricedItem[] = [
  { name: "Riso arborio 300g", category: "🍝 Secco e Dispensa", avgPrice: 2.19, minPrice: 1.79, maxPrice: 2.59, source: "storico", checked: false,
    brands: [
      { name: "Scotti", price: 2.19, rating: 4 },
      { name: "Riso Gallo", price: 2.49, rating: 5 },
      { name: "Marca del supermercato", price: 1.79, rating: 3 },
    ] },
  { name: "Quinoa biologica 250g", category: "🍝 Secco e Dispensa", avgPrice: 2.89, minPrice: 2.49, maxPrice: 3.29, source: "volantino", checked: false,
    brands: [
      { name: "Quinua Real", price: 3.29, bio: true, fairTrade: true },
      { name: "Pedon", price: 2.89, bio: true },
      { name: "Coop Bio", price: 2.49, bio: true },
    ] },
  { name: "Petto di pollo 400g", category: "🥩 Proteine", avgPrice: 4.50, minPrice: 3.90, maxPrice: 5.20, source: "offerta_online", checked: false,
    brands: [
      { name: "Amadori", price: 4.90, rating: 4 },
      { name: "AIA", price: 5.20, rating: 4 },
      { name: "Banco macelleria", price: 3.90, rating: 5 },
    ] },
  { name: "Salmone fresco 300g", category: "🥩 Proteine", avgPrice: 6.90, minPrice: 5.90, maxPrice: 8.50, source: "storico", checked: false },
  { name: "Spinaci freschi 300g", category: "🥦 Frutta e Verdura", avgPrice: 1.89, minPrice: 1.49, maxPrice: 2.29, source: "volantino", checked: false, seasonal: true, origin: "Italia - Lazio" },
  { name: "Zucca a fette 500g", category: "🥦 Frutta e Verdura", avgPrice: 2.49, minPrice: 1.99, maxPrice: 2.99, source: "storico", checked: false, seasonal: true, origin: "Italia - Lombardia" },
  { name: "Broccoli 400g", category: "🥦 Frutta e Verdura", avgPrice: 1.99, minPrice: 1.49, maxPrice: 2.49, source: "offerta_online", checked: false, seasonal: true, origin: "Italia - Puglia" },
  { name: "Avocado x2", category: "🥦 Frutta e Verdura", avgPrice: 3.50, minPrice: 2.99, maxPrice: 3.99, source: "storico", checked: false, seasonal: false, origin: "Spagna" },
  { name: "Uova bio x6", category: "🥩 Proteine", avgPrice: 2.89, minPrice: 2.49, maxPrice: 3.49, source: "volantino", checked: false,
    brands: [
      { name: "Ovito Bio", price: 3.49, bio: true },
      { name: "Coop Bio", price: 2.89, bio: true },
      { name: "Standard", price: 2.49 },
    ] },
  { name: "Parmigiano Reggiano 200g", category: "🧀 Latticini", avgPrice: 4.29, minPrice: 3.79, maxPrice: 5.49, source: "storico", checked: false,
    brands: [
      { name: "Parmareggio DOP", price: 5.49, rating: 5 },
      { name: "Granarolo", price: 4.29, rating: 4 },
      { name: "Marca del supermercato", price: 3.79, rating: 3 },
    ] },
  { name: "Pasta integrale 500g", category: "🍝 Secco e Dispensa", avgPrice: 1.29, minPrice: 0.99, maxPrice: 1.69, source: "offerta_online", checked: false,
    brands: [
      { name: "Barilla Integrale", price: 1.49, rating: 4 },
      { name: "De Cecco", price: 1.69, rating: 5 },
      { name: "Marca del supermercato", price: 0.99, rating: 3 },
    ] },
  { name: "Olio EVO 500ml", category: "🍝 Secco e Dispensa", avgPrice: 5.90, minPrice: 4.90, maxPrice: 7.90, source: "storico", checked: false,
    brands: [
      { name: "Monini DOP", price: 7.90, rating: 5, bio: true },
      { name: "Carapelli", price: 5.90, rating: 4 },
      { name: "Marca del supermercato", price: 4.90, rating: 3 },
    ] },
];

const SmartShoppingList = () => {
  const [items, setItems] = useState<PricedItem[]>(mockItems);
  const [priority, setPriority] = useState<Priority>("equilibrio");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handlePriorityChange = (p: Priority) => {
    setPriority(p);
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      // Re-sort items based on priority
      setItems((prev) => {
        const sorted = [...prev];
        if (p === "risparmio") sorted.sort((a, b) => a.minPrice - b.minPrice);
        if (p === "sostenibilita") sorted.sort((a, b) => (b.seasonal ? 1 : 0) - (a.seasonal ? 1 : 0));
        return sorted;
      });
    }, 1200);
  };

  const toggleCheck = (name: string) => {
    setItems((prev) => prev.map((i) => (i.name === name ? { ...i, checked: !i.checked } : i)));
  };

  const grouped = items.reduce<Record<string, PricedItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const totalAvg = items.reduce((s, i) => s + i.avgPrice, 0);
  const totalMin = items.reduce((s, i) => s + i.minPrice, 0);
  const totalMax = items.reduce((s, i) => s + i.maxPrice, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Lista della spesa intelligente
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{items.length} prodotti · Stima: €{totalAvg.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Range stimato</p>
          <p className="text-sm font-semibold text-foreground">€{totalMin.toFixed(2)} – €{totalMax.toFixed(2)}</p>
        </div>
      </div>

      {/* Priority selector */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Cosa conta di più questa settimana?</p>
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

      {/* Recalculating animation */}
      {isRecalculating && (
        <div className="flex items-center gap-2 justify-center py-3 animate-fade-in">
          <Loader2 className="h-5 w-5 text-accent animate-spin" />
          <span className="text-sm font-medium text-accent">L'AI sta ricalcolando le migliori combinazioni…</span>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3">
        <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          I prezzi sono proiezioni basate su dati pubblici (volantini, offerte online, medie storiche) e possono variare in negozio.
        </p>
      </div>

      {/* Items by category */}
      {!isRecalculating && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, catItems]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-2">{category}</h3>
              <div className="space-y-1">
                {catItems.map((item) => {
                  const SourceIcon = sourceLabels[item.source].icon;
                  const isExpanded = expandedItem === item.name;

                  return (
                    <div key={item.name}>
                      <div
                        onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                          item.checked ? "border-primary/20 bg-primary/5" : "border-border/40 bg-card hover:border-primary/20"
                        }`}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleCheck(item.name); }}
                          className={`h-4 w-4 rounded border-2 shrink-0 transition-colors ${
                            item.checked ? "bg-primary border-primary" : "border-border"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>{item.name}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <SourceIcon className="h-3 w-3" />
                              {sourceLabels[item.source].label}
                            </span>
                            {item.seasonal && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Di stagione</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-foreground">€{item.avgPrice.toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground">€{item.minPrice.toFixed(2)} – €{item.maxPrice.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Expanded brand comparison */}
                      {isExpanded && (
                        <div className="ml-7 mt-1 mb-2 rounded-xl border border-border/40 bg-secondary/20 p-4 animate-fade-in space-y-3">
                          {item.brands && item.brands.length > 0 ? (
                            <>
                              <p className="text-xs font-semibold text-foreground">Confronto brand</p>
                              {item.brands
                                .sort((a, b) => {
                                  if (priority === "risparmio") return a.price - b.price;
                                  if (priority === "sostenibilita") return (b.bio ? 1 : 0) - (a.bio ? 1 : 0);
                                  return (b.rating || 0) - (a.rating || 0);
                                })
                                .map((brand, i) => (
                                  <div key={brand.name} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-card transition-colors">
                                    <div className="flex items-center gap-2">
                                      {i === 0 && <Sparkles className="h-3 w-3 text-accent" />}
                                      <span className="text-sm text-foreground">{brand.name}</span>
                                      {brand.bio && <Badge variant="secondary" className="text-[10px] px-1 py-0"><Leaf className="h-2.5 w-2.5 mr-0.5" />Bio</Badge>}
                                      {brand.fairTrade && <Badge variant="secondary" className="text-[10px] px-1 py-0"><Shield className="h-2.5 w-2.5 mr-0.5" />Fair</Badge>}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">€{brand.price.toFixed(2)}</span>
                                  </div>
                                ))}
                            </>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-foreground">Prodotto fresco</p>
                              {item.seasonal !== undefined && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Leaf className="h-3 w-3" />
                                  {item.seasonal ? "Prodotto di stagione — miglior rapporto qualità/prezzo" : "Fuori stagione — valuta alternative"}
                                </p>
                              )}
                              {item.origin && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Award className="h-3 w-3" />
                                  Provenienza stimata: {item.origin}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartShoppingList;
