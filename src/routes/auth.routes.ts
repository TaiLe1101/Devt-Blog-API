import express from 'express';
import multer from 'multer';

import authController from '../app/controllers/AuthController';
const router = express.Router();
const upload = multer({ dest: 'src/public/uploads/user' });

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', upload.none(), authController.login);
router.post('/refresh', upload.none(), authController.refreshToken);
router.post('/logout', upload.none(), authController.logout);
export default router;
