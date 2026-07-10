## Ristrutturazione completa del Pitch PlanEat

Trasformo `/pitch` da deck statico a presentazione cinematografica in stile Apple Keynote / Linear / Stripe, con animazioni step-by-step guidate da tastiera, glassmorphism, e il logo PlanEat come protagonista narrativo.

### Architettura tecnica

**Nuovo modello di navigazione a "step" dentro le slide**
Attualmente `Pitch.tsx` avanza slide-per-slide. Introduco un sistema a due livelli:
- **Freccia destra / Spazio**: avanza al prossimo step della slide corrente. Se è l'ultimo step, passa alla slide successiva.
- **Freccia sinistra**: torna allo step precedente (o alla slide precedente al suo ultimo step).
- Ogni slide dichiara `totalSteps` e riceve `step` come prop.
- Indicatore visivo: i puntini di progresso mostrano step interni per la slide attiva.

**Nuove primitive condivise** (`src/components/pitch/`)
- `GlassCard.tsx`: card Apple-glass (backdrop-blur, bordo bianco 1px, gradient interno, shadow multilivello, riflesso superiore via `::before`).
- `StepReveal.tsx`: wrapper che rivela figli in base allo step corrente con fade+rise+blur (400-700ms, easing morbido).
- `LogoMark.tsx`: logo PlanEat con glow + scale 95→100 + blur-in, container glass opzionale.
- `useSlideSteps(total)`: hook per gestire step interno (consumato da `Pitch.tsx` via context).
- Aggiornamento `SlideShell.tsx`: rimuovo l'eyebrow rigido, aggiungo varianti background (gradient sabbia, dark glass, mesh).

**Motion**
Uso `framer-motion` (già disponibile in progetto) per animazioni fluide, transizioni tra step, orbit/rotation, e path animations. Easing standard: `[0.22, 1, 0.36, 1]`, durate 400-700ms.

### Ridisegno delle 17 slide

Ogni slide ha identità visiva propria. Riassunto:

1. **Hero** — 5 step: "365 VOLTE" gigante rise → "La stessa domanda" → zoom su "COSA MANGIO QUESTA SERA?" → glass card centrale con logo PlanEat (glow + scale) + tagline soluzione → payoff "Meno decisioni. Meno sprechi. Più semplicità."
2. **Validazione** — "227" gigante sfondo opacità 5%. Ruota centrale con 3 insight che ruotano a ogni step; step finale: messaggio "Le persone non cercano più strumenti. Cercano semplicità."
3. **Problema** — Timeline verticale/orizzontale della giornata (08:00 → 20:00), 4 domande che appaiono una per step, poi tag "Decine di micro-decisioni. Ogni giorno."
4. **Why Now** — 4 blocchi grandi (AI, Digital Grocery, Food Waste, Simplicità). Ogni step illumina un blocco; step finale disegna linee SVG animate tra i 4 e mostra il messaggio.
5. **Mercato** — Mappa Italia SVG con hotspot pulsanti su 6 città. Livelli progressivi TAM/SAM/SOM in glass card laterali, con **dati verificati dal Business Plan** (correggo le proporzioni errate). Messaggio finale su mercato urbano scalabile.
6. **Food Decision Ecosystem** (slide chiave) — 7 chip sparsi (Ricette, Dispensa, Lista Spesa, Offerte, Meal Planning, AI, Mood) posizionati con framer-motion. Step successivi: convergono al centro → entrano dentro una grande sfera glass → appare logo PlanEat centrale → messaggio "Un ecosistema. Un solo flusso decisionale."
7. **Product Experience** — Mockup iPhone grande centrale (placeholder area video 9:19). Tre keyword laterali (Mood, Plan, Shop) che si illuminano una per step.
8. **Mood Planning** — "Come ti senti oggi?" → 5 sfere animate (colori palette PlanEat) → convergono → visual AI (particles/gradient) che genera un mini piano → messaggio "La prima pianificazione alimentare guidata dalle emozioni."
9. **White Space** — Matrice 2×2 (Personalizzazione × Integrazione). Competitor appaiono nei quadranti bassi → quadrante alto-destra si illumina → logo PlanEat compare enfatizzato (più grande, glow) → testo gigante "WHITE SPACE".
10. **Perché Vinciamo** — 6 card capability disposte a cerchio. Ogni step attiva una card (glow + check). Step finale: convergono verso logo PlanEat al centro. Correggo dati: aggiungo check su Gestione Dispensa anche per competitor.
11. **Business Model** — Timeline verticale monetizzazione: OGGI Freemium → Premium 3,99€/mese → ANNO 2 Advertising contestuale → ANNO 3 Nutrizionisti/Consulenze. Glass card per fase. Rimosso Marketplace e enfasi retail.
12. **Data Flywheel** — Vera ruota SVG rotante (Utenti → Dati → AI → Personalizzazione → Retention). Ogni step la fa ruotare di 72°. Centro = logo PlanEat con glow.
13. **Roadmap** — 5 milestone (MVP → Validation → Launch → Partnerships → Ecosystem). Fase attiva grande al centro con descrizione; fasi passate rimangono sullo sfondo rimpicciolite come pallini completati.
14. **Financial Highlights** — 4 step, ciascuno con grafico grande al centro (Recharts LineChart / AreaChart): Utenti, Utenti Premium, Ricavi, Break-even. Dati dal Business Plan.
15. **Team** — Card glass più grandi con placeholder foto, nome, ruolo (CEO, CTO, CMO, CFO, COO, + 2), responsabilità in 1 riga.
16. **Vision** — "App di Meal Planning" piccolo → zoom out → "FOOD DECISION OPERATING SYSTEM" gigante → logo PlanEat centrale con 5 elementi in orbita SVG (Retail, Nutrizione, AI, Wellness, Personalizzazione) → messaggio finale.
17. **Chiusura** — "Le persone non hanno bisogno di più ricette." → pausa → "Hanno bisogno di meno decisioni." → logo PlanEat grande al centro con glow → sottotitolo "Food Decision Ecosystem" → fade.

### Presenza del logo

`LogoMark` viene usato in Hero (step 4), Ecosystem (step 5), White Space (step finale), Perché Vinciamo (step finale), Flywheel (centro ruota), Vision (centro orbita), Chiusura (step finale). Sempre con: glow morbido palette-coerente, scale 95→100, blur-in, opzionale glass container.

### File toccati

- `src/pages/Pitch.tsx` — nuovo modello step+slide, progress indicator a due livelli, transizioni tra slide più cinematografiche.
- `src/components/pitch/index.ts` — export nuove slide.
- `src/components/pitch/SlideShell.tsx` — varianti background.
- **Nuovi**: `GlassCard.tsx`, `StepReveal.tsx`, `LogoMark.tsx`, `useStepContext.tsx`.
- **Riscritti**: tutti gli `Slide01Hero.tsx` … `Slide17Closing.tsx`.

### Cosa NON tocco

- Palette, tipografia, tokens design system, componenti UI condivisi, branding, altre pagine del sito.
- `Header.tsx` (link Pitch già presente).
- Backend, engine, dati profilo.

### Note

- Verifico i dati mercato/finanziari contro il Business Plan corrente in repo (`.lovable/plan.md` e memorie) prima di scrivere i numeri.
- Nessuna dipendenza nuova: framer-motion e recharts sono già nel progetto.
