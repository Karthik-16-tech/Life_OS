import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Preloader from "@/components/Preloader";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import FoodIntelligence from "./pages/FoodIntelligence";
import MindMirror from "./pages/MindMirror";
import AIDoctor from "./pages/AIDoctor";
import Fitness from "./pages/Fitness";
import TimeMachine from "./pages/TimeMachine";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food" element={<FoodIntelligence />} />
            <Route path="/mind" element={<MindMirror />} />
            <Route path="/doctor" element={<AIDoctor />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/timemachine" element={<TimeMachine />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
