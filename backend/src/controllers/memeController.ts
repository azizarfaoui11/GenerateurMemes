import { Request, Response } from 'express';
import { Meme } from '../models/Meme';
import { AuthRequest } from '../middlewares/auth';

// ✅ Créer un meme
export const createMeme = async (req: AuthRequest, res: Response) => {
  try {
    const {
      topText,
      meduimText,
      bottomText,
      fontSize,
      fontFamily,
      textColor,
      isPublic ,
    } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const finalImageFile = files?.image?.[0];       
    const originalImageFile = files?.imageorigin?.[0];
    const customEmojis = JSON.parse(req.body.customEmojis || "[]");
 

    if (!finalImageFile || !originalImageFile) {
      return res.status(400).json({ error: 'Images manquantes' });
    }
     const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Authentification requise' });
      return;
    }

    const meme = new Meme({
      image: finalImageFile.filename,
      imageorigin: originalImageFile.filename,
      topText,
      meduimText,
      bottomText,
      fontSize: Number(fontSize),
      fontFamily,
      textColor,
      customEmojis:customEmojis,
      isPublic: isPublic || false,
      user:userId, // si non fourni, reste `false`

    });

    await meme.save();
    res.status(201).json(meme);
  } catch (err) {
    console.error('Erreur lors de la création du meme :', err);
    res.status(500).json({ error: 'Erreur serveur lors de la création du meme' });
  }
};


// ✅ Obtenir tous les memes
export const getAllMemes = async (req: Request, res: Response) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.status(200).json(memes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des memes' });
  }
};

// ✅ Obtenir un meme par ID
export const getMemeById = async (req: Request, res: Response) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme introuvable' });
    res.status(200).json(meme);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du meme' });
  }
};

// ✅ Modifier un meme
export const updateMeme = async (req: Request, res: Response) => {
  try {
    const updated = await Meme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Meme introuvable' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du meme' });
  }
};

// ✅ Supprimer un meme
export const deleteMeme = async (req: Request, res: Response) => {
  try {
    const deleted = await Meme.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Meme introuvable' });
    res.status(200).json({ message: 'Meme supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression du meme' });
  }
};

export const getMemesByUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
  
      if (!userId) {
        res.status(401).json({ message: 'Authentification requise' });
        return;
      }
  
      const meme = ((await Meme.find({ user: userId })
    
    ));
      
      res.status(200).json(meme);
    } 
    catch (error) {
      console.error('Erreur lors de la récupération de mes evenements:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  export const getPublicMemes = async (req: Request, res: Response) => {
  try {
    // Vérifie que les memes avec isPublic:true existent et sont triés du plus récent au plus ancien
    const publicMemes = await Meme.find({ isPublic: true }).sort({ createdAt: -1 });

    if (!publicMemes || publicMemes.length === 0) {
      return res.status(404).json({ message: "Aucun meme public trouvé." });
    }

    res.status(200).json(publicMemes);
  } catch (err) {
    console.error("Erreur dans getPublicMemes :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des memes publics" });
  }
};

export const shareMeme = async (req: Request, res: Response) => {
  try {
    const memeId = req.params.id;

    const updated = await Meme.findByIdAndUpdate(
      memeId,
      { isPublic: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Meme non trouvé" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du partage du meme" });
  }
};

export const likeMeme = async (req: Request, res: Response) => {
  try {
    const meme = await Meme.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json(meme);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du like" });
  }
};

export const loveMeme = async (req: Request, res: Response) => {
  try {
    const meme = await Meme.findByIdAndUpdate(
      req.params.id,
      { $inc: { loves: 1 } },
      { new: true }
    );
    res.status(200).json(meme);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du love" });
  }
};
