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
    const { mealName, servings = 2 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Sei uno chef AI esperto. Genera ricette dettagliate step-by-step in italiano.
Rispondi SOLO con il JSON richiesto tramite la funzione, senza testo aggiuntivo.
Le istruzioni devono essere chiare, dettagliate e adatte a cuochi amatoriali.
I tempi devono essere realistici. I consigli da chef devono essere utili e pratici.`;

    const userPrompt = `Genera la ricetta completa per: "${mealName}" per ${servings} persone.`;

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
                name: "generate_recipe",
                description: "Genera una ricetta interattiva completa con ingredienti, step e note dello chef.",
                parameters: {
                  type: "object",
                  properties: {
                    title: { type: "string", description: "Nome della ricetta" },
                    description: { type: "string", description: "Breve descrizione evocativa della ricetta (1-2 frasi)" },
                    servings: { type: "number", description: "Numero di porzioni" },
                    totalTime: { type: "number", description: "Tempo totale in minuti" },
                    ingredients: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          quantity: { type: "string" },
                          alternatives: {
                            type: "array",
                            items: { type: "string" },
                            description: "1-2 alternative possibili",
                          },
                        },
                        required: ["name", "quantity"],
                        additionalProperties: false,
                      },
                    },
                    steps: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          step: { type: "number" },
                          instruction: { type: "string", description: "Istruzione dettagliata per questo step" },
                          duration: { type: "number", description: "Durata in minuti di questo step" },
                          tip: { type: "string", description: "Suggerimento da chef per questo step (opzionale)" },
                        },
                        required: ["step", "instruction"],
                        additionalProperties: false,
                      },
                    },
                    chefNotes: { type: "string", description: "Note finali dello chef con varianti e suggerimenti (2-3 frasi)" },
                  },
                  required: ["title", "description", "servings", "totalTime", "ingredients", "steps", "chefNotes"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "generate_recipe" } },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Troppi tentativi. Riprova tra qualche minuto." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crediti AI esauriti." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "Errore nella generazione." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Risposta AI non valida." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const recipe = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(recipe), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-recipe error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
