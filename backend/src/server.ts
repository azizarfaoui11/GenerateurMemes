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
app.use(cors({
  origin: 'http://13.60.245.143', 
  credentials: true
}));
app.use(express.json());

const MONGO_URI='mongodb+srv://arfaouimohamedaziz5:ee9nL5LNwYjKANfn@memes.aubxtws.mongodb.net/';


// Connexion à MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté !");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error("❌ Échec connexion MongoDB :", err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memes',memeRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



const PORT =  5000; 