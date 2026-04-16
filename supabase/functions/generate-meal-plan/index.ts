import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Dietary constraint rules (server-side mirror) ──

const dietForbiddenKeywords: Record<string, string[]> = {
  vegano: [
    "carne","pollo","manzo","maiale","vitello","agnello","tacchino","coniglio",
    "prosciutto","salame","pancetta","bresaola","affettati","polpette","filetto","bistecca",
    "salmone","tonno","merluzzo","pesce","orata","branzino","acciughe","sgombro","sardine","baccalà","trota",
    "gamberi","gamberetti","cozze","vongole","calamari","polpo","aragosta","crostacei",
    "latte","burro","parmigiano","mozzarella","ricotta","gorgonzola","pecorino",
    "formaggio","formaggi","yogurt","panna","mascarpone","stracchino","burrata",
    "scamorza","provolone","taleggio","fontina","crescenza",
    "uova","uovo","frittata","omelette","miele",
  ],
  vegetariano: [
    "carne","pollo","manzo","maiale","vitello","agnello","tacchino","coniglio",
    "prosciutto","salame","pancetta","bresaola","affettati","filetto","bistecca",
    "salmone","tonno","merluzzo","pesce","orata","branzino","acciughe","sgombro","sardine","baccalà","trota",
    "gamberi","gamberetti","cozze","vongole","calamari","polpo","aragosta","crostacei",
  ],
  pescetariano: [
    "carne","pollo","manzo","maiale","vitello","agnello","tacchino","coniglio",
    "prosciutto","salame","pancetta","bresaola","affettati","filetto","bistecca",
  ],
  keto: [
    "pasta","penne","spaghetti","tagliatelle","fusilli","lasagna",
    "riso","risotto","pane","pizza","focaccia","gnocchi",
    "patate","polenta","couscous","farro","orzo",
    "bruschette","crostini","piadine","wrap","zucchero","miele","marmellata",
  ],
};

const allergyKeywords: Record<string, string[]> = {
  glutine: ["pasta","penne","spaghetti","tagliatelle","fusilli","lasagna","gnocchi","pane","pizza","focaccia","farro","orzo","couscous","seitan","bruschette","crostini","piadine","wrap","salsa di soia"],
  lattosio: ["latte","burro","parmigiano","mozzarella","ricotta","gorgonzola","pecorino","formaggio","formaggi","yogurt","panna","mascarpone","stracchino","burrata","scamorza","provolone","taleggio","fontina","crescenza","pesto"],
  uova: ["uova","uovo","frittata","omelette"],
  "frutta a guscio": ["noci","mandorle","nocciole","pistacchi","pinoli","anacardi","frutta secca","pesto"],
  crostacei: ["gamberi","gamberetti","cozze","vongole","calamari","polpo","aragosta","crostacei"],
  pesce: ["salmone","tonno","merluzzo","pesce","orata","branzino","acciughe","sgombro","sardine","baccalà","trota","pesce spada"],
  soia: ["soia","tofu","tempeh","edamame","salsa di soia","latte di soia"],
  sesamo: ["sesamo","tahina"],
};

function buildConstraintsPrompt(diet: string, allergies: string[]): string {
  const dietLower = diet.toLowerCase();
  let prompt = "";

  const forbidden = dietForbiddenKeywords[dietLower];
  if (forbidden && forbidden.length > 0) {
    prompt += `\n\n=== VINCOLI DIETETICI OBBLIGATORI (${diet}) ===`;
    prompt += `\nÈ ASSOLUTAMENTE VIETATO usare questi ingredienti: ${forbidden.join(", ")}`;
    prompt += `\nQuesta è una regola INVIOLABILE. Non fare eccezioni.`;
  }

  if (dietLower === "vegano") {
    prompt += `\n\nDIETA VEGANA: ZERO ingredienti di origine animale. Usa SOLO verdure, frutta, legumi, cereali, tofu, tempeh, seitan, frutta secca, latte vegetale.`;
  }
  if (dietLower === "keto") {
    prompt += `\n\nDIETA KETO: Ogni ricetta deve avere meno di 20g di carboidrati per porzione. Basa le ricette su: avocado, uova, carne, pesce, formaggi, olio, burro, verdure low-carb (zucchine, spinaci, broccoli, cavolfiore). VIETATO: pasta, riso, pane, patate, pizza, cereali.`;
  }
  if (dietLower === "mediterraneo") {
    prompt += `\n\nDIETA MEDITERRANEA: Privilegia verdure, frutta, legumi, pesce, olio EVO, cereali integrali. Limita carni rosse e cibi processati. Le ricette devono riflettere la tradizione mediterranea.`;
  }

  if (allergies.length > 0) {
    prompt += `\n\n=== ALLERGIE/INTOLLERANZE ===`;
    for (const a of allergies) {
      const kw = allergyKeywords[a.toLowerCase()];
      if (kw) {
        prompt += `\nALLERGIA ${a.toUpperCase()}: VIETATO usare ${kw.join(", ")}`;
      }
    }
    prompt += `\nNon includere MAI ingredienti contenenti questi allergeni.`;
  }

  if (dietLower === "vegetariano" && allergies.some(a => a.toLowerCase() === "lattosio")) {
    prompt += `\n\nATTENZIONE: Vegetariano + intolleranza lattosio. VIETATI: carne, pesce, E tutti i latticini. Usa alternative vegetali.`;
  }

  prompt += `\n\nOGNI ricetta DEVE rispettare TUTTI i vincoli. Se un vincolo non può essere rispettato, NON generare quella ricetta e scegline un'altra.`;

  return prompt;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const constraintsPrompt = buildConstraintsPrompt(
      profile.diet || "onnivoro",
      profile.allergies || []
    );

    // ── Strict time constraint ──
    const maxTime: number = Number(profile.cookingTime) || 45;
    const timeBucket =
      maxTime <= 15 ? "ULTRA RAPIDE (max 15 min, no preparazioni complesse)"
      : maxTime <= 30 ? "RAPIDE (max 30 min, una sola pentola/padella se possibile)"
      : maxTime <= 45 ? "MEDIE (max 45 min)"
      : "ELABORATE consentite (max " + maxTime + " min)";

    // ── Mood weighting ──
    const mood: string = (profile.mood || "neutro").toLowerCase();
    const moodWeight: number = typeof profile.moodWeight === "number" ? profile.moodWeight : 0.6;
    const moodPriority =
      moodWeight >= 0.7 ? "ALTA — il mood deve dominare lo stile delle ricette (purché rispetti dieta+allergie+tempo)"
      : moodWeight >= 0.4 ? "MEDIA — il mood influenza significativamente le scelte"
      : "BASSA — il mood è solo un suggerimento";

    // ── Anti-repetition (last 2-3 weeks of recipes) ──
    const recentRecipes: string[] = Array.isArray(profile.recentRecipes) ? profile.recentRecipes : [];
    const recentBlock = recentRecipes.length > 0
      ? `\n\n=== RICETTE GIÀ PROPOSTE (NON ripetere) ===\nL'utente ha già visto recentemente: ${recentRecipes.slice(0, 30).join(", ")}.\nNON proporre nessuna di queste ricette. Trova alternative diverse.`
      : "";

    // ── Disliked ingredients ──
    const disliked: string[] = Array.isArray(profile.dislikedIngredients) ? profile.dislikedIngredients : [];
    const dislikedBlock = disliked.length > 0
      ? `\n\n=== INGREDIENTI SGRADITI ===\nEvita (vincolo forte ma non assoluto): ${disliked.join(", ")}. Se proprio necessario, usa al massimo 1 volta nel piano.`
      : "";

    const systemPrompt = `Sei PlanEat, un motore intelligente di pianificazione pasti. Genera un piano settimanale OTTIMIZZATO, VARIO e PERSONALIZZATO.

═══ GERARCHIA DEI VINCOLI (RIGIDA) ═══
1. ALLERGIE → vincolo ASSOLUTO, mai violare
2. DIETA → vincolo ASSOLUTO, mai violare
3. TEMPO MAX (${maxTime} min) → vincolo HARD: OGNI ricetta deve avere prepTime ≤ ${maxTime}. Categoria: ${timeBucket}.
4. INGREDIENTI SGRADITI → vincolo forte
5. DISPENSA → priorità di utilizzo
6. MOOD (${mood}) → priorità ${moodPriority}

═══ REGOLE DI VARIETÀ (CRITICHE) ═══
- I 14 piatti del piano (7 pranzi + 7 cene) DEVONO essere TUTTI DIVERSI tra loro: nessuna ripetizione interna.
- L'ingrediente principale (proteina o pasta/riso/verdura dominante) NON deve ripetersi più di 2 volte in tutta la settimana.
- Alterna stili culinari: italiano, mediterraneo, asiatico, mediorientale, comfort, fresco.
- Bilancia: 2-3 piatti rapidi/comfort + 2-3 healthy + 1-2 più elaborati (rispettando il tempo max).
- Pranzo e cena dello stesso giorno devono essere DIVERSI per stile e ingrediente principale.

═══ MOOD → STILE CULINARIO ═══
- "energetico" / "energia": piatti colorati, speziati, ricchi di proteine, frutti rossi, agrumi.
- "relax": comfort food, zuppe, vellutate, piatti caldi, risotti (se concessi).
- "focus": piatti leggeri, omega-3, verdure verdi, semi.
- "romantico": piatti curati, presentazione elegante, vino-friendly.
- "conviviale" / "festivo": piatti da condividere, taglieri, paste al forno.
- "avventuroso": cucine etniche, sapori nuovi (thai, marocchino, peruviano).
- "leggero": insalate ricche, bowl, piatti freschi, bassa cottura.
- "nostalgico": ricette della tradizione regionale italiana.

═══ FALLBACK INTELLIGENTE ═══
Se i vincoli sono troppo stretti: NON violare MAI allergie, dieta o tempo. Rilassa solo: mood (-30%), preferenze sgradite (-20%), varietà cuisine (consenti più piatti italiani).

═══ OUTPUT ═══
Rispondi SOLO tramite tool call generate_meal_plan, in italiano, senza markdown.
${constraintsPrompt}${recentBlock}${dislikedBlock}`;

    const userPrompt = `Profilo utente:
- Dieta: ${profile.diet || "onnivoro"}
- Allergie: ${profile.allergies?.length ? profile.allergies.join(", ") : "Nessuna"}
- Ingredienti sgraditi: ${disliked.length ? disliked.join(", ") : "Nessuno"}
- Obiettivi: ${profile.goals?.length ? profile.goals.join(", ") : "Equilibrio generale"}
- Budget settimanale: ${profile.budget}€
- TEMPO MAX cucina: ${maxTime} minuti (HARD LIMIT)
- Energia (1-10): ${profile.energy}
- Mood: ${mood} (peso: ${moodWeight})
- Attrezzatura: ${profile.equipment?.length ? profile.equipment.join(", ") : "fornelli"}
- Dispensa: ${profile.pantry?.length ? profile.pantry.join(", ") : "vuota"}

GENERA un piano settimanale di 14 ricette TUTTE DIVERSE, ognuna con prepTime ≤ ${maxTime} min, rispettando RIGOROSAMENTE dieta "${profile.diet || "onnivoro"}" e allergie [${(profile.allergies || []).join(", ")}].
NON ripetere ricette già viste recentemente. Massimizza varietà di ingredienti, cuisine e stili.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_meal_plan",
                description:
                  "Genera un piano pasti settimanale completo con analisi del mood, menu, lista spesa e consigli.",
                parameters: {
                  type: "object",
                  properties: {
                    moodAnalysis: {
                      type: "string",
                      description:
                        "Analisi creativa del mood dell'utente e come è stato tradotto nella scelta dei piatti (2-3 frasi in italiano)",
                    },
                    weeklyMenu: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          day: { type: "string" },
                          lunch: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              prepTime: { type: "number" },
                              difficulty: {
                                type: "string",
                                enum: ["facile", "media", "elaborata"],
                              },
                            },
                            required: ["name", "prepTime", "difficulty"],
                            additionalProperties: false,
                          },
                          dinner: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              prepTime: { type: "number" },
                              difficulty: {
                                type: "string",
                                enum: ["facile", "media", "elaborata"],
                              },
                            },
                            required: ["name", "prepTime", "difficulty"],
                            additionalProperties: false,
                          },
                        },
                        required: ["day", "lunch", "dinner"],
                        additionalProperties: false,
                      },
                      description:
                        "Array di 7 giorni (Lunedì-Domenica) con pranzo e cena. OGNI ricetta DEVE rispettare la dieta e le allergie dell'utente.",
                    },
                    groceryList: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          category: {
                            type: "string",
                            description:
                              "Categoria: Frutta e verdura, Proteine, Latticini, Dispensa, Condimenti, Freschi, Panetteria",
                          },
                          inPantry: {
                            type: "boolean",
                            description:
                              "true se l'ingrediente è già nella dispensa dell'utente",
                          },
                        },
                        required: ["name", "category", "inPantry"],
                        additionalProperties: false,
                      },
                    },
                    smartTips: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "4-5 consigli pratici su meal prep, riutilizzo avanzi, risparmio. Ogni tip inizia con un emoji.",
                    },
                    estimatedCost: {
                      type: "number",
                      description:
                        "Costo stimato totale della spesa in euro (solo ingredienti non in dispensa)",
                    },
                  },
                  required: [
                    "moodAnalysis",
                    "weeklyMenu",
                    "groceryList",
                    "smartTips",
                    "estimatedCost",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "generate_meal_plan" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Troppi tentativi. Riprova tra qualche minuto." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crediti AI esauriti." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Errore nella generazione. Riprova." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Risposta AI non valida. Riprova." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const mealPlan = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(mealPlan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-meal-plan error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});