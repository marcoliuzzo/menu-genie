import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, ShoppingCart, Send, MapPin, Search, Star, Loader2, Info, Zap, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import LoyaltyCard from "@/components/LoyaltyCard";
import { getSupermarketsForCap, type SupermarketData } from "@/data/supermarketData";

const Supermarket = () => {
  const navigate = useNavigate();
  const [cap, setCap] = useState("");
  const [searchResult, setSearchResult] = useState<{ city: string; province: string; supermarkets: SupermarketData[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuper, setSelectedSuper] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const supermarkets = searchResult?.supermarkets || null;
  const selected = supermarkets?.find((s) => s.name === selectedSuper);

  const handleSearch = () => {
    const trimmed = cap.trim();
    if (!trimmed || trimmed.length < 4) return;
    setIsSearching(true);
    setSelectedSuper(null);
    setNotFound(false);
    setTimeout(() => {
      const result = getSupermarketsForCap(trimmed);
      if (result) {
        setSearchResult(result);
        setNotFound(false);
      } else {
        setSearchResult(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="px-4 py-8 md:py-16">
        <div className="container max-w-4xl">
          <Button variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
            Torna alla dashboard
          </Button>

          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
            Consigliato per te
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Tutto in un unico posto. Minimo sforzo, prezzi sempre aggiornati.
          </p>

          {/* CAP input */}
          <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 md:p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              La tua zona
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={cap}
                  onChange={(e) => setCap(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Inserisci CAP (es. 20100)"
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching || cap.trim().length < 4} className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="hidden sm:inline">Cerca</span>
              </Button>
            </div>
            {searchResult && (
              <p className="mt-2 text-xs text-primary font-medium">
                📍 {searchResult.city} ({searchResult.province})
              </p>
            )}
          </div>

          {/* Searching state */}
          {isSearching && (
            <div className="mt-10 flex flex-col items-center gap-3 animate-fade-in">
              <Loader2 className="h-8 w-8 text-accent animate-spin" />
              <p className="text-sm font-medium text-accent">L'AI sta analizzando le offerte nella tua zona…</p>
            </div>
          )}

          {/* Not found */}
          {notFound && !isSearching && (
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm animate-fade-in">
              <p className="text-muted-foreground">CAP non riconosciuto. Prova con un altro CAP italiano (es. 20100, 00185, 80121).</p>
            </div>
          )}

          {/* Supermarket cards */}
          {supermarkets && !isSearching && (
            <div className="mt-6 animate-fade-in">
              <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/30 px-4 py-3 mb-6">
                <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I dati sono basati su volantini settimanali, prezzi medi pubblici e offerte online. I prezzi effettivi possono variare in negozio.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {supermarkets.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSuper(s.name)}
                    className={`relative rounded-2xl border p-4 md:p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      selectedSuper === s.name
                        ? "border-primary/40 bg-primary/5 shadow-md"
                        : "border-border/60 bg-card shadow-sm hover:border-primary/20"
                    }`}
                  >
                    {s.badge && (
                      <span className={`absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full ${s.badgeColor} px-2.5 py-0.5 text-[10px] md:text-xs font-semibold shadow-sm`}>
                        {s.badge === "Stima più conveniente" && <BadgeCheck className="h-3 w-3" />}
                        {s.badge === "Miglior equilibrio" && <Star className="h-3 w-3" />}
                        {s.badge === "Più promozioni attive" && <Zap className="h-3 w-3" />}
                        {s.badge}
                      </span>
                    )}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground md:text-lg">{s.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.address}</p>
                        <p className="text-xs text-muted-foreground">{s.distance}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-foreground md:text-2xl">€{s.total.toFixed(2)}</p>
                        {s.savingPercent > 0 && (
                          <p className="text-sm font-medium text-primary">-{s.savingPercent}% stimato</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Tag className="h-3 w-3" />
                        {s.offersCount} offerte
                      </Badge>
                      <span className="text-xs text-accent font-medium flex items-center gap-0.5">
                        Dettaglio <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Detail view */}
              {selected && (
                <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 md:p-8 shadow-sm animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground md:text-xl">{selected.name}</h2>
                      <p className="text-sm text-muted-foreground">{selected.address} · {selected.distance}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xl font-bold text-foreground md:text-2xl">€{selected.total.toFixed(2)}</p>
                      {selected.savingPercent > 0 && (
                        <p className="text-xs text-primary font-medium">Risparmio stimato: {selected.savingPercent}%</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-secondary/50">
                        <div className="flex items-center gap-3 min-w-0">
                          <ShoppingCart className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm text-foreground block truncate">{item.name}</span>
                            {item.onSale && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 mt-0.5">In offerta</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <span className="text-sm font-medium text-foreground">€{item.price.toFixed(2)}</span>
                          <p className="text-[10px] text-muted-foreground">€{item.minPrice.toFixed(2)} – €{item.maxPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border pt-4 gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Totale stimato</p>
                      <p className="text-xl font-bold text-foreground">€{selected.total.toFixed(2)}</p>
                    </div>
                    <Button className="rounded-full bg-accent px-6 text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:scale-105 gap-2 w-full sm:w-auto">
                      <Send className="h-4 w-4" />
                      Invia lista al supermercato
                    </Button>
                  </div>
                </div>
              )}

              {/* Loyalty Card Section */}
              <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4 md:p-6 shadow-sm">
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
