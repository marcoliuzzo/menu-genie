import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { fallbackMealPlan } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Generating = () => {
  const navigate = useNavigate();
  const { profile, setMealPlan } = useProfile();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const RECENT_KEY = "planeat:recentRecipes";
    const MAX_RECENT = 42; // ~3 settimane × 14 ricette

    const loadRecent = (): string[] => {
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
      } catch {
        return [];
      }
    };

    const saveRecent = (mealPlan: any) => {
      try {
        const newNames: string[] = [];
        if (Array.isArray(mealPlan?.weeklyMenu)) {
          for (const day of mealPlan.weeklyMenu) {
            if (day?.lunch?.name) newNames.push(day.lunch.name);
            if (day?.dinner?.name) newNames.push(day.dinner.name);
          }
        }
        const merged = [...newNames, ...loadRecent()];
        const seen = new Set<string>();
        const dedup = merged.filter((n) => {
          const k = n.trim().toLowerCase();
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
        localStorage.setItem(RECENT_KEY, JSON.stringify(dedup.slice(0, MAX_RECENT)));
      } catch (e) {
        console.warn("Could not persist recent recipes", e);
      }
    };

    const generate = async () => {
      try {
        const recentRecipes = loadRecent();
        const enrichedProfile = { ...profile, recentRecipes };

        const { data, error } = await supabase.functions.invoke(
          "generate-meal-plan",
          { body: { profile: enrichedProfile } }
        );

        if (error) {
          console.error("Edge function error:", error);
          toast({
            title: "Stiamo usando un menu di esempio",
            description: "Non siamo riusciti a generare il piano AI. Ecco un menu di esempio!",
            variant: "destructive",
          });
          setMealPlan(fallbackMealPlan);
        } else if (data?.error) {
          console.error("AI error:", data.error);
          toast({
            title: "Menu di esempio",
            description: data.error,
            variant: "destructive",
          });
          setMealPlan(fallbackMealPlan);
        } else {
          if (data?._warnings?.length) {
            console.warn("[PlanEat] Validazione piano:", data._warnings);
          }
          saveRecent(data);
          setMealPlan(data);
        }
      } catch (err) {
        console.error("Network error:", err);
        setMealPlan(fallbackMealPlan);
      }

      navigate("/risultati");
    };

    generate();
  }, [profile, navigate, setMealPlan]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 animate-pulse-soft">
          <Sparkles className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
          PlanEat sta creando il tuo piano…
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Analizziamo il tuo mood, energia e preferenze per il menu perfetto.
        </p>
        <div className="mt-10 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generating;
