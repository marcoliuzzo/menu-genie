import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Sei SmartBite, un assistente AI avanzato per la pianificazione dei pasti. Genera un piano alimentare settimanale ottimizzato.

REGOLE:
1. TRADUZIONE DEL MOOD: Interpreta il mood dell'utente in stile culinario. "Energetico" = piatti colorati, speziati. "Relax" = comfort food, zuppe. "Avventuroso" = cucina etnica, sapori nuovi. "Nostalgico" = ricette della tradizione. "Leggero" = insalate, piatti freschi. "Festivo" = piatti elaborati e conviviali.
2. OTTIMIZZAZIONE DISPENSA: Usa prioritariamente gli ingredienti che l'utente ha già in casa.
3. LOGICA ECONOMICA: Proponi ricette che condividono ingredienti comuni per ottimizzare la spesa.
4. CALIBRAZIONE ENERGIA: Se l'energia è bassa (<5), proponi ricette "One-Pot" o con meno di 15 min di preparazione.
5. Rispetta dieta, allergie, budget, attrezzatura disponibile e tempo di cottura massimo.
6. Rispondi SEMPRE in italiano.

IMPORTANTE: Rispondi SOLO con il JSON richiesto, senza markdown o testo aggiuntivo.`;

    const userPrompt = `Profilo utente:
- Dieta: ${profile.diet || "onnivoro"}
- Allergie: ${profile.allergies?.length ? profile.allergies.join(", ") : "Nessuna"}
- Obiettivi: ${profile.goals?.length ? profile.goals.join(", ") : "Equilibrio generale"}
- Budget settimanale: ${profile.budget}€
- Tempo max per cucinare: ${profile.cookingTime} minuti
- Livello energia (1-10): ${profile.energy}
- Mood: ${profile.mood || "neutro"}
- Attrezzatura: ${profile.equipment?.length ? profile.equipment.join(", ") : "fornelli"}
- In dispensa: ${profile.pantry?.length ? profile.pantry.join(", ") : "niente di specifico"}

Genera il piano alimentare settimanale.`;

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
                        "Array di 7 giorni (Lunedì-Domenica) con pranzo e cena",
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
