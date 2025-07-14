import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { AuthRequest } from '../middlewares/auth';
import dotenv from 'dotenv';
import mongoose from 'mongoose';



dotenv.config(); 



const JWT_SECRET = process.env.JWT_SECRET || '' ;

// ✅ REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nom,role, telephone,etat } = req.body;

    // Vérifier les rôles autorisés
    if (![ 'User','Admin' ].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const avatar = files?.['avatar']?.[0]?.filename;

    // Créer un nouvel utilisateur
    const user = new User({
      nom,
      email,
      password,
      role,
      telephone,
      etat, 
     avatar:avatar,
    
      
    });

    await user.save();

    // Générer le token JWT avec rôle
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        role: user.role,
        telephone:user.telephone,
        etat : user.etat,

      }
    });

  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
    
  }
    
};

// ✅ LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

 if (user.etat !== 'actif') {
      user.etat = 'actif';
      await user.save(); // Important !
    }



    // Générer le token JWT avec rôle
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        role: user.role,
        
      }
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    await User.findByIdAndUpdate(userId, { etat: 'inactif' });
    res.status(200).json({ message: 'Déconnecté avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur de déconnexion' });
  }
};



export const getUserProfile = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
       res.status(404).json({ message: 'Utilisateur non trouvé' });
       return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      // Récupérer tous les utilisateurs de la base de données
      const users = await User.find().select('-password'); // Exclure le mot de passe
      res.json(users); // Retourner la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };

  



  
