import express from 'express';

import userController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import multerMiddleware from '../app/middlewares/MulterMiddleware';

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
    multerMiddleware.up().single('avatar'),
    userController.update
);

export default router;
