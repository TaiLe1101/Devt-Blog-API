import express from 'express';
import multer from 'multer';

import commentController from '../app/controllers/CommentController';
import authMiddleware from '../app/middlewares/AuthMiddleware';

const router = express.Router();
const upload = multer({ dest: 'src/public/uploads/comment' });

router.get(
    '/get-by-post/:postId',
    authMiddleware.verifyToken,
    commentController.getByPostId
);

router.post(
    '/add/:postId',
    authMiddleware.verifyToken,
    upload.none(),
    commentController.create
);

router.delete(
    '/delete/:id',
    authMiddleware.verifyToken,
    commentController.delete
);

export default router;
