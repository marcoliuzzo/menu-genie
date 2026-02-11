import { useNavigate } from "react-router-dom";
import { Brain, Recycle, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: Brain,
    title: "Meno decisioni",
    description: "Basta chiedersi \"cosa cucino stasera?\". Ci pensiamo noi.",
  },
  {
    icon: Recycle,
    title: "Meno sprechi",
    description: "Compri solo quello che serve. Niente cibo dimenticato in frigo.",
  },
  {
    icon: Clock,
    title: "Più tempo per te",
    description: "Una lista pronta, un piano chiaro. Tutto in pochi minuti.",
  },
];

const steps = [
  { number: "1", title: "Dicci chi sei", description: "Rispondi a poche domande sulle tue abitudini e preferenze." },
  { number: "2", title: "Creiamo il tuo menu", description: "Un piano settimanale su misura, pensato per te." },
  { number: "3", title: "Vai a fare la spesa", description: "Lista pronta, budget sotto controllo, zero stress." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Il tuo assistente per la spesa
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl text-foreground">
          La spesa intelligente che pensa per te
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          Menu, lista della spesa e budget in pochi click, senza stress.
        </p>
        <Button
          size="lg"
          className="mt-10 gap-2 rounded-full px-8 text-base"
          onClick={() => navigate("/profilo")}
        >
          Crea il tuo menu
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Benefits */}
      <section className="bg-secondary py-20 px-4">
        <div className="container">
          <h2 className="mb-12 text-center text-2xl font-semibold md:text-3xl text-foreground">
            Perché scegliere Spesa Intelligente?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <b.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container">
          <h2 className="mb-12 text-center text-2xl font-semibold md:text-3xl text-foreground">
            Come funziona
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-lg">
                  {s.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-8"
              onClick={() => navigate("/profilo")}
            >
              Inizia ora — è gratuito
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
