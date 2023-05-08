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
const constant_1 = require("../../constant");
const helpers_1 = require("../../helpers");
const logger_1 = __importDefault(require("../../helpers/logger"));
const CommentRepository_1 = __importDefault(require("../repositories/CommentRepository"));
class CommentService {
    addComment(content, userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield CommentRepository_1.default.add(content, userId, postId);
                if (!comment) {
                    throw (0, helpers_1.responseData)(null, "You can't comment", constant_1.CODE.BAD_REQUEST, true);
                }
                return comment;
            }
            catch (error) {
                const err = error;
                if (err.status) {
                    throw err;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(err.message);
                throw (0, helpers_1.responseData)(err.data, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
    getCommentByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield CommentRepository_1.default.getByPostId(postId);
                return comments;
            }
            catch (error) {
                const err = error;
                if (err.status) {
                    throw err;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(err.message);
                throw (0, helpers_1.responseData)(err.data, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
}
exports.default = new CommentService();
