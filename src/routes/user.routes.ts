import express from 'express';

import userController from '../app/controllers/UserController';
import authMiddleware from '../app/middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', authMiddleware.verifyToken, userController.index);

router.delete(
    '/delete/:id',
    authMiddleware.verifyTokenAndAdminAuth,
    userController.index
);

export default router;
