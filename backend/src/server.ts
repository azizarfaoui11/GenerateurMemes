import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import path from 'path';
import memeRoutes from './routes/memeRoutes';



// Configuration des variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB connecté !");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Serveur lancé sur http://GenMemes:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Échec connexion MongoDB :", err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memes',memeRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



