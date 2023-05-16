"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ProjectController_1 = __importDefault(require("../app/controllers/ProjectController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const generateDiskStorage_1 = __importDefault(require("../helpers/generateDiskStorage"));
const router = express_1.default.Router();
const storage = (0, generateDiskStorage_1.default)('projects');
const upload = (0, multer_1.default)({ dest: 'src/public/uploads/projects', storage });
router.get('/', ProjectController_1.default.index);
router.post('/create', AuthMiddleware_1.default.verifyToken, upload.single('thumbnail'), ProjectController_1.default.create);
exports.default = router;
