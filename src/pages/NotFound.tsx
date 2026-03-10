import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-3 text-5xl font-bold text-foreground md:text-6xl">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Pagina non trovata</p>
        <Button
          variant="outline"
          className="rounded-full gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
