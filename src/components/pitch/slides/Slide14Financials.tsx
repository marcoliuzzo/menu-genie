import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import StepReveal from "../StepReveal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
  CartesianGrid,
} from "recharts";

const revenue = [
  { y: "Anno 1", v: 24000 },
  { y: "Anno 2", v: 137000 },
  { y: "Anno 3", v: 337000 },
];
const premium = [
  { y: "Anno 1", v: 500 },
  { y: "Anno 2", v: 2400 },
  { y: "Anno 3", v: 6000 },
];

const eur = (n: number) =>
  `€${Math.round(n / 1000)}k`;
const num = (n: number) => n.toLocaleString("it-IT");

const kpis = [
  { label: "Ricavi Anno 3", value: "€337k" },
  { label: "Utenti Premium", value: "6.000" },
  { label: "EBITDA Anno 3", value: "€92k" },
  { label: "Break-even", value: "Anno 3", highlight: true },
];

const Slide14Financials = () => {
  return (
    <SlideShell eyebrow="Financial highlights" background="white">
      <div className="min-h-[80vh] flex flex-col justify-center py-6">
        <StepReveal at={0}>
          <h2 className="type-premium text-[clamp(1.75rem,4vw,3rem)] text-foreground max-w-5xl leading-[1.15]">
            Crescita sostenibile e
            <span className="block gradient-primary-text">break-even al terzo anno.</span>
          </h2>
        </StepReveal>

        {/* KPI Cards */}
        <StepReveal at={0} delay={120}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <GlassCard
                key={k.label}
                glow={k.highlight}
                className="p-5 text-center"
                style={
                  k.highlight
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(160 36% 36% / 0.12), hsl(222 100% 59% / 0.16))",
                        borderColor: "hsl(222 100% 59% / 0.5)",
                      }
                    : {}
                }
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {k.label}
                </div>
                <div
                  className={`mt-2 type-premium-tight text-3xl md:text-4xl leading-tight ${
                    k.highlight ? "gradient-primary-text" : "text-foreground"
                  }`}
                >
                  {k.value}
                </div>
              </GlassCard>
            ))}
          </div>
        </StepReveal>

        {/* Charts */}
        <StepReveal at={1} delay={100}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <GlassCard className="p-5">
              <div className="flex items-baseline justify-between">
                <div className="type-premium text-lg text-foreground">Ricavi</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  3 anni
                </div>
              </div>
              <div className="h-[240px] mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenue} margin={{ top: 30, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 12% 90%)" vertical={false} />
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={12} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={11} tickFormatter={eur} width={50} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [eur(v), "Ricavi"]}
                    />
                    <Area type="monotone" dataKey="v" stroke="hsl(222 100% 59%)" strokeWidth={2.5} fill="url(#revGrad)">
                      <LabelList
                        dataKey="v"
                        position="top"
                        formatter={(v: number) => eur(v)}
                        style={{ fill: "hsl(222 40% 20%)", fontSize: 13, fontWeight: 700 }}
                      />
                    </Area>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-baseline justify-between">
                <div className="type-premium text-lg text-foreground">Utenti Premium</div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  3 anni
                </div>
              </div>
              <div className="h-[240px] mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={premium} margin={{ top: 30, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barPrem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(222 100% 59%)" />
                        <stop offset="100%" stopColor="hsl(160 36% 36%)" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 12% 90%)" vertical={false} />
                    <XAxis dataKey="y" stroke="hsl(0 0% 42%)" fontSize={12} />
                    <YAxis stroke="hsl(0 0% 42%)" fontSize={11} tickFormatter={num} width={50} />
                    <Tooltip
                      contentStyle={{ background: "white", border: "1px solid hsl(30 12% 90%)", borderRadius: 8 }}
                      formatter={(v: number) => [num(v), "Utenti"]}
                    />
                    <Bar dataKey="v" fill="url(#barPrem)" radius={[8, 8, 0, 0]}>
                      <LabelList
                        dataKey="v"
                        position="top"
                        formatter={(v: number) => num(v)}
                        style={{ fill: "hsl(222 40% 20%)", fontSize: 13, fontWeight: 700 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        </StepReveal>

        <StepReveal at={2} delay={150}>
          <p className="mt-6 text-center text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            Break-even raggiunto nel terzo anno grazie alla crescita degli utenti Premium
            e alla scalabilità del modello digitale.
          </p>
        </StepReveal>
      </div>
    </SlideShell>
  );
};

export default Slide14Financials;
