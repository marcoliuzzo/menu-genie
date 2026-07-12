import SlideShell from "../SlideShell";
import GlassCard from "../GlassCard";
import StepReveal from "../StepReveal";

const team = [
  {
    name: "Marco Liuzzo",
    role: "CEO & CMO",
    responsibility: "Guida strategica, marketing, growth, partnership e fundraising.",
    why: "Digital Marketing, esperienza in Bertazzoni, Ezeta Consulting e Allmobility. Profilo orientato al mercato.",
  },
  {
    name: "Alessandro Sacchi",
    role: "CFO",
    responsibility: "Pianificazione finanziaria, budgeting, controllo di gestione e investor relations.",
    why: "Autore del piano economico-finanziario. Conosce a fondo la sostenibilità del business.",
  },
  {
    name: "Giuseppe Terranova",
    role: "CPO",
    responsibility: "Roadmap prodotto, UX, funzionalità, testing e coordinamento sviluppo.",
    why: "Responsabile dell'evoluzione del prodotto e del ponte tra bisogni utente e sviluppo.",
  },
  {
    name: "Siria Tamborra",
    role: "COO",
    responsibility: "Organizzazione interna, processi, coordinamento attività, HR e amministrazione.",
    why: "Consulenza del Lavoro. Esperienza in HR, payroll e supporto gestionale.",
  },
  {
    name: "Giovanna Serena Monghini",
    role: "CIRO",
    responsibility: "R&D, validazione scientifica, trend alimentari e sviluppo nuove funzionalità.",
    why: "Wageningen University, EIT Food Master, Nestlé R&D, Revo Foods. Profilo internazionale.",
  },
  {
    name: "Lorenzo Rossetti",
    role: "CBDO",
    responsibility: "Partnership con nutrizionisti, palestre, supermercati e sviluppo commerciale.",
    why: "Magistrale in Nutrizione Umana. Ponte tra prodotto ed ecosistema salute e wellness.",
  },
  {
    name: "Lisa Landuzzi",
    role: "CQCO",
    responsibility: "Qualità, sicurezza alimentare, compliance normativa e gestione dati food.",
    why: "Master in Food Safety Management. Certificazioni auditor BRC, IFS, ISO 22000.",
  },
];

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

const Slide15Team = () => (
  <SlideShell eyebrow="Team" background="mesh">
    <div className="min-h-[75vh] flex flex-col justify-center py-4">
      <StepReveal at={0} className="text-center">
        <h2 className="type-premium text-[clamp(2rem,5vw,3.5rem)] text-foreground">
          7 founder. <span className="gradient-primary-text">Una visione.</span>
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Competenze complementari che coprono l'intera catena del valore.
        </p>
      </StepReveal>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((f, i) => (
          <StepReveal key={f.name} at={0} delay={i * 60}>
            <GlassCard className="p-5 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(160 36% 36%), hsl(222 100% 59%))",
                  }}
                >
                  {initials(f.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground leading-tight truncate">{f.name}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] gradient-primary-text font-semibold mt-0.5">
                    {f.role}
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-left">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/80 mb-1">
                    Responsabilità
                  </div>
                  <p className="text-xs text-foreground/85 leading-snug">{f.responsibility}</p>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/80 mb-1">
                    Perché
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{f.why}</p>
                </div>
              </div>
            </GlassCard>
          </StepReveal>
        ))}
      </div>
    </div>
  </SlideShell>
);

export default Slide15Team;
