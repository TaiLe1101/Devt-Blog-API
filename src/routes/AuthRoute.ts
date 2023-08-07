import express from 'express';

import authController from '../app/controllers/AuthController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authMiddleware.verifyToken, authController.logout);
export default router;
