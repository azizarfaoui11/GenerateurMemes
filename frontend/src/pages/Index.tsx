import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Download,
  Share2,
  Image as ImageIcon,
  Type,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-primary to-gradient-end">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 pt-14 pb-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-8">
              
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Créez des{" "}
              <span className="bg-gradient-to-r from-warning to-secondary bg-clip-text text-transparent">
                memes
              </span>{" "}
              incroyables 
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              L'outil ultime pour créer, personnaliser et partager vos memes.
              Téléchargez une image, ajoutez votre texte et créez du contenu
              viral en quelques clics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/generator">
                <Button
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl font-semibold shadow-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Créer un meme
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link to="/gallery">
                <Button
                  className="border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl font-semibold"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Voir la galerie
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">+10k créateurs</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">+1M memes créés</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span className="font-medium">100% gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour créer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des outils simples et puissants pour donner vie à vos idées
              créatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Téléchargement d'images
                </h3>
                <p className="text-gray-600">
                  Importez vos images depuis votre ordinateur ou choisissez
                  parmi nos templates populaires
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Type className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Texte personnalisé
                </h3>
                <p className="text-gray-600">
                  Ajoutez du texte avec différentes polices, tailles et couleurs
                  pour un impact maximum
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-warning rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Aperçu en temps réel
                </h3>
                <p className="text-gray-600">
                  Visualisez vos modifications instantanément avec notre éditeur
                  en temps réel
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Téléchargement HD
                </h3>
                <p className="text-gray-600">
                  Sauvegardez vos créations en haute qualité pour un partage
                  optimal
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Partage social</h3>
                <p className="text-gray-600">
                  Partagez directement sur vos réseaux sociaux préférés en un
                  clic
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Galerie personnelle
                </h3>
                <p className="text-gray-600">
                  Retrouvez et gérez tous vos memes créés dans votre galerie
                  personnelle
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="mx-auto max-w-4xl text-center px-6 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Prêt à créer votre premier meme ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez des milliers de créateurs et commencez à créer du contenu
            viral dès maintenant
          </p>
          <Link to="/generator">
            <Button
              className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 rounded-xl font-bold shadow-lg"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Commencer gratuitement
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
