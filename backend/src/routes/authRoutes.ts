import { Router, RequestHandler } from 'express';
import {  getAllUsers, getUserProfile, login, logout, register } from '../controllers/authController';
import { auth } from '../middlewares/auth';
import { upload } from '../middlewares/uploads';

const router = Router();

router.post('/register',   upload.fields([
    { name: 'avatar', maxCount: 1 }
    ]),register as RequestHandler);
    
router.post('/login', login as RequestHandler);
router.post('/logout', auth, logout);
router.get('/getusers',getAllUsers);
router.get('/profile',auth, getUserProfile);




export default router; 