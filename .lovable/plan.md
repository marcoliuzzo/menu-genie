## Modifica Slide 14 Financial Highlights

### Obiettivo
Sostituire il grafico a barre "Utenti Premium" con un grafico coerente che mostri l'andamento dei **Costi Operativi** e **Costi Variabili** anno per anno.

### Dati da inserire
- **Costi Variabili**
  - Anno 1: 19.219,32 €
  - Anno 2: 52.833,14 €
  - Anno 3: 113.457,84 €
- **Costi Operativi**
  - Anno 1: 55.270,00 €
  - Anno 2: 129.306,00 €
  - Anno 3: 131.426,00 €

### Modifiche tecniche
- In `src/components/pitch/slides/Slide14Financials.tsx`:
  - Sostituire il dataset `premium` con un dataset contenente entrambe le serie (`costiVariabili`, `costiOperativi`).
  - Sostituire il `BarChart` con un grafico a linee o area doppia (`AreaChart` con due `Area`) per mantenere coerenza visiva con il grafico Ricavi.
  - Aggiornare titolo, tooltip, formatter e colori in linea con la palette PlanEat.
  - Mantenere invariati: KPI card, layout, grafico Ricavi, copy e StepReveal.

### File coinvolto
- `src/components/pitch/slides/Slide14Financials.tsx`

### Cosa NON cambia
- Struttura slide, titolo principale, KPI cards, grafico Ricavi, testo conclusivo, animazioni.