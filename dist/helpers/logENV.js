"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
function logENV() {
    logger_1.default.log(process.env.PORT);
    logger_1.default.log(process.env.NODE_ENV);
    logger_1.default.log(process.env.BE_ORIGIN);
    logger_1.default.log(process.env.FE_ORIGIN);
    logger_1.default.log(process.env.HOST_FE);
}
exports.default = logENV;
