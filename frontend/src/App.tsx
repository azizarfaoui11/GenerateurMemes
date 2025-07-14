import { useLocation, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Generator from "./pages/Generator";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicPage from "./pages/public";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/login", "/register","/"];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!shouldHideNavbar && <Navigation />}
        <Routes>
          <Route path="/landingpage" element={<Index />} />
           <Route path="/" element={<Login />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
