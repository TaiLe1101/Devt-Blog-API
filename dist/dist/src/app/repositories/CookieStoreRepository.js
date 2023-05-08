"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("../../database/models/Token"));
class CookieStoreRepository {
    create(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield Token_1.default.create({
                value,
            });
            return refreshToken;
        });
    }
    findByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield Token_1.default.find({
                value,
            });
            return refreshToken;
        });
    }
    delete(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield Token_1.default.deleteOne({
                value,
            });
            return deleteResult;
        });
    }
}
exports.default = new CookieStoreRepository();
