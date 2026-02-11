import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-secondary py-12">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Leaf className="h-5 w-5 text-primary" />
        <span className="font-semibold text-foreground">Spesa Intelligente</span>
      </div>
      <p className="mb-6 text-muted-foreground">
        Mangiare bene non deve essere complicato.
      </p>
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <button className="transition-colors hover:text-foreground">About</button>
        <button className="transition-colors hover:text-foreground">Contatti</button>
      </div>
      <p className="mt-8 text-xs text-muted-foreground/60">
        © 2026 Spesa Intelligente. Tutti i diritti riservati.
      </p>
    </div>
  </footer>
);

export default Footer;
