import express from 'express';
import multer from 'multer';

import projectController from '../app/controllers/ProjectController';
import authMiddleware from '../app/middlewares/AuthMiddleware';
import generateDiskStorage from '../helpers/generateDiskStorage';

const router = express.Router();

const storage = generateDiskStorage('projects');
const upload = multer({ dest: 'src/public/uploads/projects', storage });

router.get('/', projectController.index);
router.post(
    '/create',
    authMiddleware.verifyToken,
    upload.single('thumbnail'),
    projectController.create
);
export default router;
