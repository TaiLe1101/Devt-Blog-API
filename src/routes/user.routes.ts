import express from 'express';
import multer from 'multer';

import userController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import generateDiskStorage from '../helpers/generateDiskStorage';
import path from 'path';

const router = express.Router();

const storage = generateDiskStorage('user');

const upload = multer({
    dest: path.join(__dirname, 'public', 'uploads', 'user'),
    storage,
});

router.get('/', authMiddleware.verifyToken, userController.index);

router.delete(
    '/delete/:id',
    authMiddleware.verifyTokenAndAdminAuth,
    userController.index
);

router.post(
    '/update',
    authMiddleware.verifyToken,
    upload.single('avatar'),
    userController.update
);

export default router;
