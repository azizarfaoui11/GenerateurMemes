import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Home, Zap, ImageIcon, Menu, X, LogOut, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { api } from "@/services/api";

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profile, setProfile] = useState<any>(null);


  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();


  const navItems = [
    { path: "/landingpage", label: "Accueil", icon: Home },
    { path: "/generator", label: "Créateur", icon: Zap },
    { path: "/gallery", label: "Galerie", icon: ImageIcon },
    { path: "/public", label: "Public", icon: Globe },

  ];

useEffect(() => {
    const fetchData = async () => {
      try {
        const profilres = await api.getuserprofil();
        setProfile(profilres.data);
         const token = localStorage.getItem('token');
        if (token) {
          const userId = profilres.data._id;
        }
      } catch (err) {
        console.error('Erreur chargement profil', err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
  try {
    await api.logout();
    localStorage.removeItem("userRole");
    navigate("/login"); 
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MemeGen
            </span>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Pro
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/generator">
             <Button 
  onClick={handleLogout}
  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 p-2 rounded-full shadow-lg"
  title="Se déconnecter"
>
  <LogOut className="w-5 h-5 text-white" />
</Button>

            </Link>
              <div className="relative group">
              <Avatar >
                <img
                  src={
                    profile?.avatar
                      ? `https://genmemes.duckdns.org/uploads/${profile.avatar}`
                      : "https://placehold.co/96x96?text=User"
                  }
                  alt="Avatar utilisateur"
                  className="object-cover w-12 h-12 rounded-full"
                />
              </Avatar>
              
            </div>








          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:text-primary hover:bg-primary/5",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-gray-200/50">
                <Link to="/generator" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Zap className="w-4 h-4 mr-2" />
                    Créer un meme
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
