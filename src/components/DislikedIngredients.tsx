import { useState, useMemo } from "react";
import { X, Search, Ban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/context/ProfileContext";
import { ingredientDatabase } from "@/lib/dietaryConstraints";

const categories: { label: string; emoji: string; filter: string[] }[] = [
  { label: "Verdure", emoji: "🥦", filter: ["vegetables"] },
  { label: "Pesce", emoji: "🐟", filter: ["fish", "seafood"] },
  { label: "Carne", emoji: "🥩", filter: ["animal_protein"] },
  { label: "Latticini", emoji: "🧀", filter: ["dairy"] },
  { label: "Cereali", emoji: "🌾", filter: ["grains"] },
  { label: "Frutta secca", emoji: "🥜", filter: ["nuts"] },
];

const DislikedIngredients = () => {
  const { profile, updateProfile } = useProfile();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const disliked = profile.dislikedIngredients || [];

  const suggestions = useMemo(() => {
    let pool = ingredientDatabase.filter(
      (ing) => !disliked.includes(ing.name)
    );
    if (activeCategory) {
      const cat = categories.find((c) => c.label === activeCategory);
      if (cat) pool = pool.filter((ing) => cat.filter.includes(ing.category));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      pool = pool.filter((ing) => ing.name.toLowerCase().includes(q));
    }
    return pool.slice(0, 12);
  }, [search, activeCategory, disliked]);

  const addDislike = (name: string) => {
    if (!disliked.includes(name)) {
      updateProfile({ dislikedIngredients: [...disliked, name] });
    }
    setSearch("");
  };

  const removeDislike = (name: string) => {
    updateProfile({
      dislikedIngredients: disliked.filter((d) => d !== name),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Ban className="h-5 w-5 text-destructive" />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Cibi che vuoi evitare
          </h3>
          <p className="text-xs text-muted-foreground">
            L'AI eviterà questi ingredienti nelle ricette
          </p>
        </div>
      </div>

      {/* Selected chips */}
      {disliked.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {disliked.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
            >
              {item}
              <button
                onClick={() => removeDislike(item)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-destructive/20 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Category shortcuts */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() =>
              setActiveCategory(
                activeCategory === cat.label ? null : cat.label
              )
            }
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
              activeCategory === cat.label
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-muted-foreground/30"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca ingrediente..."
          className="pl-9 rounded-xl"
        />
      </div>

      {/* Suggestions */}
      {(search.trim() || activeCategory) && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((ing) => (
            <button
              key={ing.name}
              onClick={() => addDislike(ing.name)}
              className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
            >
              + {ing.name}
            </button>
          ))}
        </div>
      )}

      {disliked.length > 0 && (
        <p className="text-[10px] text-muted-foreground italic">
          ✨ Le ricette saranno adattate alle tue preferenze alimentari
        </p>
      )}
    </div>
  );
};

export default DislikedIngredients;
