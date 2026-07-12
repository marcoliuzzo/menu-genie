import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import { useStep } from "../stepContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  BarChart,
  Bar,
  LabelList,
  CartesianGrid,
} from "recharts";

// Financial coherence — Business Plan projections (valori assoluti in €)
const revenue = [
  { y: "Anno 1", v: 23940 },
  { y: "Anno 2", v: 136912 },
  { y: "Anno 3", v: 337280 },
];
const premium = [
  { y: "Anno 1", v: 500 },
  { y: "Anno 2", v: 2400 },
  { y: "Anno 3", v: 6000 },
];
const ebitda = [
  { y: "Anno 1", v: -50549 },
  { y: "Anno 2", v: -45227 },
  { y: "Anno 3", v: 92396 },
];
const netResult = [
  { y: "Anno 1", v: -69149 },
  { y: "Anno 2", v: -88681 },
  { y: "Anno 3", v: 4861 },
];

const eur = (n: number) =>
  n.toLocaleString("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const num = (n: number) => n.toLocaleString("it-IT");

const steps = [
  {
    title: "Ricavi",
    subtitle: "Da 23.940 € a 337.280 € in tre anni",
    data: revenue,
    type: "area" as const,
    format: eur,
  },
  {
    title: "Utenti Premium",
    subtitle: "500 → 2.400 → 6.000 abbonati (3,99 €/mese)",
    data: premium,
    type: "bar" as const,
    format: num,
  },
  {
    title: "EBITDA",
    subtitle: "Da −50.549 € a +92.396 €",
    data: ebitda,
    type: "area" as const,
    format: eur,
  },
  {
    title: "Risultato Netto",
    subtitle: "Break-even raggiunto al terzo anno",
    data: netResult,
    type: "area" as const,
    format: eur,
    highlight: true,
  },
];

const Slide14Financials = () => {
  const { step } = useStep();
  const idx = Math.min(step, steps.length - 1);
  const c = steps[idx];
  const isBreakeven = idx === steps.length - 1;

  return (
    <SlideShell eyebrow="Financial highlights" background="white">
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          {String(idx + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </div>
        <h2 key={c.title} className="mt-4 type-premium text-[clamp(2rem,5vw,3.5rem)] text-foreground animate-fade-in">
          {c.title}
        </h2>
        <p className="mt-2 text-muted-foreground">{c.subtitle}</p>

        <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <GlassCard className={`p-6 ${isBreakeven ? "md:col-span-3" : "md:col-span-5"}`} glow={isBreakeven}>
            <div key={c.title} className="h-[340px] animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                {c.type === "bar" ? (
                  <BarChart data={c.data} margin={{ top: 30, right: 30, left: 20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 12% 90%)" vertical={false} />
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={13} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={12} tickFormatter={(v) => num(v)} width={70} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [c.format(v), ""]}
                    />
                    <Bar dataKey="v" fill="url(#barGrad)" radius={[8, 8, 0, 0]}>
                      <LabelList
                        dataKey="v"
                        position="top"
                        formatter={(v: number) => c.format(v)}
                        style={{ fill: "hsl(222 40% 20%)", fontSize: 14, fontWeight: 700 }}
                      />
                    </Bar>
                  </BarChart>
                ) : (
                  <AreaChart data={c.data} margin={{ top: 30, right: 30, left: 20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 12% 90%)" vertical={false} />
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={13} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={12} tickFormatter={(v) => num(v)} width={80} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [c.format(v), ""]}
                    />
                    <ReferenceLine y={0} stroke="hsl(160 36% 36%)" strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="v" stroke="hsl(222 100% 59%)" strokeWidth={2.5} fill="url(#areaGrad)">
                      <LabelList
                        dataKey="v"
                        position="top"
                        formatter={(v: number) => c.format(v)}
                        style={{ fill: "hsl(222 40% 20%)", fontSize: 14, fontWeight: 700 }}
                      />
                    </Area>
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {isBreakeven && (
            <GlassCard glow className="md:col-span-2 p-8 text-center animate-fade-in">
              <div className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">Milestone</div>
              <div className="mt-3 type-premium-tight text-4xl md:text-5xl gradient-primary-text leading-[0.95]">
                BREAK-EVEN
              </div>
              <div className="mt-3 type-premium text-2xl md:text-3xl text-foreground">
                AL TERZO ANNO
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Modello scalabile con leva SaaS, advertising contestuale e servizi premium.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide14Financials;
