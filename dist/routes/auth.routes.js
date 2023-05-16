"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const AuthController_1 = __importDefault(require("../app/controllers/AuthController"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'src/public/uploads/user' });
router.post('/register', upload.single('avatar'), AuthController_1.default.register);
router.post('/login', upload.none(), AuthController_1.default.login);
router.post('/refresh', upload.none(), AuthController_1.default.refreshToken);
router.post('/logout', AuthController_1.default.logout);
exports.default = router;
