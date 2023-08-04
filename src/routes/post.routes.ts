import express from 'express';

import postController from '../app/controllers/PostController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import multerMiddleware from '../app/middlewares/MulterMiddleware';

const router = express.Router();

router.get('/', postController.index);

router.post(
    '/create',
    authMiddleware.verifyToken,
    multerMiddleware.up().single('thumbnail'),
    postController.create
);

router.post(
    '/update/:postId',
    authMiddleware.verifyToken,
    multerMiddleware.up().single('thumbnail'),
    postController.update
);

router.delete(
    '/delete/:postId',
    authMiddleware.verifyToken,
    postController.delete
);

router.get('/:postId', postController.detail);
export default router;
