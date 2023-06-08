import express from 'express';
import multer from 'multer';

import postController from '../app/controllers/PostController';
import authMiddleware from '../app/middlewares/AuthMiddleware';

const upload = multer({ dest: 'src/public/uploads/post' });

const router = express.Router();

router.get('/', authMiddleware.verifyToken,postController.index);
router.post(
    '/add',
    authMiddleware.verifyToken,
    upload.single('thumbnail'),
    postController.create
);
router.get('/get-by-id', postController.getById);
export default router;
