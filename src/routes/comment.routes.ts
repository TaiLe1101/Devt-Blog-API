import express from 'express';
import multer from 'multer';

import commentController from '../app/controllers/CommentController';
import authMiddleware from '../app/middlewares/AuthMiddleware';

const router = express.Router();
const upload = multer({ dest: 'src/public/uploads/comment' });

router.post(
    '/add/:postId',
    authMiddleware.verifyToken,
    upload.none(),
    commentController.add
);
export default router;
