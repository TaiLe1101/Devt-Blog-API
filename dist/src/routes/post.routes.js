"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const PostController_1 = __importDefault(require("../app/controllers/PostController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const upload = (0, multer_1.default)({ dest: 'src/public/uploads/post' });
const router = express_1.default.Router();
router.get('/', PostController_1.default.index);
router.post('/add', AuthMiddleware_1.default.verifyToken, upload.single('thumbnail'), PostController_1.default.create);
router.get('/get-by-id', PostController_1.default.getById);
exports.default = router;
