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
/* eslint-disable @typescript-eslint/no-explicit-any */
const constant_1 = require("../../constant");
const helpers_1 = require("../../helpers");
const logger_1 = __importDefault(require("../../helpers/logger"));
const PostRepository_1 = __importDefault(require("../repositories/PostRepository"));
class PostService {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield PostRepository_1.default.getAll();
                if (!posts) {
                    throw (0, helpers_1.responseData)(null, "Can't get posts", constant_1.CODE.NOT_FOUND, true);
                }
                return posts;
            }
            catch (error) {
                if (error.status) {
                    throw error;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(error.message);
                throw (0, helpers_1.responseData)(null, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield PostRepository_1.default.getById(id);
                if (!post) {
                    throw (0, helpers_1.responseData)(null, 'Post not found', constant_1.CODE.NOT_FOUND, true);
                }
                return post;
            }
            catch (error) {
                if (error.status) {
                    throw error;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(error.message);
                throw (0, helpers_1.responseData)(null, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
    createPost(title, content, thumbnail, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPost = yield PostRepository_1.default.create(title, content, thumbnail, userId);
                if (!createdPost) {
                    throw (0, helpers_1.responseData)(null, "Can't create post", constant_1.CODE.NOT_FOUND, true);
                }
                return createdPost;
            }
            catch (error) {
                if (error.status) {
                    throw error;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(error.message);
                throw (0, helpers_1.responseData)(null, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
}
exports.default = new PostService();
