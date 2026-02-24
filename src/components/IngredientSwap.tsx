import { useState } from "react";
import { ArrowRightLeft, Leaf, TrendingDown, Sparkles, Loader2, X, Heart } from "lucide-react";

interface Alternative {
  name: string;
  type: "equivalente" | "economica" | "sostenibile" | "mood";
  priceDiff?: string;
  calDiff?: string;
  tag?: string;
}

interface IngredientSwapProps {
  ingredient: string;
  onSwap: (newIngredient: string) => void;
  onClose: () => void;
}

const mockAlternatives: Record<string, Alternative[]> = {
  default: [
    { name: "Tofu affumicato", type: "equivalente", calDiff: "-40 kcal", tag: "Proteico" },
    { name: "Legumi misti", type: "economica", priceDiff: "-€2.50", calDiff: "+20 kcal" },
    { name: "Tempeh bio", type: "sostenibile", priceDiff: "+€0.80", tag: "Bio" },
    { name: "Seitan artigianale", type: "mood", calDiff: "-10 kcal", tag: "Comfort" },
  ],
};

const typeConfig = {
  equivalente: { icon: ArrowRightLeft, label: "Equivalente", color: "text-accent" },
  economica: { icon: TrendingDown, label: "Più economica", color: "text-primary" },
  sostenibile: { icon: Leaf, label: "Sostenibile", color: "text-emerald-600" },
  mood: { icon: Heart, label: "Mood match", color: "text-pink-500" },
};

const IngredientSwap = ({ ingredient, onSwap, onClose }: IngredientSwapProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSwapping, setIsSwapping] = useState<string | null>(null);
  const alternatives = mockAlternatives.default;

  const handleSwap = (alt: Alternative) => {
    setIsSwapping(alt.name);
    setIsLoading(true);
    setTimeout(() => {
      onSwap(alt.name);
      setIsLoading(false);
      setIsSwapping(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-card border-l border-border shadow-2xl animate-fade-in flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/60">
        <div>
          <p className="text-xs text-muted-foreground">Sostituisci ingrediente</p>
          <p className="text-sm font-semibold text-foreground">{ingredient}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm animate-fade-in">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-sm font-medium text-accent mt-3">L'AI sta aggiornando calorie, lista spesa e costi…</p>
        </div>
      )}

      {/* Alternatives */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {alternatives.map((alt) => {
          const config = typeConfig[alt.type];
          const Icon = config.icon;

          return (
            <button
              key={alt.name}
              onClick={() => handleSwap(alt)}
              disabled={isLoading}
              className="w-full rounded-xl border border-border/40 bg-card p-4 text-left transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`h-4 w-4 ${config.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
                {alt.tag && (
                  <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">{alt.tag}</span>
                )}
              </div>
              <p className="text-sm font-semibold text-foreground">{alt.name}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                {alt.priceDiff && <span className={alt.priceDiff.startsWith("-") ? "text-primary" : "text-amber-600"}>{alt.priceDiff}</span>}
                {alt.calDiff && <span>{alt.calDiff}</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border/60">
        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Le alternative aggiornano automaticamente calorie, lista spesa e costi.
        </p>
      </div>
    </div>
  );
};

export default IngredientSwap;
