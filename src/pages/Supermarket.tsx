import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, ShoppingCart, Send, MapPin, Search, Star, Loader2, Info, Zap, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import LoyaltyCard from "@/components/LoyaltyCard";

interface SupermarketData {
  name: string;
  address: string;
  distance: string;
  total: number;
  savingPercent: number;
  offersCount: number;
  badge: string;
  badgeColor: string;
  items: { name: string; price: number; minPrice: number; maxPrice: number; onSale: boolean }[];
}

const allSupermarkets: Record<string, SupermarketData[]> = {
  "20100": [
    {
      name: "Esselunga", address: "Via Roma 12, Milano", distance: "0.8 km", total: 48.90, savingPercent: 14, offersCount: 8,
      badge: "Stima più conveniente", badgeColor: "bg-accent text-accent-foreground",
      items: [
        { name: "Quinoa biologica 250g", price: 2.49, minPrice: 2.29, maxPrice: 2.89, onSale: true },
        { name: "Petto di pollo 400g", price: 3.90, minPrice: 3.50, maxPrice: 4.90, onSale: true },
        { name: "Salmone fresco 300g", price: 6.50, minPrice: 5.90, maxPrice: 8.50, onSale: false },
        { name: "Spinaci freschi 300g", price: 1.49, minPrice: 1.29, maxPrice: 1.89, onSale: true },
        { name: "Riso arborio 300g", price: 1.99, minPrice: 1.79, maxPrice: 2.59, onSale: false },
        { name: "Pasta integrale 500g", price: 0.99, minPrice: 0.89, maxPrice: 1.49, onSale: true },
        { name: "Parmigiano Reggiano 200g", price: 3.99, minPrice: 3.79, maxPrice: 5.49, onSale: true },
        { name: "Uova bio x6", price: 2.49, minPrice: 2.29, maxPrice: 3.49, onSale: true },
        { name: "Olio EVO 500ml", price: 5.49, minPrice: 4.90, maxPrice: 7.90, onSale: false },
        { name: "Broccoli 400g", price: 1.79, minPrice: 1.49, maxPrice: 2.49, onSale: true },
        { name: "Avocado x2", price: 2.99, minPrice: 2.49, maxPrice: 3.99, onSale: false },
        { name: "Zucca a fette 500g", price: 2.19, minPrice: 1.99, maxPrice: 2.99, onSale: true },
      ],
    },
    {
      name: "Coop", address: "Viale Monza 45, Milano", distance: "1.2 km", total: 53.40, savingPercent: 6, offersCount: 5,
      badge: "Miglior equilibrio", badgeColor: "bg-primary/10 text-primary",
      items: [
        { name: "Quinoa biologica 250g", price: 2.89, minPrice: 2.49, maxPrice: 3.29, onSale: false },
        { name: "Petto di pollo 400g", price: 4.50, minPrice: 3.90, maxPrice: 5.20, onSale: false },
        { name: "Salmone fresco 300g", price: 6.90, minPrice: 5.90, maxPrice: 8.50, onSale: false },
        { name: "Spinaci freschi 300g", price: 1.69, minPrice: 1.49, maxPrice: 2.29, onSale: false },
        { name: "Riso arborio 300g", price: 2.19, minPrice: 1.79, maxPrice: 2.59, onSale: false },
        { name: "Pasta integrale 500g", price: 1.29, minPrice: 0.99, maxPrice: 1.69, onSale: true },
      ],
    },
    {
      name: "Carrefour", address: "Corso Buenos Aires 8, Milano", distance: "1.5 km", total: 56.80, savingPercent: 0, offersCount: 3,
      badge: "Più promozioni attive", badgeColor: "bg-amber-100 text-amber-700",
      items: [],
    },
    {
      name: "Conad", address: "Via Padova 22, Milano", distance: "2.1 km", total: 54.10, savingPercent: 4, offersCount: 6,
      badge: "", badgeColor: "",
      items: [],
    },
  ],
};

const Supermarket = () => {
  const navigate = useNavigate();
  const [cap, setCap] = useState("");
  const [searchedCap, setSearchedCap] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState<string | null>(null);

  const supermarkets = searchedCap ? (allSupermarkets[searchedCap] || allSupermarkets["20100"]) : null;
  const selected = supermarkets?.find((s) => s.name === selectedSuper);

  const handleSearch = () => {
    if (!cap.trim()) return;
    setIsSearching(true);
    setSelectedSuper(null);
    setTimeout(() => {
      setSearchedCap(cap.trim());
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="px-4 py-12 md:py-20">
        <div className="container max-w-4xl">
          <Button variant="ghost" size="sm" className="mb-6 gap-1 text-muted-foreground" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
            Torna alla dashboard
          </Button>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dove conviene fare la spesa questa settimana?
          </h1>
          <p className="mt-3 text-muted-foreground">
            Confronto basato su volantini settimanali, offerte online e prezzi medi indicativi della tua zona.
          </p>

          {/* CAP / Location input */}
          <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              La tua zona
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={cap}
                  onChange={(e) => setCap(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Inserisci CAP o località (es. 20100)"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                Cerca
              </Button>
            </div>
          </div>

          {/* Searching state */}
          {isSearching && (
            <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
              <p className="text-sm font-medium text-accent">L'AI sta analizzando le offerte nella tua zona…</p>
            </div>
          )}

          {/* Supermarket cards */}
          {supermarkets && !isSearching && (
            <div className="mt-8 animate-fade-in">
              {/* Disclaimer */}
              <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3 mb-6">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I dati sono basati su volantini settimanali, prezzi medi pubblici e offerte online. I prezzi effettivi possono variare in negozio.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {supermarkets.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSuper(s.name)}
                    className={`relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      selectedSuper === s.name
                        ? "border-primary/40 bg-primary/5 shadow-md"
                        : "border-border/60 bg-card shadow-sm hover:border-primary/20"
                    }`}
                  >
                    {s.badge && (
                      <span className={`absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full ${s.badgeColor} px-3 py-0.5 text-xs font-semibold shadow-sm`}>
                        {s.badge === "Stima più conveniente" && <BadgeCheck className="h-3 w-3" />}
                        {s.badge === "Miglior equilibrio" && <Star className="h-3 w-3" />}
                        {s.badge === "Più promozioni attive" && <Zap className="h-3 w-3" />}
                        {s.badge}
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{s.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.address}</p>
                        <p className="text-xs text-muted-foreground">{s.distance}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">€{s.total.toFixed(2)}</p>
                        {s.savingPercent > 0 && (
                          <p className="text-sm font-medium text-primary">-{s.savingPercent}% stimato</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Tag className="h-3 w-3" />
                        {s.offersCount} offerte attive
                      </Badge>
                      <span className="text-xs text-accent font-medium flex items-center gap-0.5">
                        Dettaglio <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail view */}
              {selected && selected.items.length > 0 && (
                <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{selected.name}</h2>
                      <p className="text-sm text-muted-foreground">{selected.address} · {selected.distance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">€{selected.total.toFixed(2)}</p>
                      {selected.savingPercent > 0 && (
                        <p className="text-xs text-primary font-medium">Risparmio stimato: {selected.savingPercent}%</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg px-4 py-2.5 transition-colors duration-200 hover:bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-4 w-4 text-muted-foreground/50" />
                          <div>
                            <span className="text-sm text-foreground">{item.name}</span>
                            {item.onSale && (
                              <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0">In offerta</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-foreground">€{item.price.toFixed(2)}</span>
                          <p className="text-[10px] text-muted-foreground">€{item.minPrice.toFixed(2)} – €{item.maxPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Totale stimato</p>
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
                <div className="mt-8 rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm animate-fade-in">
                  <p className="text-muted-foreground">Dettaglio prezzi stimati disponibile per i supermercati con dati sufficienti.</p>
                  <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => setSelectedSuper("Esselunga")}>
                    Vedi {supermarkets[0]?.name || "Esselunga"}
                  </Button>
                </div>
              )}

              {/* Loyalty Card Section */}
              <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <LoyaltyCard />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Supermarket;
