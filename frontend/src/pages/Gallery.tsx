import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  ImageIcon,
  Heart,
  Share2,
  Download,
  Eye,
  Sparkles,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function Gallery() {
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();
      const { toast } = useToast();



  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await api.getMyMemes();
        setMemes(res.data);
      } catch (err) {
        console.error("Erreur de chargement des memes", err);
      }
    };
    fetchMemes();
  }, []);

 const handleDelete = async (id: string) => {
  try {
    await api.deleteMeme(id);
    setMemes((prev) => prev.filter((meme) => meme._id !== id));
    toast({
      title: "Supprimé",
      description: "Le meme a été supprimé avec succès.",
    });
  } catch (err) {
    console.error("Erreur de suppression", err);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de la suppression.",
      variant: "destructive",
    });
  }
};


  const handleShare = async (id: string) => {
  try {
    await api.shareMeme(id);
    toast({
      title: "Succès",
      description: "Meme partagé avec succès !",
    });
  } catch (err) {
    console.error("Erreur lors du partage", err);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors du partage.",
      variant: "destructive",
    });
  }
};


 const handleDownload = async (filename: string) => {
  const url = `http://13.60.245.143:5000/uploads/${filename}`;
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);

    toast({
      title: "Téléchargement",
      description: "Le meme a été téléchargé avec succès.",
    });
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err);
    toast({
      title: "Erreur",
      description: "Impossible de télécharger ce fichier.",
      variant: "destructive",
    });
  }
};




  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ma Galerie
            </h1>
            <p className="text-lg text-gray-600">
              Retrouvez tous vos memes créés
            </p>
          </div>
        </div>

        {/* Memes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memes.map((meme, index) => (
          <Card
  key={meme._id}
  className="group hover:shadow-lg transition-shadow duration-300"
>
  <CardContent className="p-0">
    {/* Image */}
    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
      <img
        src={`http://localhost:5000/uploads/${meme.image}`}
        alt="Meme"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenu */}
    <div className="p-4">
      {/* Titre et badge */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 truncate">
          Meme {index + 1}
        </h3>
        <Badge variant="outline">
          <Eye className="w-4 h-4 mr-1" />
          Private
        </Badge>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4">
        {new Date(meme.createdAt).toLocaleDateString()}
      </p>

      {/* Groupe d'actions (icônes uniquement) */}
      <div className="flex items-center gap-3">
         <Button
          size="icon"
          onClick={() => navigate("/generator", { state: { meme } })}
          variant="outline"
          title="Éditer"

        >
          <Pencil className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          onClick={() => handleDownload(meme.image)}
          title="Télécharger"
          className="bg-primary text-white hover:bg-primary/90 ml-7"
        >
          <Download className="w-4 h-4" />
        </Button>

        {/* Partager */}
        <Button
          size="icon"
          onClick={() => handleShare(meme._id)}
          title="Partager"
          className="bg-primary text-white hover:bg-primary/90 ml-7"
        >
          <Share2 className="w-4 h-4" />
        </Button>

       
        <Button
  size="icon"
  onClick={() => handleDelete(meme._id)}
  title="Supprimer"
  className="bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200 ml-7"
>
  <Trash2 className="w-4 h-4" />
</Button>


       
      </div>
    </div>
  </CardContent>
</Card>

          ))}

          {/* Create New Meme Card */}
          <Link to="/generator">
            <Card className="group hover:shadow-lg transition-all duration-300 border-dashed border-2 border-gray-300 hover:border-primary cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900 mb-2">
                      Créer un nouveau meme
                    </p>
                    <p className="text-sm text-gray-500">
                      Cliquez pour commencer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Empty state */}
        {memes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun meme pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier meme !
            </p>
            <Link to="/generator">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier meme
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
