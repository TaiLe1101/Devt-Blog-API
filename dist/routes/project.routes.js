"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../app/controllers/ProjectController"));
const router = express_1.default.Router();
router.get('/', ProjectController_1.default.index);
exports.default = router;
