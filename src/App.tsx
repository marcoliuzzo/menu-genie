import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Supermarket from "./pages/Supermarket";
import Profile from "./pages/Profile";
import Generating from "./pages/Generating";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProfileProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/come-funziona" element={<HowItWorks />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/supermercato" element={<Supermarket />} />
            <Route path="/profilo" element={<Profile />} />
            <Route path="/generazione" element={<Generating />} />
            <Route path="/risultati" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
