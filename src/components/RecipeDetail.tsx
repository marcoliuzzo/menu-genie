import { useState, useEffect, useCallback } from "react";
import {
  ChefHat, Clock, Play, Pause, RotateCcw, Check, ChevronRight, ChevronLeft,
  Users, Zap, Heart, Sparkles, Loader2, Timer, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

interface RecipeStep {
  step: number;
  instruction: string;
  duration?: number;
  tip?: string;
}

interface RecipeData {
  title: string;
  description: string;
  servings: number;
  totalTime: number;
  ingredients: { name: string; quantity: string; alternatives?: string[] }[];
  steps: RecipeStep[];
  chefNotes: string;
}

interface RecipeDetailProps {
  mealName: string;
  onClose: () => void;
}

const fallbackRecipe: RecipeData = {
  title: "Risotto ai funghi porcini",
  description: "Un classico della cucina italiana, cremoso e profumato, perfetto per una serata di comfort.",
  servings: 2,
  totalTime: 30,
  ingredients: [
    { name: "Riso arborio", quantity: "160g", alternatives: ["Riso carnaroli"] },
    { name: "Funghi porcini secchi", quantity: "30g", alternatives: ["Funghi champignon freschi 200g"] },
    { name: "Cipolla", quantity: "½", alternatives: ["Scalogno 1"] },
    { name: "Brodo vegetale", quantity: "800ml" },
    { name: "Parmigiano", quantity: "40g" },
    { name: "Burro", quantity: "20g", alternatives: ["Olio EVO 2 cucchiai"] },
    { name: "Vino bianco", quantity: "½ bicchiere" },
    { name: "Sale e pepe", quantity: "q.b." },
  ],
  steps: [
    { step: 1, instruction: "Metti i funghi porcini secchi in ammollo in acqua tiepida per 15 minuti. Scolali e taglia a pezzetti, conservando l'acqua filtrata.", duration: 15, tip: "L'acqua di ammollo aggiunge sapore: filtrala con un colino e aggiungila al brodo." },
    { step: 2, instruction: "Trita la cipolla finemente e falla soffriggere in una casseruola con metà del burro a fuoco dolce fino a doratura.", duration: 3 },
    { step: 3, instruction: "Aggiungi il riso e tostalo per 2 minuti mescolando costantemente, finché diventa traslucido.", duration: 2, tip: "La tostatura è fondamentale: crea una pellicola che rende il chicco più resistente alla cottura." },
    { step: 4, instruction: "Sfuma con il vino bianco e lascia evaporare completamente.", duration: 1 },
    { step: 5, instruction: "Aggiungi i funghi e inizia ad aggiungere il brodo caldo un mestolo alla volta, mescolando spesso.", duration: 15, tip: "Aggiungi il brodo solo quando il precedente è stato quasi completamente assorbito." },
    { step: 6, instruction: "Quando il riso è al dente, togli dal fuoco. Aggiungi il burro rimasto e il parmigiano grattugiato. Mescola energicamente per mantecare.", duration: 2, tip: "La mantecatura va fatta a fuoco spento per una crema perfetta." },
    { step: 7, instruction: "Imposta il risotto nei piatti e lascia riposare 1 minuto prima di servire. Decora con una fogliolina di prezzemolo.", duration: 1 },
  ],
  chefNotes: "Per un risotto ancora più ricco, aggiungi un filo di tartufo a crudo. Se vuoi una versione vegana, sostituisci burro e parmigiano con olio EVO e lievito alimentare.",
};

const RecipeDetail = ({ mealName, onClose }: RecipeDetailProps) => {
  const [recipe, setRecipe] = useState<RecipeData>(fallbackRecipe);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [chefMode, setChefMode] = useState(false);
  const [servings, setServings] = useState(2);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerTarget, setTimerTarget] = useState(0);

  // Load recipe from AI
  useEffect(() => {
    const loadRecipe = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-recipe", {
          body: { mealName, servings: 2 },
        });
        if (error) throw error;
        if (data && data.title) {
          setRecipe(data);
        }
      } catch (e) {
        console.error("Failed to load recipe, using fallback:", e);
        setRecipe({ ...fallbackRecipe, title: mealName });
      } finally {
        setIsLoading(false);
      }
    };
    loadRecipe();
  }, [mealName]);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && timerSeconds < timerTarget) {
      interval = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    } else if (timerSeconds >= timerTarget && timerTarget > 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, timerTarget]);

  const startTimer = (minutes: number) => {
    setTimerTarget(minutes * 60);
    setTimerSeconds(0);
    setTimerActive(true);
  };

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  };

  const progress = (completedSteps.size / recipe.steps.length) * 100;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const scaleQty = (qty: string) => {
    const match = qty.match(/(\d+)/);
    if (!match) return qty;
    const num = parseInt(match[1]);
    const scaled = Math.round((num * servings) / recipe.servings);
    return qty.replace(match[1], String(scaled));
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 mt-4 animate-fade-in">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-sm font-medium text-accent">L'AI sta creando la ricetta interattiva…</p>
        </div>
      </div>
    );
  }

  const step = recipe.steps[currentStep];

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6 mt-4 animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0 text-muted-foreground">✕</Button>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <button onClick={() => setServings(Math.max(1, servings - 1))} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">−</button>
          <span className="text-sm font-semibold text-foreground min-w-[1.5rem] text-center">{servings}</span>
          <button onClick={() => setServings(servings + 1)} className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">+</button>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <ChefHat className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Chef Mode</span>
          <Switch checked={chefMode} onCheckedChange={setChefMode} className="scale-75" />
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {recipe.totalTime} min
        </div>
      </div>

      {/* Variant buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: Users, label: "Più persone", action: () => setServings(servings + 2) },
          { icon: Zap, label: "Versione veloce", action: () => {} },
          { icon: Heart, label: "Più healthy", action: () => {} },
        ].map((v) => (
          <button
            key={v.label}
            onClick={v.action}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <v.icon className="h-3.5 w-3.5" />
            {v.label}
          </button>
        ))}
      </div>

      {/* Ingredients */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ingredienti</h4>
        <div className="grid gap-1 sm:grid-cols-2">
          {recipe.ingredients.map((ing) => (
            <div key={ing.name} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-secondary/30 transition-colors">
              <span className="text-foreground">{ing.name}</span>
              <div className="text-right">
                <span className="text-muted-foreground">{scaleQty(ing.quantity)}</span>
                {chefMode && ing.alternatives && (
                  <p className="text-xs text-primary mt-0.5">Alt: {ing.alternatives[0]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Progresso</span>
          <span className="text-xs text-muted-foreground">{completedSteps.size}/{recipe.steps.length} step</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step-by-step */}
      <div className="rounded-xl border border-border/60 bg-secondary/20 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Step {step.step} di {recipe.steps.length}</span>
          {step.duration && (
            <button
              onClick={() => startTimer(step.duration!)}
              className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
            >
              <Timer className="h-3.5 w-3.5" />
              {step.duration} min
            </button>
          )}
        </div>

        <p className="text-sm text-foreground leading-relaxed">{step.instruction}</p>

        {chefMode && step.tip && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5">
            <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/80 leading-relaxed">{step.tip}</p>
          </div>
        )}

        {/* Timer display */}
        {timerActive && (
          <div className="mt-3 flex items-center gap-3 rounded-lg bg-accent/5 border border-accent/20 px-4 py-3">
            <Timer className="h-5 w-5 text-accent" />
            <span className="text-lg font-mono font-bold text-accent">{formatTime(timerTarget - timerSeconds)}</span>
            <div className="flex gap-1 ml-auto">
              <button onClick={() => setTimerActive(!timerActive)} className="p-1.5 rounded-full hover:bg-accent/10 text-accent transition-colors">
                {timerActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button onClick={() => { setTimerActive(false); setTimerSeconds(0); }} className="p-1.5 rounded-full hover:bg-accent/10 text-accent transition-colors">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step navigation */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="gap-1 text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Precedente
          </Button>

          <button
            onClick={() => toggleStep(currentStep)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              completedSteps.has(currentStep)
                ? "bg-primary/10 text-primary border border-primary/20"
                : "border border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            {completedSteps.has(currentStep) ? "Completato" : "Segna completato"}
          </button>

          <Button
            variant="ghost"
            size="sm"
            disabled={currentStep === recipe.steps.length - 1}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="gap-1 text-muted-foreground"
          >
            Prossimo <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chef notes */}
      {chefMode && recipe.chefNotes && (
        <div className="rounded-xl bg-secondary/30 border border-border/40 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            Note dello Chef AI
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{recipe.chefNotes}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
