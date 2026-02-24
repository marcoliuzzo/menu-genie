import { useState } from "react";
import { Flame, Loader2, AlertCircle, TrendingUp, Sparkles, Pizza } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface DayNutrition {
  day: string;
  targetCal: number;
  actualCal: number;
  protein: number;
  carbs: number;
  fat: number;
  cheat?: number;
}

const weekData: DayNutrition[] = [
  { day: "Lun", targetCal: 1500, actualCal: 1450, protein: 65, carbs: 180, fat: 52 },
  { day: "Mar", targetCal: 1500, actualCal: 1380, protein: 58, carbs: 175, fat: 48 },
  { day: "Mer", targetCal: 1500, actualCal: 1520, protein: 70, carbs: 190, fat: 50 },
  { day: "Gio", targetCal: 1500, actualCal: 1410, protein: 62, carbs: 170, fat: 53 },
  { day: "Ven", targetCal: 1500, actualCal: 1350, protein: 55, carbs: 165, fat: 49 },
  { day: "Sab", targetCal: 1500, actualCal: 1600, protein: 60, carbs: 200, fat: 58 },
  { day: "Dom", targetCal: 1500, actualCal: 1480, protein: 63, carbs: 185, fat: 51 },
];

const NutritionMonitor = () => {
  const [data, setData] = useState(weekData);
  const [showCheatForm, setShowCheatForm] = useState(false);
  const [cheatCal, setCheatCal] = useState("");
  const [cheatDesc, setCheatDesc] = useState("");
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanced, setRebalanced] = useState(false);

  const totalTarget = data.reduce((s, d) => s + d.targetCal, 0);
  const totalActual = data.reduce((s, d) => s + d.actualCal + (d.cheat || 0), 0);
  const avgProtein = Math.round(data.reduce((s, d) => s + d.protein, 0) / data.length);
  const avgCarbs = Math.round(data.reduce((s, d) => s + d.carbs, 0) / data.length);
  const avgFat = Math.round(data.reduce((s, d) => s + d.fat, 0) / data.length);
  const maxCal = Math.max(...data.map((d) => d.targetCal));

  const handleCheat = () => {
    const cal = parseInt(cheatCal);
    if (!cal || cal <= 0) return;
    setIsRebalancing(true);

    setTimeout(() => {
      // Add cheat to today and reduce remaining days
      const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
      const reduction = Math.round(cal / Math.max(1, 6 - todayIndex));

      setData((prev) =>
        prev.map((d, i) => {
          if (i === todayIndex) return { ...d, cheat: cal };
          if (i > todayIndex) return { ...d, targetCal: Math.max(1200, d.targetCal - reduction) };
          return d;
        })
      );

      setIsRebalancing(false);
      setRebalanced(true);
      setShowCheatForm(false);
      setCheatCal("");
      setCheatDesc("");
      setTimeout(() => setRebalanced(false), 5000);
    }, 2000);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            Monitoraggio nutrizionale
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Media giornaliera: {Math.round(totalActual / 7)} kcal</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1.5"
          onClick={() => setShowCheatForm(!showCheatForm)}
        >
          <Pizza className="h-4 w-4" />
          Ho fatto uno sgarro
        </Button>
      </div>

      {/* Rebalanced notification */}
      {rebalanced && (
        <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 animate-fade-in">
          <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            Abbiamo riequilibrato il tuo piano per mantenere l'obiettivo settimanale. Nessun giudizio, solo supporto. 💪
          </p>
        </div>
      )}

      {/* Cheat form */}
      {showCheatForm && (
        <div className="rounded-xl border border-border/60 bg-secondary/20 p-4 space-y-3 animate-fade-in">
          <p className="text-sm font-medium text-foreground">Nessun problema, capita a tutti! 😊</p>
          <p className="text-xs text-muted-foreground">L'AI ribilancerà i pasti rimanenti della settimana.</p>
          <Input value={cheatDesc} onChange={(e) => setCheatDesc(e.target.value)} placeholder="Cos'hai mangiato? (opzionale)" />
          <Input value={cheatCal} onChange={(e) => setCheatCal(e.target.value)} type="number" placeholder="Calorie stimate (es. 500)" />
          <Button onClick={handleCheat} disabled={!cheatCal || isRebalancing} className="w-full rounded-full gap-2">
            {isRebalancing ? (
              <><Loader2 className="h-4 w-4 animate-spin" />L'AI sta riequilibrando il piano…</>
            ) : (
              <><TrendingUp className="h-4 w-4" />Ribilancia piano</>
            )}
          </Button>
        </div>
      )}

      {/* Macros summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Proteine", value: `${avgProtein}g`, pct: (avgProtein * 4 / (totalActual / 7)) * 100 },
          { label: "Carboidrati", value: `${avgCarbs}g`, pct: (avgCarbs * 4 / (totalActual / 7)) * 100 },
          { label: "Grassi", value: `${avgFat}g`, pct: (avgFat * 9 / (totalActual / 7)) * 100 },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border/60 bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{m.value}</p>
            <p className="text-[10px] text-muted-foreground">{Math.round(m.pct)}% kcal</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="rounded-xl border border-border/60 bg-card p-4">
        <p className="text-sm font-semibold text-foreground mb-4">Andamento settimanale</p>
        <div className="flex items-end gap-2 h-36">
          {data.map((d) => {
            const total = d.actualCal + (d.cheat || 0);
            const barH = (total / (maxCal * 1.3)) * 100;
            const targetH = (d.targetCal / (maxCal * 1.3)) * 100;
            const overTarget = total > d.targetCal;

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="relative w-full flex justify-center" style={{ height: "100%" }}>
                  <div
                    className={`w-6 rounded-t-md transition-all duration-500 ${
                      overTarget ? "bg-amber-400" : "bg-primary/60"
                    }`}
                    style={{ height: `${barH}%`, position: "absolute", bottom: 0 }}
                  />
                  {d.cheat && (
                    <div
                      className="w-6 bg-destructive/40 rounded-t-md absolute bottom-0"
                      style={{ height: `${(d.cheat / (maxCal * 1.3)) * 100}%`, marginBottom: `${((d.actualCal) / (maxCal * 1.3)) * 100}%` }}
                    />
                  )}
                  <div
                    className="absolute w-8 border-t-2 border-dashed border-muted-foreground/30"
                    style={{ bottom: `${targetH}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">{d.day}</span>
                <span className="text-[10px] font-medium text-foreground">{total}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary/60" />Consumate</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />Sopra target</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive/40" />Sgarro</span>
          <span className="flex items-center gap-1"><span className="h-2 w-4 border-t-2 border-dashed border-muted-foreground/30" />Target</span>
        </div>
      </div>
    </div>
  );
};

export default NutritionMonitor;
