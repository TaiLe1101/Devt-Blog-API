"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../app/middlewares/AuthMiddleware"));
const router = express_1.default.Router();
router.get('/', AuthMiddleware_1.default.verifyToken, UserController_1.default.index);
router.delete('/delete/:id', AuthMiddleware_1.default.verifyTokenAndAdminAuth, UserController_1.default.index);
exports.default = router;
