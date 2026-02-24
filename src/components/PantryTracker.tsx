import { useState } from "react";
import { Package, Plus, X, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PantryItem {
  id: string;
  name: string;
  purchaseDate: string;
  quantity: string;
  category: "fresco" | "confezionato" | "congelato";
  estimatedExpiry: string;
  daysLeft: number;
}

const categoryOptions = [
  { value: "fresco" as const, label: "🥬 Fresco" },
  { value: "confezionato" as const, label: "📦 Confezionato" },
  { value: "congelato" as const, label: "❄️ Congelato" },
];

const estimateExpiry = (purchaseDate: string, category: "fresco" | "confezionato" | "congelato") => {
  const date = new Date(purchaseDate);
  const daysToAdd = category === "fresco" ? 5 : category === "confezionato" ? 180 : 90;
  date.setDate(date.getDate() + daysToAdd);
  const now = new Date();
  const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { expiry: date.toISOString().split("T")[0], daysLeft };
};

const getStatusColor = (daysLeft: number) => {
  if (daysLeft <= 2) return "text-destructive bg-destructive/10 border-destructive/20";
  if (daysLeft <= 5) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-primary bg-primary/10 border-primary/20";
};

const getStatusLabel = (daysLeft: number) => {
  if (daysLeft <= 0) return "Scaduto";
  if (daysLeft <= 2) return "Priorità utilizzo";
  if (daysLeft <= 5) return "Da consumare presto";
  return "Fresco";
};

const mockPantry: PantryItem[] = [
  { id: "1", name: "Spinaci freschi", purchaseDate: "2026-02-22", quantity: "300g", category: "fresco", estimatedExpiry: "2026-02-27", daysLeft: 3 },
  { id: "2", name: "Yogurt greco", purchaseDate: "2026-02-20", quantity: "2 vasetti", category: "fresco", estimatedExpiry: "2026-02-25", daysLeft: 1 },
  { id: "3", name: "Pasta integrale", purchaseDate: "2026-02-01", quantity: "500g", category: "confezionato", estimatedExpiry: "2026-08-01", daysLeft: 158 },
  { id: "4", name: "Petto di pollo", purchaseDate: "2026-02-18", quantity: "400g", category: "congelato", estimatedExpiry: "2026-05-18", daysLeft: 82 },
  { id: "5", name: "Mozzarella", purchaseDate: "2026-02-23", quantity: "125g", category: "fresco", estimatedExpiry: "2026-02-26", daysLeft: 2 },
];

const PantryTracker = () => {
  const [items, setItems] = useState<PantryItem[]>(mockPantry);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newCategory, setNewCategory] = useState<"fresco" | "confezionato" | "congelato">("fresco");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = () => {
    if (!newName.trim()) return;
    setIsAdding(true);
    setTimeout(() => {
      const { expiry, daysLeft } = estimateExpiry(newDate, newCategory);
      const item: PantryItem = {
        id: Date.now().toString(),
        name: newName.trim(),
        purchaseDate: newDate,
        quantity: newQty || "1",
        category: newCategory,
        estimatedExpiry: expiry,
        daysLeft,
      };
      setItems((prev) => [...prev, item]);
      setNewName("");
      setNewQty("");
      setShowForm(false);
      setIsAdding(false);
    }, 800);
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const sorted = [...items].sort((a, b) => a.daysLeft - b.daysLeft);
  const expiringSoon = sorted.filter((i) => i.daysLeft <= 5);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Dispensa
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{items.length} prodotti · {expiringSoon.length} da consumare presto</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          Aggiungi
        </Button>
      </div>

      {/* Add form */}
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
          <Button onClick={addItem} disabled={!newName.trim() || isAdding} className="w-full rounded-full gap-2">
            {isAdding ? <><Loader2 className="h-4 w-4 animate-spin" />Stimando scadenza…</> : "Aggiungi alla dispensa"}
          </Button>
        </div>
      )}

      {/* Expiring soon alert */}
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

      {/* Items list */}
      <div className="space-y-1.5">
        {sorted.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border/40 bg-card px-4 py-3 transition-all hover:shadow-sm"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${getStatusColor(item.daysLeft)}`}>
              {item.daysLeft <= 0 ? "!" : item.daysLeft}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
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
                <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />Scade ~{item.estimatedExpiry}</span>
              </div>
            </div>
            <button onClick={() => removeItem(item.id)} className="p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantryTracker;
