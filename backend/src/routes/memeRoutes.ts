import express from 'express';
import {
  createMeme,
  getAllMemes,
  getMemeById,
  updateMeme,
  deleteMeme,
  getMemesByUser,
  getPublicMemes,
  shareMeme,
  likeMeme,
  loveMeme
} from '../controllers/memeController';
import { auth } from '../middlewares/auth';
import { upload } from '../middlewares/uploads';

const router = express.Router();

router.post(
  '/add',
  upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'imageorigin', maxCount: 1 }, 
  ]),
 auth, createMeme
);

router.get("/mine",auth,getMemesByUser);
router.get("/public", getPublicMemes);

router.get('/', getAllMemes);

router.get('/:id', getMemeById);

router.put('/update/:id', updateMeme);

router.delete('/delete/:id', deleteMeme);
router.patch("/share/:id", shareMeme);
router.patch("/like/:id", likeMeme);
router.patch("/love/:id", loveMeme);



export default router;
