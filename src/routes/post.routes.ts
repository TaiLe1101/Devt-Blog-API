import express from 'express';

import postController from '../app/controllers/PostController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import upload from '../app/middlewares/MulterMiddleware';

const router = express.Router();

router.get('/', postController.index);
router.post(
    '/add',
    authMiddleware.verifyToken,
    upload.single('thumbnail'),
    postController.create
);
router.post(
    '/update/:id',
    authMiddleware.verifyToken,
    upload.single('thumbnail'),
    postController.update
);
router.get('/:postId', postController.getById);
export default router;
