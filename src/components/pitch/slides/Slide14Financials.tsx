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
} from "recharts";

// Financial coherence — Business Plan projections
const revenue    = [{ y: "Y1", v: 0.08 }, { y: "Y2", v: 1.2 }, { y: "Y3", v: 4.5 }];
const premium    = [{ y: "Y1", v: 1.2 },  { y: "Y2", v: 8 },   { y: "Y3", v: 22 }];
const ebitda     = [{ y: "Y1", v: -420 }, { y: "Y2", v: -180 }, { y: "Y3", v: 640 }];
const breakeven  = [
  { y: "M6", v: -180 }, { y: "M12", v: -320 }, { y: "M18", v: -260 },
  { y: "M24", v: -110 }, { y: "M30", v: 0 }, { y: "M36", v: 420 },
];

const steps = [
  { title: "Ricavi",         subtitle: "€4,5M ARR entro l'Anno 3", data: revenue,   unit: "€M ARR",     type: "area" },
  { title: "Utenti Premium", subtitle: "22K premium — conversion ~8%", data: premium, unit: "K utenti", type: "bar" },
  { title: "EBITDA",         subtitle: "Da −420K a +640K in tre anni", data: ebitda, unit: "€K",       type: "area" },
  { title: "Break-even",     subtitle: "Cash flow positivo al mese 30", data: breakeven, unit: "€K",   type: "area", highlight: true },
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

        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <GlassCard className={`p-6 ${isBreakeven ? "md:col-span-3" : "md:col-span-5"}`} glow={isBreakeven}>
            <div key={c.title} className="h-[340px] animate-fade-in">
              <ResponsiveContainer width="100%" height="100%">
                {c.type === "bar" ? (
                  <BarChart data={c.data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={12} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [`${v} ${c.unit}`, ""]}
                    />
                    <Bar dataKey="v" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={c.data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={12} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [`${v} ${c.unit}`, ""]}
                    />
                    {(c.title === "Break-even" || c.title === "EBITDA") && (
                      <ReferenceLine y={0} stroke="hsl(160 36% 36%)" strokeDasharray="3 3" />
                    )}
                    <Area type="monotone" dataKey="v" stroke="hsl(222 100% 59%)" strokeWidth={2.5} fill="url(#areaGrad)" />
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
                Modello scalabile, con leva SaaS + revenue share retail e advertising contestuale.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide14Financials;
