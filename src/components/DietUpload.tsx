import { useState } from "react";
import { Upload, FileText, X, Loader2, Check, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface DietUploadProps {
  onDietActive?: (active: boolean) => void;
}

const DietUpload = ({ onDietActive }: DietUploadProps) => {
  const [hasDiet, setHasDiet] = useState<"no" | "si" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dietActive, setDietActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "application/pdf") {
      setFile(f);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDietActive(true);
      onDietActive?.(true);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Segui una dieta specifica?</h3>
      <p className="text-xs text-muted-foreground">Se hai un piano dal nutrizionista, l'AI lo integrerà nella pianificazione.</p>

      <div className="flex gap-2">
        {(["no", "si"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => { setHasDiet(opt); if (opt === "no") { setDietActive(false); onDietActive?.(false); } }}
            className={`flex-1 rounded-xl border-2 py-3 text-sm font-medium transition-all ${
              hasDiet === opt
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {opt === "no" ? "No" : "Sì, carica piano"}
          </button>
        ))}
      </div>

      {hasDiet === "si" && !dietActive && (
        <div className="space-y-4 animate-fade-in">
          {/* Upload area */}
          <div
            className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all ${
              file ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30"
            }`}
          >
            {file ? (
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={() => setFile(null)} className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Trascina qui il PDF o clicca per selezionare</p>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 cursor-pointer opacity-0" />
              </>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block">Note del nutrizionista (opzionale)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Es. evitare latticini la sera, massimo 1800 kcal/giorno..."
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Durata della dieta
            </label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Es. 4 settimane, fino a marzo..."
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className="w-full rounded-full gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                L'AI sta analizzando il piano…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analizza e attiva dieta
              </>
            )}
          </Button>
        </div>
      )}

      {/* Diet active state */}
      {dietActive && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Dieta attiva</p>
              <p className="text-xs text-muted-foreground">Il piano del nutrizionista ha priorità nella generazione.</p>
              {duration && <p className="text-xs text-primary mt-0.5">Durata: {duration}</p>}
            </div>
            <button
              onClick={() => { setDietActive(false); setHasDiet(null); setFile(null); onDietActive?.(false); }}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Rimuovi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietUpload;
