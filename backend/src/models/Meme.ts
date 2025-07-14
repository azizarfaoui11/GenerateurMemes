import mongoose, { Schema, model, Document } from 'mongoose';

export interface IMeme extends Document {
  image: string;
  imageorigin: string;
  topText: string;
  meduimText?: string;
  bottomText?: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  customEmojis?: { emoji: string; x: number; y: number }[];
  isPublic: boolean;
  user:mongoose.Types.ObjectId;

  likes: number;     // 👍 Nouveau champ
  loves: number;     // ❤️ Nouveau champ

  createdAt: Date;
  updatedAt: Date;
}

const memeSchema = new Schema<IMeme>(
  {
    image: { type: String, required: true },
    imageorigin: { type: String, required: true },

    topText: { type: String, required: true },
    meduimText: { type: String },
    bottomText: { type: String },

    fontSize: { type: Number, required: true },
    fontFamily: { type: String, required: true },
    textColor: { type: String, required: true },

    customEmojis: [
      {
        emoji: { type: String, required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    ],

    isPublic: { type: Boolean, default: false }, // ✅ Champ déjà présent
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    likes: { type: Number, default: 0 }, // 👍
    loves: { type: Number, default: 0 }, // ❤️
  },
  { timestamps: true }
);

export const Meme = model<IMeme>('Meme', memeSchema);
