import { useState } from "react";
import { CreditCard, Check, Gift, Tag, Star, Loader2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const loyaltyPrograms = [
  { name: "Esselunga", logo: "🔴", color: "border-red-300 bg-red-50" },
  { name: "Coop", logo: "🟢", color: "border-green-300 bg-green-50" },
  { name: "Carrefour", logo: "🔵", color: "border-blue-300 bg-blue-50" },
  { name: "Conad", logo: "🟡", color: "border-yellow-300 bg-yellow-50" },
];

interface LoyaltyBenefit {
  type: "sconto" | "punti" | "coupon" | "promo";
  description: string;
  value: string;
}

const mockBenefits: Record<string, LoyaltyBenefit[]> = {
  Esselunga: [
    { type: "sconto", description: "Sconto soci su petto di pollo", value: "-15%" },
    { type: "punti", description: "Punti Fidaty x2 su prodotti bio", value: "+200 pt" },
    { type: "coupon", description: "Coupon digitale olio EVO", value: "-€1.50" },
    { type: "promo", description: "Promo 3x2 pasta integrale", value: "3x2" },
  ],
  Coop: [
    { type: "sconto", description: "Sconto socio su verdure fresche", value: "-10%" },
    { type: "punti", description: "Punti doppi su linea Coop Bio", value: "+150 pt" },
    { type: "coupon", description: "Buono spesa digitale", value: "-€2.00" },
  ],
  Carrefour: [
    { type: "sconto", description: "Sconto carta su latticini", value: "-12%" },
    { type: "promo", description: "Promo quinoa e cereali", value: "-30%" },
    { type: "punti", description: "Punti bonus settimana benessere", value: "+300 pt" },
  ],
  Conad: [
    { type: "sconto", description: "Sconto Carta Insieme su freschi", value: "-8%" },
    { type: "coupon", description: "Coupon personalizzato salmone", value: "-€1.00" },
    { type: "punti", description: "Raccolta punti accelerata", value: "+100 pt" },
  ],
};

const benefitIcons = {
  sconto: Tag,
  punti: Star,
  coupon: Gift,
  promo: Tag,
};

const LoyaltyCard = () => {
  const [activeCards, setActiveCards] = useState<Set<string>>(new Set());
  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  const toggleCard = (name: string) => {
    if (activeCards.has(name)) {
      setActiveCards((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
      return;
    }
    setLoadingCard(name);
    setTimeout(() => {
      setActiveCards((prev) => new Set(prev).add(name));
      setLoadingCard(null);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
          <CreditCard className="h-4 w-4 text-primary" />
          Carte fedeltà
        </h3>
        <p className="text-xs text-muted-foreground">Collega per stime personalizzate con sconti e promozioni riservate.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {loyaltyPrograms.map((p) => (
          <button
            key={p.name}
            onClick={() => toggleCard(p.name)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeCards.has(p.name)
                ? `${p.color} shadow-sm`
                : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
            }`}
          >
            <span className="text-lg">{p.logo}</span>
            <span className={activeCards.has(p.name) ? "text-foreground" : ""}>{p.name}</span>
            {loadingCard === p.name && <Loader2 className="h-3.5 w-3.5 animate-spin ml-auto text-muted-foreground" />}
            {activeCards.has(p.name) && <Check className="h-3.5 w-3.5 ml-auto text-primary" />}
          </button>
        ))}
      </div>

      {/* Benefits display */}
      {activeCards.size > 0 && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-start gap-2 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2">
            <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Stima personalizzata basata su promozioni e vantaggi fedeltà disponibili.
            </p>
          </div>

          {Array.from(activeCards).map((cardName) => (
            <div key={cardName} className="rounded-xl border border-border/40 bg-card p-4">
              <p className="text-xs font-semibold text-foreground mb-2">Vantaggi {cardName}</p>
              <div className="space-y-1.5">
                {mockBenefits[cardName]?.map((b, i) => {
                  const Icon = benefitIcons[b.type];
                  return (
                    <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs text-foreground">{b.description}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-semibold">{b.value}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoyaltyCard;
