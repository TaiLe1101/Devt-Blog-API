"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const convertSignStringToUnSignString_1 = __importDefault(require("./convertSignStringToUnSignString"));
function generateDiskStorage(savePath) {
    return multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `src/public/uploads/${savePath}`);
        },
        filename: (req, file, cb) => {
            const timestamp = new Date().getTime();
            cb(null, timestamp +
                '-' +
                (0, convertSignStringToUnSignString_1.default)(file.originalname));
        },
    });
}
exports.default = generateDiskStorage;
