import express from 'express';

import postController from '../app/controllers/PostController';

const router = express.Router();

router.get('/', postController.index);
router.get('/get-by-id', postController.getById);
export default router;
