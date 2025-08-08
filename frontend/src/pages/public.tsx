import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Sparkles,
  Eye,
} from "lucide-react";
import { api } from "@/services/api";

export default function PublicPage() {
const [memes, setMemes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicMemes = async () => {
      try {
        const res = await api.getPublicMemes(); // cette méthode est à ajouter dans ton fichier api.ts
        setMemes(res.data);
      } catch (err) {
        console.error("Erreur de chargement des memes publics", err);
      }
    };
    fetchPublicMemes();
  }, []);
const handleLike = async (id: string) => {
  try {
    const res = await api.likeMeme(id);
    setMemes((prev) =>
      prev.map((m) => (m._id === id ? res.data : m))
    );
  } catch (err) {
    console.error("Erreur lors du like :", err);
  }
};

const handleLove = async (id: string) => {
  try {
    const res = await api.loveMeme(id);
    setMemes((prev) =>
      prev.map((m) => (m._id === id ? res.data : m))
    );
  } catch (err) {
    console.error("Erreur lors du love :", err);
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

    // Libère la mémoire après téléchargement
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err);
  }
};


  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Memes Publics</h1>
            <p className="text-lg text-gray-600">
              Découvrez les memes partagés par la communauté
            </p>
          </div>
        </div>

        {/* Memes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memes.map((meme, index) => (
         <Card key={meme._id} className="group hover:shadow-lg transition-shadow duration-300">
  <CardContent className="p-0">
    {/* Image */}
    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
      <img
        src={`http://localhost:5000/uploads/${meme.image}`}
        alt="Meme"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Informations */}
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate">Meme {index + 1}</h3>
        <Badge variant="outline">
          <Eye className="w-4 h-4 mr-1" />
          Public
        </Badge>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {new Date(meme.createdAt).toLocaleDateString()}
      </p>

      {/* Boutons d'action : alignés horizontalement */}
      <div className="flex items-center gap-2">
       

        {/* Like */}
        <Button
          variant="outline"
          onClick={() => handleLike(meme._id)}
          className="text-sm flex items-center gap-1"
        >
          👍 <span>{meme.likes || 0}</span>
        </Button>

        {/* Love */}
        <Button
          variant="outline"
          onClick={() => handleLove(meme._id)}
          className="text-sm flex items-center gap-1"
        >
          ❤️ <span>{meme.loves || 0}</span>
        </Button>

         {/* Télécharger (icône seule, coloré) */}
        <Button
          size="icon"
          onClick={() => handleDownload(meme.image)}
          className="text-white bg-primary hover:bg-primary/90 ml-16"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </CardContent>
</Card>


          ))}
        </div>

        {/* Empty State */}
        {memes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun meme public pour le moment
            </h3>
            <p className="text-gray-600 mb-6">Revenez plus tard pour en découvrir !</p>
          </div>
        )}
      </div>
    </div>
  );
}
