import express from 'express';
import multer from 'multer';

import authController from '../app/controllers/AuthController';
const router = express.Router();
const upload = multer({ dest: 'src/public/uploads/user' });

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
export default router;
