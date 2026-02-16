import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Clock,
  CreditCard,
  Sparkles,
  Zap,
  Heart,
  Target,
  ShoppingCart,
  ChefHat,
  Smile,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const problems = [
  { icon: Brain, title: "Carico mentale", desc: "Ogni giorno la stessa domanda: \"Cosa cucino?\". Il cervello merita di meglio." },
  { icon: Zap, title: "Sovraccarico decisionale", desc: "Troppe opzioni, troppi vincoli. Budget, gusti, tempo: tutto pesa." },
  { icon: Clock, title: "Spreco di tempo e denaro", desc: "Lista disorganizzata, acquisti impulsivi, cibo che finisce nel cestino." },
];

const solutionPoints = [
  { icon: Sparkles, title: "AI Personalizzata", desc: "Un algoritmo che impara le tue preferenze e adatta ogni piano." },
  { icon: CreditCard, title: "Ottimizzazione prezzi", desc: "Confronta supermercati e trova il risparmio migliore per te." },
  { icon: Heart, title: "Pianificazione emotiva", desc: "Il primo sistema che considera come ti senti, non solo cosa mangi." },
];

const pillars = [
  { icon: Target, title: "Ottimizzazione economica", desc: "Algoritmi che massimizzano ogni euro del tuo budget settimanale." },
  { icon: Sparkles, title: "Personalizzazione intelligente", desc: "Ogni piano è unico, calibrato su di te e le tue esigenze reali." },
  { icon: Heart, title: "Pianificazione emotiva", desc: "Il primo sistema che considera come ti senti, non solo cosa mangi." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-4 py-24 md:py-36">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            Powered by AI
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Pianifichiamo esperienze.{" "}
            <span className="gradient-primary-text">Non solo pasti.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            L'app intelligente che organizza la tua spesa in base a budget, tempo, energia e mood.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
              onClick={() => navigate("/demo")}
            >
              Prova la demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-medium"
              onClick={() => navigate("/come-funziona")}
            >
              Scopri come funziona
            </Button>
          </div>

          {/* App mockup */}
          <div className="mt-16 w-full max-w-3xl animate-fade-in">
            <div className="relative rounded-2xl border border-border/60 bg-card p-1 shadow-2xl shadow-foreground/5">
              <div className="flex items-center gap-1.5 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 text-xs text-muted-foreground">spesasmart.app</span>
              </div>
              <div className="rounded-xl bg-secondary/50 p-8">
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { day: "Lunedì", pranzo: "Bowl proteica quinoa", cena: "Vellutata di zucca" },
                    { day: "Martedì", pranzo: "Insalata di farro", cena: "Risotto ai funghi" },
                    { day: "Mercoledì", pranzo: "Wrap integrale", cena: "Salmone al forno" },
                  ].map((d) => (
                    <div key={d.day} className="rounded-xl bg-card p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{d.day}</p>
                      <p className="mt-2 text-sm text-foreground">{d.pranzo}</p>
                      <p className="text-sm text-muted-foreground">{d.cena}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMA ─── */}
      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Troppo complesso per essere <span className="gradient-primary-text">solo una spesa.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
            La verità è che pianificare i pasti è una delle attività più stressanti della settimana.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {problems.map((p) => (
              <div key={p.title} className="group rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors duration-300 group-hover:gradient-primary">
                  <p.icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUZIONE ─── */}
      <section className="bg-secondary py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            La soluzione? <span className="gradient-primary-text">Intelligenza applicata.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
            AI + personalizzazione + ottimizzazione prezzi in un'unica app.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {solutionPoints.map((s) => (
              <div key={s.title} className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg shadow-primary/20">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 gap-2"
              onClick={() => navigate("/come-funziona")}
            >
              Scopri il processo
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── POSIZIONAMENTO ─── */}
      <section className="py-24 px-4">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Oltre le app di ricette.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
            Non un ricettario. Un sistema di intelligenza alimentare.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
