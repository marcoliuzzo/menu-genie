# Ristrutturazione Pitch PlanEat

Riscrivo le 16 slide esistenti e ne aggiungo 1 nuova (totale 17), riposizionando PlanEat come **Ecosistema Decisionale Alimentare AI**. Nessuna modifica a colori, tipografia, `SlideShell`, header, routing o altre pagine — solo contenuto e composizione delle slide.

## Struttura finale (17 slide)

| # | Slide | Note |
|---|---|---|
| 1 | Hero — "365 volte. La stessa decisione." | Riscritta |
| 2 | Il Problema — carico decisionale (6 pensieri) | Riscritta |
| 3 | Validazione — 227 intervistati, focus semplicità | Riscritta |
| 4 | **Perché ora?** — 4 driver di mercato | **NUOVA** |
| 5 | Opportunità di mercato — TAM/SAM/SOM snellito | Riscritta (era Slide04) |
| 6 | L'Ecosistema PlanEat — flusso 6 step | Riscritta (era Solution) |
| 7 | Esperienza prodotto — mockup + user journey | Aggiornata |
| 8 | Mood Planning — parte da come ti senti | Riscritta, più centrale |
| 9 | **Il vuoto di mercato** — matrice con competitor reali (Bring!, KitchenPal, Whisk, Mealia, Grocery AI) | **NUOVA** (sostituisce vecchia Competitive) |
| 10 | Perché vinciamo — tabella comparativa 6 feature | Riscritta |
| 11 | Business Model — Freemium → Marketplace | Aggiornata |
| 12 | **Data Flywheel** — loop utenti/dati/AI | **NUOVA** (sostituisce Growth) |
| 13 | Roadmap — 5 fasi (no date) | Riscritta |
| 14 | Financial Highlights — 4 KPI dal Business Plan | Aggiornata |
| 15 | Team — 7 founder per area (Strategia/Tech/Prodotto/Marketing/Ops) | Aggiornata |
| 16 | **Vision** — "Oltre il Meal Planning" | **NUOVA** |
| 17 | Chiusura — insight centrale finale | Riscritta |

Slide rimosse/assorbite: vecchia Slide10 GoToMarket e Slide11 Acquisition (fuse implicitamente nella narrativa; GTM copre solo la roadmap in questa versione investor-ready per non appesantire).

## File toccati

- `src/components/pitch/slides/Slide01Hero.tsx` → `Slide17.tsx` — riscritti con nuovi contenuti
- Nuovi file: `Slide04WhyNow.tsx`, `Slide09MarketGap.tsx`, `Slide12Flywheel.tsx`, `Slide16Vision.tsx`, `Slide17Closing.tsx`
- File eliminati: `Slide10GoToMarket.tsx`, `Slide11Acquisition.tsx`, vecchio `Slide16Closing.tsx` (sostituito da Slide17)
- `src/components/pitch/index.ts` — nuova lista ordinata di 17 slide

## Principi di design mantenuti

- `SlideShell` invariato (eyebrow + contenitore)
- Titoli grandi con `gradient-primary-text` sull'accento chiave
- Icone `lucide-react`, card `rounded-2xl border border-border/60 bg-card`
- Poche parole per slide, gerarchia forte, molto whitespace
- Data e insight dal Business Plan (227 intervistati, competitor reali, KPI freemium→premium)

## Fuori scope

- Animazioni progressive avanzate (reveal step-by-step, click-to-advance) → restano da aggiungere in una fase successiva come già concordato
- Screenshot reali dell'MVP → placeholder mockup mantenuto
- Dati finanziari reali → sparkline placeholder con label dal BP
