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
const Posts_1 = __importDefault(require("../../database/models/Posts"));
const Users_1 = __importDefault(require("../../database/models/Users"));
class PostRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Posts_1.default.findAll({
                include: [
                    {
                        model: Users_1.default,
                        as: 'postUserData',
                        attributes: ['id', 'fullName'],
                    },
                ],
            });
            return posts;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Posts_1.default.findOne({
                where: {
                    id,
                },
                include: {
                    model: Users_1.default,
                    as: 'postUserData',
                    attributes: ['id', 'fullName'],
                },
            });
            return post;
        });
    }
    create(title, content, thumbnail, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield Posts_1.default.create({
                title,
                content,
                thumbnail,
                userId,
            });
            return createdPost;
        });
    }
}
exports.default = new PostRepository();
