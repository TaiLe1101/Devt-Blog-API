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
const helpers_1 = require("../../helpers");
const ProjectService_1 = __importDefault(require("../services/ProjectService"));
const constant_1 = require("../../constant");
const validators_1 = require("../../validators");
class ProjectController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield ProjectService_1.default.getAllProjects();
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(projects, 'Get Success'));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.body.title;
            const thumbnailFile = req.file;
            const categoryId = Number(req.body.categoryId);
            try {
                if ((0, validators_1.validateValues)([title, categoryId], { unPositiveNumber: true })) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Value is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const projects = yield ProjectService_1.default.createProject(title, thumbnailFile, categoryId);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(projects, 'Get Success'));
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
exports.default = new ProjectController();
