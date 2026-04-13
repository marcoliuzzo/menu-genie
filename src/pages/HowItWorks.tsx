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

      <section className="px-4 py-12 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Il processo
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:mt-6 md:text-5xl">
              Come funziona <span className="gradient-primary-text">PlanEat</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:mt-4 md:text-lg">
              Quattro passaggi. Zero stress. Un piano su misura in pochi secondi.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="mt-12 relative md:mt-20">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

            <div className="space-y-10 md:space-y-16">
              {steps.map((s, i) => (
                <div key={s.step} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  {/* Step icon */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-card shadow-sm z-10 md:h-16 md:w-16">
                    <s.icon className="h-5 w-5 text-primary md:h-7 md:w-7" />
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}>
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">Step {s.step}</span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground md:mt-2 md:text-xl">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:mt-2">{s.desc}</p>
                    <div className="mt-3 rounded-xl border border-border/60 bg-secondary/50 p-3 md:mt-4 md:p-4">
                      <p className="text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center md:mt-20">
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
