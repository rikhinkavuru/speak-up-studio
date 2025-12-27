import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import ParentSignup from "./pages/ParentSignup";
import ParentLogin from "./pages/ParentLogin";
import CreateKidProfile from "./pages/CreateKidProfile";
import ParentDashboard from "./pages/ParentDashboard";
import KidProgress from "./pages/KidProgress";
import KidLogin from "./pages/KidLogin";
import KidDashboard from "./pages/KidDashboard";
import KidBadges from "./pages/KidBadges";
import KidProfile from "./pages/KidProfile";
import LessonVoices from "./pages/lessons/LessonVoices";
import LessonFamousPeople from "./pages/lessons/LessonFamousPeople";
import LessonBraveSpeaking from "./pages/lessons/LessonBraveSpeaking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/parent/signup" element={<ParentSignup />} />
            <Route path="/parent/login" element={<ParentLogin />} />
            <Route path="/parent/create-kid" element={<CreateKidProfile />} />
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/kid/:kidId" element={<KidProgress />} />
            <Route path="/kid/login" element={<KidLogin />} />
            <Route path="/kid/home" element={<KidDashboard />} />
            <Route path="/kid/badges" element={<KidBadges />} />
            <Route path="/kid/profile" element={<KidProfile />} />
            <Route path="/kid/lesson/voices" element={<LessonVoices />} />
            <Route path="/kid/lesson/famous-people" element={<LessonFamousPeople />} />
            <Route path="/kid/lesson/brave-speaking" element={<LessonBraveSpeaking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
