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
const helpers_1 = require("../../helpers");
const CommentService_1 = __importDefault(require("../services/CommentService"));
const constant_1 = require("../../constant");
const validators_1 = require("../../validators");
class CommentController {
    add(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const content = req.body.content;
            const userId = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            const postId = Number(req.params.postId);
            try {
                if ((0, validators_1.validateValues)([content, postId, userId], {
                    unPositiveNumber: true,
                })) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Value is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const comment = yield CommentService_1.default.addComment(content, userId, postId);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(comment, 'Comment successfully'));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    getByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = Number(req.params.postId);
            try {
                if ((0, validators_1.validateValues)([postId], { unPositiveNumber: true })) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Id is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const comments = yield CommentService_1.default.getCommentByPostId(postId);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(comments, 'Get comment success'));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
}
exports.default = new CommentController();
