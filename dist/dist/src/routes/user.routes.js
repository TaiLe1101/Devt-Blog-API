"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const generateDiskStorage_1 = __importDefault(require("../helpers/generateDiskStorage"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = (0, generateDiskStorage_1.default)('user');
const upload = (0, multer_1.default)({
    dest: path_1.default.join(__dirname, 'public', 'uploads', 'user'),
    storage,
});
router.get('/', AuthMiddleware_1.default.verifyToken, UserController_1.default.index);
router.delete('/delete/:id', AuthMiddleware_1.default.verifyTokenAndAdminAuth, UserController_1.default.index);
router.post('/update', AuthMiddleware_1.default.verifyToken, upload.single('avatar'), UserController_1.default.update);
exports.default = router;
