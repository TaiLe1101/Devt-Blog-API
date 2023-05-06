"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const CommentController_1 = __importDefault(require("../app/controllers/CommentController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'src/public/uploads/comment' });
router.post('/add/:postId', AuthMiddleware_1.default.verifyToken, upload.none(), CommentController_1.default.add);
exports.default = router;
