import { ChefHat, CreditCard, Smile, ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    step: "01",
    icon: ChefHat,
    title: "Crea il tuo profilo alimentare",
    desc: "Dicci le tue preferenze: regime alimentare, allergie, intolleranze. Il sistema apprende le tue esigenze e le ricorda per ogni piano.",
    detail: "Supportiamo oltre 15 profili alimentari diversi, dal vegano al keto, con gestione completa delle allergie.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Inserisci budget, tempo ed energia",
    desc: "Quanto vuoi spendere? Quanto tempo hai? Quanta energia hai oggi? Il piano si adatta automaticamente.",
    detail: "Se sei stanco, riceverai ricette one-pot da 15 minuti. Con più energia, piatti elaborati e creativi.",
  },
  {
    step: "03",
    icon: Smile,
    title: "Scegli il tuo MOOD",
    desc: "Seleziona un colore, un'atmosfera, un'occasione. L'AI traduce le tue emozioni in sapori coerenti.",
    detail: "Mood 'Blu/Relax' = comfort food e sapori caldi. Mood 'Rosso/Energia' = piatti speziati e colorati.",
  },
  {
    step: "04",
    icon: ShoppingCart,
    title: "Ottieni menù e lista intelligente",
    desc: "Piano settimanale completo con lista della spesa ottimizzata, supermercato consigliato e risparmio stimato.",
    detail: "Ingredienti condivisi tra ricette per minimizzare lo spreco. Confronto prezzi tra supermercati della tua zona.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="px-4 py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Il processo
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Come funziona <span className="gradient-primary-text">Spesa Smart</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Quattro passaggi. Zero stress. Un piano su misura in pochi secondi.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="mt-20 relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-16">
              {steps.map((s, i) => (
                <div key={s.step} className="relative flex flex-col md:flex-row md:items-start gap-6">
                  {/* Step number dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-border bg-card shadow-sm z-10">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content - alternating sides on desktop */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Step {s.step}</span>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <div className="mt-4 rounded-xl border border-border/60 bg-secondary/50 p-4">
                      <p className="text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Button
              size="lg"
              className="rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:scale-105"
              onClick={() => navigate("/demo")}
            >
              Prova la demo ora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
