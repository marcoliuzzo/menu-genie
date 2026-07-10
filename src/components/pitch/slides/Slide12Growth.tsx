import SlideShell from "../SlideShell";

const nodes = ["Utenti", "Più dati", "AI migliore", "Esperienza migliore", "Più utenti"];

const Slide12Growth = () => {
  const radius = 170;
  const cx = 220;
  const cy = 220;
  return (
    <SlideShell eyebrow="Growth engine">
      <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-center">
        Ogni utente rende il prodotto <span className="gradient-primary-text">migliore</span>.
      </h2>
      <div className="mt-10 flex justify-center">
        <div className="relative" style={{ width: cx * 2, height: cy * 2 }}>
          <svg
            className="absolute inset-0"
            viewBox={`0 0 ${cx * 2} ${cy * 2}`}
            fill="none"
          >
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke="hsl(var(--accent))"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          </svg>
          {nodes.map((n, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            return (
              <div
                key={n}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm font-semibold text-foreground text-center min-w-[120px] shadow-sm"
                style={{ left: x, top: y }}
              >
                {n}
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
};

export default Slide12Growth;
