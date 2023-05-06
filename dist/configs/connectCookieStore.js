"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../helpers/logger"));
function connectCookieStore() {
    return __awaiter(this, void 0, void 0, function* () {
        const password = process.env.MG_PASSWORD;
        const username = process.env.MG_USER;
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${username}:${password}@redis.p6nxbgd.mongodb.net/?retryWrites=true&w=majority`);
            logger_1.default.info('⚡️[server]: Connect to Cookie Store successfully');
        }
        catch (error) {
            logger_1.default.error('⚡️[server]: Connect to Cookie Store failed');
        }
    });
}
exports.default = connectCookieStore;
