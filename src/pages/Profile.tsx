import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useProfile } from "@/context/ProfileContext";
import DietUpload from "@/components/DietUpload";
import {
  dietOptions,
  allergyOptions,
  goalOptions,
  cookingTimeOptions,
  moodOptions,
  equipmentOptions,
} from "@/data/mockData";

const TOTAL_STEPS = 8;

const Profile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const [step, setStep] = useState(1);
  const [pantryInput, setPantryInput] = useState("");

  const progress = (step / TOTAL_STEPS) * 100;

  const next = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else navigate("/generazione");
  };

  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const addPantryItem = () => {
    const item = pantryInput.trim();
    if (item && !profile.pantry.includes(item)) {
      updateProfile({ pantry: [...profile.pantry, item] });
    }
    setPantryInput("");
  };

  const removePantryItem = (item: string) => {
    updateProfile({ pantry: profile.pantry.filter((p) => p !== item) });
  };

  const toggleAllergy = (allergy: string) => {
    const has = profile.allergies.includes(allergy);
    updateProfile({
      allergies: has
        ? profile.allergies.filter((a) => a !== allergy)
        : [...profile.allergies, allergy],
    });
  };

  const toggleGoal = (goal: string) => {
    const has = profile.goals.includes(goal);
    updateProfile({
      goals: has ? profile.goals.filter((g) => g !== goal) : [...profile.goals, goal],
    });
  };

  const toggleEquipment = (eq: string) => {
    const has = profile.equipment.includes(eq);
    updateProfile({
      equipment: has
        ? profile.equipment.filter((e) => e !== eq)
        : [...profile.equipment, eq],
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!profile.diet;
      case 2: return true;
      case 3: return true;
      case 4: return profile.goals.length > 0;
      case 5: return true;
      case 6: return !!profile.mood;
      case 7: return profile.equipment.length > 0;
      case 8: return true;
      default: return false;
    }
  };

  const energyLabel = (val: number) => {
    if (val <= 3) return "Molto stanco 😴";
    if (val <= 5) return "Poca energia 😐";
    if (val <= 7) return "In forma 🙂";
    return "Carico! 💪";
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg">
          {/* Progress */}
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Passo {step} di {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="mb-8 h-2" />

          {/* Step 1: Dieta */}
          {step === 1 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Che tipo di alimentazione segui?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Scegli quella più vicina alle tue abitudini. Potrai cambiarla in qualsiasi momento.</p>
              <div className="grid gap-3">
                {dietOptions.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => updateProfile({ diet: d.value })}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      profile.diet === d.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-medium text-foreground">{d.label}</div>
                    <div className="text-sm text-muted-foreground">{d.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Dieta specifica */}
          {step === 2 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Hai un piano alimentare?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Se hai una dieta dal nutrizionista, l'AI la integrerà nella pianificazione.</p>
              <DietUpload />
            </div>
          )}

          {/* Step 3: Allergie */}
          {step === 3 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Hai allergie o intolleranze?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Seleziona tutto ciò che vuoi evitare. Nessuna selezione? Nessun problema, vai avanti!</p>
              <div className="flex flex-wrap gap-3">
                {allergyOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAllergy(a)}
                    className={`rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-all ${
                      profile.allergies.includes(a)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/40"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Obiettivi */}
          {step === 4 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Quali sono i tuoi obiettivi?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Puoi selezionarne più di uno. Ci aiuterai a creare un piano perfetto per te.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {goalOptions.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => toggleGoal(g.value)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      profile.goals.includes(g.value)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-medium text-foreground">{g.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Budget e tempo */}
          {step === 5 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Budget e tempo</h2>
              <p className="mb-8 text-sm text-muted-foreground">Non preoccuparti della precisione, serve solo come riferimento.</p>

              <div className="mb-10">
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Budget settimanale: <span className="text-primary font-semibold">{profile.budget}€</span>
                </label>
                <Slider
                  value={[profile.budget]}
                  onValueChange={([v]) => updateProfile({ budget: v })}
                  min={20}
                  max={150}
                  step={5}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>20€</span>
                  <span>150€</span>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Quanto tempo hai per cucinare?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {cookingTimeOptions.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => updateProfile({ cookingTime: t.value })}
                      className={`rounded-xl border-2 p-3 text-center transition-all ${
                        profile.cookingTime === t.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="font-semibold text-foreground">{t.label}</div>
                      <div className="text-xs text-muted-foreground">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Mood & Energia */}
          {step === 6 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Come ti senti questa settimana?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Il tuo mood influenza le ricette che sceglieremo per te. Niente è giusto o sbagliato!</p>

              <div className="grid gap-3 sm:grid-cols-2 mb-10">
                {moodOptions.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => updateProfile({ mood: m.value })}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      profile.mood === m.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-medium text-foreground">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Livello di energia: <span className="text-primary font-semibold">{profile.energy}/10 — {energyLabel(profile.energy)}</span>
                </label>
                <Slider
                  value={[profile.energy]}
                  onValueChange={([v]) => updateProfile({ energy: v })}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>1 — Esausto</span>
                  <span>10 — Super carico</span>
                </div>
                {profile.energy < 5 && (
                  <p className="mt-3 text-xs text-primary italic">
                    💡 Ti proporremo ricette rapide e facili, perfette per le giornate no.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Attrezzatura */}
          {step === 7 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Che attrezzatura hai?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Così proporremo solo ricette che puoi preparare davvero.</p>
              <div className="grid grid-cols-2 gap-3">
                {equipmentOptions.map((eq) => (
                  <button
                    key={eq.value}
                    onClick={() => toggleEquipment(eq.value)}
                    className={`rounded-xl border-2 p-4 text-center transition-all ${
                      profile.equipment.includes(eq.value)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-medium text-foreground">{eq.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Dispensa */}
          {step === 8 && (
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Cosa hai già in dispensa?</h2>
              <p className="mb-6 text-sm text-muted-foreground">Così evitiamo di farti comprare quello che hai già. Scrivi e premi Invio.</p>
              <div className="flex gap-2 mb-4">
                <Input
                  value={pantryInput}
                  onChange={(e) => setPantryInput(e.target.value)}
                  placeholder="Es. pasta, olio, riso..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPantryItem())}
                />
                <Button variant="outline" onClick={addPantryItem} type="button">
                  Aggiungi
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.pantry.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="gap-1 pl-3 pr-1.5 py-1.5 text-sm cursor-pointer"
                    onClick={() => removePantryItem(item)}
                  >
                    {item}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
              {profile.pantry.length === 0 && (
                <p className="mt-4 text-sm text-muted-foreground/60 italic">
                  Nessun problema se non aggiungi nulla, pensiamo a tutto noi!
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prev}
              disabled={step === 1}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Indietro
            </Button>
            <Button
              onClick={next}
              disabled={!canProceed()}
              className="gap-1 rounded-full px-6"
            >
              {step === TOTAL_STEPS ? "Genera il menu" : "Avanti"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
