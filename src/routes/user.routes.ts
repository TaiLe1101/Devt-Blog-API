import express from 'express';

import userController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import upload from '../app/middlewares/MulterMiddleware';

const router = express.Router();

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
