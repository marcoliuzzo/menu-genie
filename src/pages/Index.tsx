import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ShoppingBasket,
  Brain,
  Clock,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

/* Scroll-reveal hook (consistent with Presentazione) */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(12px)",
        transition: "opacity 600ms ease-out, transform 600ms ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-background" />
        <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Assistente AI per la spesa intelligente
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-5 text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-foreground">
              Meno scelte.{" "}
              <span className="gradient-primary-text">Più tempo per te.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              PlanEat pianifica i pasti, ottimizza la spesa e gestisce la dispensa.
              Tu pensi a vivere.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate("/demo")}
                className="group rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/40 hover:scale-105 animate-cta-glow"
              >
                Prova la Demo
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="rounded-full text-base font-medium text-foreground hover:bg-secondary"
              >
                <Link to="/presentazione">Scopri di più</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 1 — Cosa fa PlanEat */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <Reveal>
          <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-tight text-foreground">
            Cosa fa PlanEat
          </h2>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "Pianifica i pasti",
              desc: "Genera automaticamente un menu settimanale su misura.",
            },
            {
              icon: ShoppingBasket,
              title: "Lista spesa ottimizzata",
              desc: "Solo ciò che ti serve, già pronto da comprare.",
            },
            {
              icon: Clock,
              title: "Tempo, gusti, dispensa",
              desc: "Tiene conto delle tue preferenze e di ciò che hai in casa.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={120 + i * 100}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 2 — Perché è diverso */}
      <section className="bg-secondary/30 border-y border-border/40">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Reveal>
            <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-tight text-foreground">
              Perché è diverso
            </h2>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Decide per te",
                desc: "Non scegli cosa mangiare: lo decide PlanEat.",
              },
              {
                icon: Layers,
                title: "Tutto integrato",
                desc: "Pasti, dispensa e spesa in un unico sistema.",
              },
              {
                icon: RefreshCw,
                title: "Si adatta nel tempo",
                desc: "Impara dalle tue abitudini e migliora ogni settimana.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={120 + i * 100}>
                <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <Footer />
    </div>
  );
};

export default Index;
