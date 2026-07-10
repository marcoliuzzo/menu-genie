# Pagina Pitch — Presentazione a slide

Nuova route `/pitch` isolata dal resto del sito: presentazione professionale a 16 slide navigabile da tastiera/telecomando, riutilizzando design system, colori, tipografia e componenti già presenti in PlanEat. Nessuna modifica alle pagine esistenti.

## Struttura file

- `src/pages/Pitch.tsx` — contenitore deck (state slide corrente, listener tastiera, transizioni, contatore).
- `src/components/pitch/SlideShell.tsx` — wrapper riusabile: `h-screen w-screen`, `overflow-hidden`, flex center, padding coerente, opzionale `eyebrow`/numero slide, footer minimale con logo PlanEat + progress dots.
- `src/components/pitch/slides/Slide01Hero.tsx` … `Slide16Closing.tsx` — una per file, ciascuna un'unica schermata autonoma.
- `src/components/pitch/index.ts` — array ordinato dei 16 componenti slide (ordine fisso, facile aggiungere/riordinare).
- Registrazione route in `src/App.tsx`: `<Route path="/pitch" element={<Pitch />} />`. Nessun link in Header/Footer (accesso diretto via URL, come richiesto per non alterare il resto).

## Navigazione

Dentro `Pitch.tsx`:
- `useState<number>` per indice slide corrente (0-based).
- `useEffect` con `keydown` su `window`:
  - `ArrowRight`, `Space`, `PageDown` → next
  - `ArrowLeft`, `PageUp` → prev
  - `Home` → prima, `End` → ultima
  - `preventDefault` su Space per evitare scroll.
- Nessuno scroll verticale: `<html>`/`<body>` restano invariati, ma la pagina usa `h-screen overflow-hidden` a livello contenitore.
- Transizione fluida tra slide: contenitore `relative`, ogni slide `absolute inset-0` con `transition-opacity duration-500` + leggero `translate-x` (fade + slide sottile). Nessuna libreria esterna.
- Progress: dots discreti in basso + `Slide N / 16` in basso a destra, entrambi con stile chrome esistente (`text-muted-foreground`, `text-xs`).
- Click sui dots → salto diretto (utile in prova live).

## Stile visivo

- Riuso totale: `bg-background`, `text-foreground`, `gradient-primary-text`, `text-accent`, `text-primary`, card `rounded-2xl border border-border/60 bg-card`, spacing `container mx-auto px-4`, font Inter già configurato.
- Titoli grandi con `text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-tight leading-[1.05]` — coerente con hero Index.
- Logo PlanEat: stesso asset usato in `Header.tsx`/`Footer.tsx`.
- Ogni slide: un solo messaggio principale, ampio whitespace, gerarchia forte (eyebrow uppercase piccolo → titolo enorme → contenuto).

## Contenuto delle 16 slide

Testi esattamente come da brief. Layout per slide:

1. **Hero** — logo centrato in alto, titolo enorme su due righe con grande gap, sottotitolo virgolettato in `text-muted-foreground`.
2. **Problema** — titolo + 4 card in griglia (Ricette / Lista / Dispensa / Offerte) con icone Lucide (`ChefHat`, `ShoppingCart`, `Package`, `Tag`), visivamente sconnesse (bordi tratteggiati o gap ampio) per suggerire frammentazione.
3. **Validazione** — numero `227` gigante gradient-primary, sottotitolo, 3 card insight, citazione in basso in stile pull-quote.
4. **Mercato** — titolo + 3 cerchi concentrici placeholder (TAM/SAM/SOM) con label e importo placeholder.
5. **Soluzione** — titolo + flow verticale/orizzontale a 5 step con frecce (Mood → Meal → Dispensa → Lista → Ricette) usando card compatte + `ArrowRight`.
6. **Product experience** — cornice smartphone placeholder (div con `rounded-[2.5rem] border-8` + gradient interno) a sinistra, 4 step flow a destra.
7. **Mood Planning** — titolo + 4 card mood con emoji/icone (`Sparkles`, `Heart`, `Zap`, `Users`).
8. **Vantaggio competitivo** — matrice 2×2: assi Personalizzazione (Y) × Integrazione (X), PlanEat dot accent in alto a destra, competitor placeholder dot muted.
9. **Business Model** — 5 blocchi (Free → Premium → Partnership → Advertising → Marketplace) come flow.
10. **Go to Market** — timeline orizzontale con 3 tappe (Anno 1/2/3).
11. **Customer Acquisition** — funnel a 4 stadi (trapezio composto da 4 div che si restringono) + 4 badge canali sopra.
12. **Growth Engine** — 5 nodi disposti a cerchio con frecce curve (SVG) o layout circolare CSS che rappresenta il flywheel.
13. **Financial Highlights** — 4 card KPI placeholder (grafico sparkline SVG statico) per Utenti / Premium / Ricavi / EBITDA.
14. **Roadmap** — timeline orizzontale con 3 milestone 2026/2027/2028.
15. **Team** — griglia 7 card founder (avatar circolare placeholder, nome placeholder, ruolo, competenze come tag).
16. **Chiusura** — narrativa a 3 momenti (titolo grande → pausa "Una di queste è sempre…" → messaggio finale + logo), stesso stile visivo della hero per chiudere il cerchio.

## Estensibilità futura (preparata, non implementata ora)

- Ogni slide riceve prop `step: number` (default 0) che potrà pilotare la comparsa progressiva di elementi al click.
- Il controller `Pitch.tsx` è già predisposto per gestire un contatore di step interno per slide prima di avanzare: struttura pronta, ma per questa versione ogni freccia avanza direttamente di slide.
- Componenti slide isolati → facile sostituire placeholder con screenshot reali MVP, grafici dati, embed demo.

## Fuori scope (esplicito)

- Nessuna modifica a `Header`, `Footer`, `Index`, `Presentazione`, altre pagine, `index.css`, `tailwind.config.ts`, palette, componenti UI condivisi.
- Nessuna animazione avanzata (solo transizione fade+slide tra slide).
- Nessun link di navigazione verso `/pitch` aggiunto altrove.
