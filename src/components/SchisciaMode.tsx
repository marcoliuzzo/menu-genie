import { useState } from "react";
import { Repeat, Sparkles, Clock, ChefHat } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface SchisciaModeProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const SchisciaMode = ({ enabled, onToggle }: SchisciaModeProps) => {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${enabled ? "bg-primary/10" : "bg-secondary"}`}>
            <Repeat className={`h-5 w-5 ${enabled ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Schiscia Mode</p>
            <p className="text-xs text-muted-foreground">Ottimizza tempo: cena doppia → pranzo del giorno dopo</p>
          </div>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>

      {enabled && (
        <div className="mt-3 space-y-2 animate-fade-in">
          <div className="flex items-start gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2.5">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/80">
              L'AI pianificherà porzioni doppie a cena e preparerà il pranzo del giorno dopo come riutilizzo intelligente.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />~40% tempo risparmiato</span>
            <span className="flex items-center gap-1"><ChefHat className="h-3 w-3" />Meno stress</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const SchisciaBadge = () => (
  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20 gap-0.5">
    <Repeat className="h-2.5 w-2.5" />
    Schiscia pronta
  </Badge>
);

export const DoublePrepBadge = () => (
  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent border-accent/20 gap-0.5">
    <ChefHat className="h-2.5 w-2.5" />
    Preparazione doppia
  </Badge>
);

export default SchisciaMode;
