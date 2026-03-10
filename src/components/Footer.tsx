import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer>
      {/* CTA finale */}
      <section className="py-16 px-4 text-center md:py-24">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          Riduci lo stress. Risparmia tempo. Vivi meglio.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:mt-4 md:text-base">
          Unisciti a chi ha già semplificato la propria spesa settimanale.
        </p>
        <Button
          size="lg"
          className="mt-6 rounded-full bg-accent px-10 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 md:mt-8"
          onClick={() => navigate("/demo")}
        >
          Prova la demo
        </Button>
      </section>

      {/* Footer minimal */}
      <div className="border-t border-border/40 py-6 px-4 md:py-8">
        <div className="container flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4">
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
};

export default Footer;
