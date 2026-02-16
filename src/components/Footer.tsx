import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => (
  <footer>
    {/* CTA finale */}
    <section className="py-24 px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Riduci lo stress. Risparmia tempo. Vivi meglio.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        Unisciti a chi ha già semplificato la propria spesa settimanale.
      </p>
      <Button
        size="lg"
        className="mt-8 rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
        onClick={() => window.location.href = "/profilo"}
      >
        Prova la demo
      </Button>
    </section>

    {/* Footer minimal */}
    <div className="border-t border-border/40 py-8 px-4">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-semibold text-foreground">Spesa Smart</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <button className="transition-colors hover:text-foreground">About</button>
          <button className="transition-colors hover:text-foreground">Contatti</button>
          <button className="transition-colors hover:text-foreground">Privacy</button>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © 2026 Spesa Smart
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
