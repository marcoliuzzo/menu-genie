import { useState } from "react";
import { Package, Plus, X, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/context/ProfileContext";
import { getStatusColor, getStatusLabel } from "@/lib/pantryEngine";

const categoryOptions = [
  { value: "fresco" as const, label: "🥬 Fresco" },
  { value: "confezionato" as const, label: "📦 Confezionato" },
  { value: "congelato" as const, label: "❄️ Congelato" },
];

const PantryTracker = () => {
  const { pantryItems, addPantryItem, removePantryItem } = useProfile();
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newCategory, setNewCategory] = useState<"fresco" | "confezionato" | "congelato">("fresco");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      addPantryItem({
        name: newName.trim(),
        purchaseDate: newDate,
        quantity: newQty || "1",
        category: newCategory,
      });
      setNewName("");
      setNewQty("");
      setShowForm(false);
      setIsAdding(false);
    }, 800);
  };

  const sorted = [...pantryItems].sort((a, b) => a.daysLeft - b.daysLeft);
  const expiringSoon = sorted.filter((i) => i.daysLeft <= 5);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 md:text-xl">
            <Package className="h-5 w-5 text-primary" />
            Dispensa
          </h2>
          <p className="text-xs text-muted-foreground mt-1 md:text-sm">{pantryItems.length} prodotti · {expiringSoon.length} da consumare presto</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Aggiungi</span>
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4 space-y-3 animate-fade-in">
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nome prodotto" />
          <div className="grid grid-cols-2 gap-3">
            <Input value={newQty} onChange={(e) => setNewQty(e.target.value)} placeholder="Quantità (es. 500g)" />
            <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {categoryOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setNewCategory(c.value)}
                className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-all ${
                  newCategory === c.value ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Button onClick={handleAdd} disabled={!newName.trim() || isAdding} className="w-full rounded-full gap-2">
            {isAdding ? <><Loader2 className="h-4 w-4 animate-spin" />Stimando scadenza…</> : "Aggiungi alla dispensa"}
          </Button>
        </div>
      )}

      {expiringSoon.length > 0 && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">
              {expiringSoon.length} prodott{expiringSoon.length === 1 ? "o" : "i"} da consumare presto
            </p>
            <p className="text-xs text-amber-700 mt-0.5">L'AI darà priorità a questi ingredienti nel piano settimanale.</p>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {sorted.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-card px-3 py-2.5 transition-all hover:shadow-sm md:px-4 md:py-3"
          >
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-bold md:h-8 md:w-8 md:text-xs ${getStatusColor(item.daysLeft)}`}>
              {item.daysLeft <= 0 ? "!" : item.daysLeft}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                {item.daysLeft <= 5 && (
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${item.daysLeft <= 2 ? "bg-destructive/10 text-destructive" : "bg-amber-50 text-amber-600"}`}>
                    {getStatusLabel(item.daysLeft)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{item.quantity}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5 truncate"><Clock className="h-3 w-3 shrink-0" />Scade ~{item.estimatedExpiry}</span>
              </div>
            </div>
            <button onClick={() => removePantryItem(item.id)} className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryTracker;
