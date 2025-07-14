import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as FaIcons from "react-icons/fa";
import { api } from "../services/api";
import { Role } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    role: Role.USER,
     avatar: null as File | null,
  });

  const FaUser = FaIcons.FaUser;
  const FaEnvelope = FaIcons.FaEnvelope;
  const FaLock = FaIcons.FaLock;
  const FaPhone = FaIcons.FaPhone;
  const FaImage = FaIcons.FaImage;

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("nom", formData.nom);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("telephone", formData.telephone);
       if (formData.avatar) data.append("avatar", formData.avatar);

      await api.register(data);
      setSuccessMessage("Inscription réussie ! Redirection...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary to-gradient-end flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left illustration */}
          <div className="lg:w-1/2 bg-gradient-to-br from-primary to-secondary text-white p-10 flex flex-col justify-center items-center relative">
            <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-6xl lg:text-7xl mb-6">
              🧠
            </div>
            <h2 className="text-3xl font-bold mb-2">Bienvenue !</h2>
            <p className="text-white/90 text-lg text-center max-w-sm">
              Créez un compte pour commencer à créer des memes épiques !
            </p>
          </div>

          {/* Right form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inscription</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom */}
              <div className="flex items-center border rounded-lg px-3">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex items-center border rounded-lg px-3">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Adresse e-mail"
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="flex items-center border rounded-lg px-3">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Confirmer mot de passe */}
              <div className="flex items-center border rounded-lg px-3">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="flex items-center border rounded-lg px-3">
                <FaPhone className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Numéro de téléphone"
                  className="w-full p-3 focus:outline-none"
                  required
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaImage className="text-gray-500 mr-2" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Bouton submit */}
              <Button
                type="submit"
                className="w-full bg-white text-primary hover:bg-white/90 py-3 px-4 rounded-xl font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <FaUser />
                Créer un compte
              </Button>

              {/* Message d'erreur ou de succès */}
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}
            </form>

            {/* Lien vers login */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
