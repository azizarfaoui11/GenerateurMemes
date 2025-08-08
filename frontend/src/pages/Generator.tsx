// 🎨 Meme Generator avec Emojis déplaçables
import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Download,
  Share2,
  Type,
  Palette,
  Save,
  Sparkles,
} from "lucide-react";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";


export default function Generator() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingMeme = location.state?.meme;

  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [meduimText, setMeduimText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState([40]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Arial Black");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageHeight, setImageHeight] = useState([600]);
  const [customEmojis, setCustomEmojis] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);
    const { toast } = useToast();


  useEffect(() => {
    if (editingMeme) {
      setImage(`http://13.60.245.143:5000/uploads/${editingMeme.imageorigin}`);
      setTopText(editingMeme.topText || "");
      setMeduimText(editingMeme.meduimText || "");
      setBottomText(editingMeme.bottomText || "");
      setFontSize([editingMeme.fontSize || 40]);
      setFontFamily(editingMeme.fontFamily || "Arial Black");
      setTextColor(editingMeme.textColor || "#FFFFFF");
      setCustomEmojis(editingMeme.customEmojis || []);

    }
  }, [editingMeme]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

 const downloadMeme = useCallback(() => {
  if (!canvasRef.current || !image) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize[0]}px ${fontFamily}`;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    if (topText) {
      const x = canvas.width / 2;
      const y = fontSize[0] + 20;
      ctx.strokeText(topText.toUpperCase(), x, y);
      ctx.fillText(topText.toUpperCase(), x, y);
    }

    if (meduimText) {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      ctx.strokeText(meduimText.toUpperCase(), x, y);
      ctx.fillText(meduimText.toUpperCase(), x, y);
    }

    if (bottomText) {
      const x = canvas.width / 2;
      const y = canvas.height - 20;
      ctx.strokeText(bottomText.toUpperCase(), x, y);
      ctx.fillText(bottomText.toUpperCase(), x, y);
    }

    customEmojis.forEach(({ emoji, x, y }) => {
      ctx.font = `${fontSize[0]}px sans-serif`;
      ctx.fillText(emoji, x, y);
    });

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Téléchargement",
      description: "Meme téléchargé avec succès.",
    });
  };

  img.onerror = () => {
    toast({
      title: "Erreur",
      description: "Impossible de charger l'image source.",
      variant: "destructive",
    });
  };

  img.src = image;
}, [image, topText, meduimText, bottomText, fontSize, textColor, fontFamily, customEmojis]);

  const handleSauvegarde = async () => {
    const blob = await generateFinalMemeBlob();
    if (!blob) return alert("Erreur : Impossible de générer le meme");

    const formData = new FormData();
    formData.append("image", blob, "meme.png");
    formData.append("topText", topText);
    formData.append("meduimText", meduimText);
    formData.append("bottomText", bottomText);
    formData.append("fontSize", fontSize[0].toString());
    formData.append("fontFamily", fontFamily);
    formData.append("textColor", textColor);
    formData.append("customEmojis", JSON.stringify(customEmojis));

    if (fileInputRef.current?.files?.[0]) {
      formData.append("imageorigin", fileInputRef.current.files[0]);
    }

    try {
      if (editingMeme) {
        await api.updateMeme(editingMeme._id, formData);
     } else {
        await api.addMeme(formData);
        toast({
        title: "Succès",
        description: `Meme partagé avec succées!`,
      });  
      }
      navigate("/gallery");
    } catch (err) {
       toast({
        title: "Erreur",
        description: "Oops probléme.",
        variant: "destructive",
      });
      console.error("Erreur sauvegarde", err);
    }
  };

  const generateFinalMemeBlob = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!canvasRef.current || !image) return resolve(null);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize[0]}px ${fontFamily}`;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";

        if (topText) {
          const x = canvas.width / 2;
          const y = fontSize[0] + 20;
          ctx.strokeText(topText.toUpperCase(), x, y);
          ctx.fillText(topText.toUpperCase(), x, y);
        }
        if (meduimText) {
          const x = canvas.width / 2;
          const y = canvas.height / 2;
          ctx.strokeText(meduimText.toUpperCase(), x, y);
          ctx.fillText(meduimText.toUpperCase(), x, y);
        }
        if (bottomText) {
          const x = canvas.width / 2;
          const y = canvas.height - 20;
          ctx.strokeText(bottomText.toUpperCase(), x, y);
          ctx.fillText(bottomText.toUpperCase(), x, y);
        }

        customEmojis.forEach(({ emoji, x, y }) => {
          ctx.font = `${fontSize[0]}px sans-serif`;
          ctx.fillText(emoji, x, y);
        });

        canvas.toBlob((blob) => resolve(blob), "image/png");
      };
      img.src = image;
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[1fr_2fr_1fr] gap-6">
        {/* Outils Gauche */}
        <div className="space-y-6">
          <Card><CardHeader><CardTitle><Upload className="w-4 h-4 mr-2" />Image</CardTitle></CardHeader>
            <CardContent>
              <Input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle><Type className="w-4 h-4 mr-2" />Texte</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Texte haut" value={topText} onChange={(e) => setTopText(e.target.value)} />
              <Input placeholder="Texte milieu" value={meduimText} onChange={(e) => setMeduimText(e.target.value)} />
              <Input placeholder="Texte bas" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle><Palette className="w-4 h-4 mr-2" />Style</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>Taille: {fontSize[0]}px</Label>
              <Slider value={fontSize} onValueChange={setFontSize} max={80} min={20} />
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger><SelectValue placeholder="Police" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial Black">Arial Black</SelectItem>
                  <SelectItem value="Impact">Impact</SelectItem>
                  <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                </SelectContent>
              </Select>
              <Label>Hauteur: {imageHeight[0]}px</Label>
              <Slider value={imageHeight} onValueChange={setImageHeight} max={1000} min={200} />
              <Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Zone centrale - Aperçu */}
        <div className="relative">
          <Card><CardHeader><CardTitle><Sparkles className="w-4 h-4 mr-2" />Aperçu</CardTitle></CardHeader>
            <CardContent>
              {image ? (
                <div className="relative inline-block w-full">
                  <img src={image} alt="preview" style={{ maxHeight: `${imageHeight[0]}px` }} className="rounded-lg shadow" />
                  {topText && <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold text-center" style={{ fontSize: `${fontSize[0]}px`, fontFamily, color: textColor, textShadow: "2px 2px 0 #000" }}>{topText.toUpperCase()}</div>}
                  {meduimText && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center" style={{ fontSize: `${fontSize[0]}px`, fontFamily, color: textColor, textShadow: "2px 2px 0 #000" }}>{meduimText.toUpperCase()}</div>}
                  {bottomText && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold text-center" style={{ fontSize: `${fontSize[0]}px`, fontFamily, color: textColor, textShadow: "2px 2px 0 #000" }}>{bottomText.toUpperCase()}</div>}

                  {/* Emojis déplaçables */}
                  {customEmojis.map(e => (
                    <div
                      key={e.id}
                      className="absolute cursor-move select-none"
                      draggable
                      onDragStart={(ev) => ev.dataTransfer.setData("emojiId", e.id)}
                      onDragEnd={(ev) => {
                        const rect = ev.currentTarget.parentElement?.getBoundingClientRect();
                        if (rect) {
                          const newX = ev.clientX - rect.left;
                          const newY = ev.clientY - rect.top;
                          setCustomEmojis(prev => prev.map(em => em.id === e.id ? { ...em, x: newX, y: newY } : em));
                        }
                      }}
                      style={{ top: e.y, left: e.x, fontSize: `${fontSize[0]}px`, transform: 'translate(-50%, -50%)' }}
                    >{e.emoji}</div>
                  ))}
                </div>
              ) : <div className="h-96 border-dashed border-2 rounded-lg flex items-center justify-center text-gray-400">Aucune image sélectionnée</div>}
            </CardContent>
          </Card>
        </div>

        {/* Actions & Emojis */}
        <div className="space-y-6">
          <Picker data={data} onEmojiSelect={(emoji: any) => {
            const id = crypto.randomUUID();
            setCustomEmojis((prev) => [...prev, { id, emoji: emoji.native, x: 100, y: 100 }]);
          }} />
          <Card><CardHeader><CardTitle><Download className="w-4 h-4 mr-2" />Actions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={downloadMeme} disabled={!image} className="w-full"><Download className="w-4 h-4 mr-2" />Télécharger</Button>
              <Button onClick={handleSauvegarde} disabled={!image} className="w-full"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>

            </CardContent>
          </Card>

        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}
