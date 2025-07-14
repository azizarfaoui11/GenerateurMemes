import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "../services/api";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.login(email, password);

      toast({
        title: "Succès",
        description: `Bienvenue ${email}!`,
      });

      const { token, user } = response;

      if (token && user?.role) {
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/landingpage");
      } else {
        setError("Identifiants invalides ou rôle utilisateur manquant");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la connexion");
      toast({
        title: "Erreur",
        description: "Identifiants invalides.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary to-gradient-end flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left side */}
          <div className="lg:w-1/2 bg-gradient-to-br from-primary to-secondary text-white p-10 flex flex-col justify-center items-center relative">
            <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-6xl lg:text-7xl mb-6">
              🔐
            </div>
            <h2 className="text-3xl font-bold mb-2">Bon retour !</h2>
            <p className="text-white/90 text-lg text-center max-w-sm">
              Connecte-toi pour continuer à créer des memes inoubliables !
            </p>
          </div>

          {/* Right side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center h-full">
            <div className="w-full max-w-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Connexion
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                    Adresse e-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                {/* Forgot */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline transition-colors"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-white text-primary hover:bg-white/90 py-3 px-4 rounded-xl font-semibold shadow-md transition-colors"
                >
                  Se connecter
                </Button>

                {/* Message */}
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  S’inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
