import express from 'express';
import multer from 'multer';

import authController from '../app/controllers/AuthController';
import path from 'path';
import generateDiskStorage from '../helpers/generateDiskStorage';
const router = express.Router();
const storage = generateDiskStorage('user');

const upload = multer({
    dest: path.join(__dirname, 'public', 'uploads', 'user'),
    storage,
});

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', upload.none(), authController.login);
router.post('/refresh', upload.none(), authController.refreshToken);
router.post('/logout', upload.none(), authController.logout);
export default router;
