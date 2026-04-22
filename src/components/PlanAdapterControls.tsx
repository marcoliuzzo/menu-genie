import { Zap, Salad, Soup, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdaptMode } from "@/lib/planAdapter";

interface Props {
  onAdapt: (mode: AdaptMode) => void;
  active?: AdaptMode | null;
  disabled?: boolean;
}

const actions: { mode: AdaptMode; label: string; icon: typeof Zap; hint: string }[] = [
  { mode: "faster", label: "Più veloce", icon: Zap, hint: "Ricette in pochi minuti" },
  { mode: "lighter", label: "Più leggero", icon: Salad, hint: "Verdure e proteine magre" },
  { mode: "comfort", label: "Più comfort", icon: Soup, hint: "Piatti ricchi e avvolgenti" },
  { mode: "cheaper", label: "Più economico", icon: Wallet, hint: "Ingredienti low-cost" },
];

const PlanAdapterControls = ({ onAdapt, active, disabled }: Props) => {
  return (
    <div className="mb-6 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Adatta il piano in un click
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Tocca un'opzione: aggiorniamo tutto noi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {actions.map(({ mode, label, icon: Icon, hint }) => {
          const isActive = active === mode;
          return (
            <Button
              key={mode}
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => onAdapt(mode)}
              className={[
                "group flex h-auto flex-col items-start gap-1 rounded-xl border-border/60 bg-background/60 px-3 py-2.5 text-left transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5 hover:shadow-md",
                isActive ? "border-accent/60 bg-accent/10 shadow-sm" : "",
              ].join(" ")}
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Icon className="h-3.5 w-3.5 text-accent transition-transform duration-200 group-hover:scale-110" />
                {label}
              </span>
              <span className="text-[10.5px] font-normal leading-tight text-muted-foreground">
                {hint}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PlanAdapterControls;
