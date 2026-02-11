import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const Generating = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/risultati"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 animate-pulse-soft">
          <Leaf className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-foreground">
          Stiamo creando il tuo menu ideale…
        </h1>
        <p className="text-muted-foreground">
          Ci vorrà solo un momento. Stiamo scegliendo le ricette perfette per te.
        </p>
        <div className="mt-10 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generating;
