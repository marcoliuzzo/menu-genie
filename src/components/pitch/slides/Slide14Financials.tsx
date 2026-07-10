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
} from "recharts";

const users = [
  { y: "Y1", v: 12 }, { y: "Y2", v: 85 }, { y: "Y3", v: 250 },
];
const premium = [
  { y: "Y1", v: 1 }, { y: "Y2", v: 8 }, { y: "Y3", v: 20 },
];
const revenue = [
  { y: "Y1", v: 0.05 }, { y: "Y2", v: 1.1 }, { y: "Y3", v: 4.2 },
];
const breakeven = [
  { y: "M6", v: -180 }, { y: "M12", v: -260 }, { y: "M18", v: -220 },
  { y: "M24", v: -80 }, { y: "M28", v: 0 }, { y: "M36", v: 320 },
];

const charts = [
  { title: "Crescita utenti", subtitle: "0 → 250K entro Anno 3", data: users, unit: "K utenti" },
  { title: "Utenti Premium", subtitle: "Conversion 8% entro Anno 3", data: premium, unit: "K premium" },
  { title: "Ricavi", subtitle: "€4.2M ARR entro Anno 3", data: revenue, unit: "€M ARR" },
  { title: "Break-even", subtitle: "Mese 28 — EBITDA positivo", data: breakeven, unit: "€K" },
];

const Slide14Financials = () => {
  const { step } = useStep();
  const c = charts[Math.min(step, charts.length - 1)];
  return (
    <SlideShell eyebrow="Financial highlights" background="white">
      <div className="min-h-[75vh] flex flex-col items-center justify-center">
        <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          {String(step + 1).padStart(2, "0")} / {String(charts.length).padStart(2, "0")}
        </div>
        <h2 key={c.title} className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-foreground animate-fade-in">
          {c.title}
        </h2>
        <p className="mt-2 text-muted-foreground">{c.subtitle}</p>

        <GlassCard className="mt-8 w-full max-w-3xl p-6">
          <div key={c.title} className="h-[320px] animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={c.data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(222 100% 59%)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(160 36% 36%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={12} />
                <YAxis stroke="hsl(0 0% 42%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid hsl(30 12% 90%)",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`${v} ${c.unit}`, ""]}
                />
                {c.title === "Break-even" && (
                  <ReferenceLine y={0} stroke="hsl(160 36% 36%)" strokeDasharray="3 3" />
                )}
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="hsl(222 100% 59%)"
                  strokeWidth={2.5}
                  fill="url(#area)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </SlideShell>
  );
};

export default Slide14Financials;
