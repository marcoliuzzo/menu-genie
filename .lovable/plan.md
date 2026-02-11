

# 🥗 Spesa Intelligente — MVP Web App

## Panoramica
Un sito web MVP per una startup food-tech che aiuta gli utenti a pianificare pasti, creare liste della spesa e gestire il budget settimanale. Design pulito, tono amichevole, esperienza guidata step-by-step.

---

## Design System

- **Palette**: verde salvia (#6B8F71), beige chiaro (#F5F1EB), verde oliva (#4F6F52), grigio antracite (#2E2E2E), bianco caldo
- **Stile**: card arrotondate, ombre leggere, icone minimal Lucide, ampio spazio bianco
- **Font**: Inter (sans-serif moderno e leggibile)
- **Tono**: italiano naturale, "tu", frasi brevi, micro-copy rassicurante

---

## Pagine & Funzionalità

### 1. Homepage
- Hero section con headline "La spesa intelligente che pensa per te"
- Sottotitolo e CTA principale "Crea il tuo menu"
- 3 benefit con icone (Meno decisioni, Meno sprechi, Più tempo per te)
- Sezione "Come funziona" in 3 step visivi
- Footer con messaggio rassicurante e link About/Contatti

### 2. Profilo Alimentare (Form Guidato)
- Wizard multi-step con barra di avanzamento
- **Step 1**: Tipo di dieta (onnivoro, vegetariano, vegano, ecc.)
- **Step 2**: Allergie e intolleranze (selezione multipla)
- **Step 3**: Obiettivi personali (salute, risparmio, sostenibilità)
- **Step 4**: Budget settimanale (slider) e tempo medio per cucinare
- **Step 5**: Cosa hai già in dispensa (input libero con tag)
- Micro-copy motivazionale sotto ogni campo
- Dati salvati in stato locale (pronti per futuro backend)

### 3. Generazione Menu (Schermata di Attesa)
- Animazione di loading soft e delicata
- Messaggio: "Stiamo creando il tuo menu ideale…"
- Simulazione di attesa (2-3 secondi) prima di mostrare i risultati
- Predisposto per futura integrazione con API AI

### 4. Risultati — Menu Settimanale
- Vista settimanale chiara (7 giorni, pranzo e cena)
- Ogni ricetta mostra: nome, tempo di preparazione, livello di semplicità
- **Lista della spesa aggregata** con ingredienti raggruppati per categoria
- Ingredienti già in dispensa evidenziati (barrati o con badge)
- **Stima budget** con barra visiva rispetto al budget impostato
- CTA: "Modifica preferenze", "Rigenera menu", "Salva lista"
- Dati menu generati con dati mock realistici in italiano

### 5. Footer (globale)
- Messaggio: "Mangiare bene non deve essere complicato"
- Link: About, Contatti
- Branding minimale

---

## Navigazione
- Header semplice con logo e navigazione minimale
- Flusso lineare: Homepage → Profilo → Loading → Risultati
- Possibilità di tornare indietro e modificare preferenze

## Note Tecniche
- Nessun backend per ora — dati mock realistici e stato locale
- Struttura predisposta per futura integrazione con AI (API) e database (Supabase)
- Responsive: ottimizzato per mobile e desktop
- Tutte le pagine con testi già scritti in italiano

