import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import planeatLogo from "@/assets/planeat-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Presentazione", path: "/presentazione" },
  { label: "Pitch", path: "/pitch" },
  { label: "Come funziona", path: "/come-funziona" },
  { label: "Demo", path: "/demo" },
  { label: "Dashboard", path: "/dashboard" },
];

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="PlanEat home">
          <img
            src={planeatLogo}
            alt="PlanEat"
            className="h-9 w-auto md:h-10"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                location.pathname === l.path
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            size="sm"
            className="ml-3 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm shadow-accent/20 transition-all duration-200 hover:shadow-md hover:shadow-accent/30 hover:scale-105"
            asChild
          >
            <Link to="/demo">Prova gratis</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium transition-colors ${
                location.pathname === l.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button
            size="sm"
            className="mt-2 w-full rounded-full bg-accent text-accent-foreground"
            asChild
          >
            <Link to="/demo" onClick={() => setMobileOpen(false)}>Prova gratis</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
