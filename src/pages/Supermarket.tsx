import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, ShoppingCart, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const supermarkets = [
  {
    name: "Esselunga",
    address: "Via Roma 12, Milano",
    total: 52.40,
    saving: 12,
    best: true,
    items: [
      { name: "Quinoa biologica 250g", price: 2.89 },
      { name: "Petto di pollo 400g", price: 4.50 },
      { name: "Salmone fresco 300g", price: 6.90 },
      { name: "Spinaci freschi 300g", price: 1.89 },
      { name: "Farro perlato 300g", price: 1.79 },
      { name: "Pasta integrale 500g", price: 1.29 },
      { name: "Riso arborio 300g", price: 2.19 },
      { name: "Zucca a fette 500g", price: 2.49 },
      { name: "Broccoli 400g", price: 1.99 },
      { name: "Avocado x2", price: 3.50 },
      { name: "Uova bio x6", price: 2.89 },
      { name: "Ceci cotti x2", price: 2.58 },
      { name: "Pomodorini 250g", price: 1.69 },
      { name: "Noci sgusciate 100g", price: 2.49 },
      { name: "Pane integrale", price: 1.89 },
      { name: "Olio EVO 500ml", price: 5.90 },
      { name: "Funghi porcini secchi 30g", price: 4.50 },
      { name: "Hummus classico 200g", price: 2.29 },
    ],
  },
  {
    name: "Coop",
    address: "Viale Monza 45, Milano",
    total: 58.90,
    saving: 2,
    best: false,
    items: [],
  },
  {
    name: "Carrefour",
    address: "Corso Buenos Aires 8, Milano",
    total: 61.20,
    saving: 0,
    best: false,
    items: [],
  },
];

const Supermarket = () => {
  const navigate = useNavigate();
  const [selectedSuper, setSelectedSuper] = useState<string | null>(null);
  const selected = supermarkets.find((s) => s.name === selectedSuper);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="px-4 py-12 md:py-20">
        <div className="container max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-1 text-muted-foreground"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla dashboard
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dove conviene fare la spesa questa settimana?
          </h1>
          <p className="mt-3 text-muted-foreground">
            Confronto prezzi basato sulla tua lista della spesa attuale.
          </p>

          {/* Supermarket cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {supermarkets.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedSuper(s.name)}
                className={`relative rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  selectedSuper === s.name
                    ? "border-primary/40 bg-primary/5 shadow-md"
                    : "border-border/60 bg-card shadow-sm hover:border-primary/20"
                } ${s.best ? "ring-2 ring-accent/30" : ""}`}
              >
                {s.best && (
                  <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground shadow-sm">
                    <BadgeCheck className="h-3 w-3" />
                    Più conveniente
                  </span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.address}</p>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-foreground">€{s.total.toFixed(2)}</p>
                  {s.saving > 0 && (
                    <p className="text-sm font-medium text-primary mt-1">
                      Risparmi {s.saving}% rispetto agli altri
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-accent font-medium">
                  Vedi dettaglio <ChevronRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>

          {/* Detail view */}
          {selected && selected.items.length > 0 && (
            <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">€{selected.total.toFixed(2)}</p>
                  <p className="text-xs text-primary font-medium">Risparmio: €{((61.20 - selected.total).toFixed(2))}</p>
                </div>
              </div>

              <div className="space-y-1">
                {selected.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors duration-200 hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground/50" />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">€{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Totale</p>
                  <p className="text-xl font-bold text-foreground">€{selected.total.toFixed(2)}</p>
                </div>
                <Button className="rounded-full bg-accent px-6 text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-105 gap-2">
                  <Send className="h-4 w-4" />
                  Invia lista al supermercato
                </Button>
              </div>
            </div>
          )}

          {selected && selected.items.length === 0 && (
            <div className="mt-10 rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm animate-fade-in">
              <p className="text-muted-foreground">
                Dettaglio prezzi disponibile solo per il supermercato consigliato.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 rounded-full"
                onClick={() => setSelectedSuper("Esselunga")}
              >
                Vedi Esselunga
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Supermarket;
