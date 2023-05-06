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
const UserService_1 = __importDefault(require("../services/UserService"));
const helpers_1 = require("../../helpers");
const constant_1 = require("../../constant");
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserService_1.default.getAllUsers();
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(users, 'Get users success', constant_1.CODE.SUCCESS, false));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                if (isNaN(id) || id <= 0) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Id is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                yield UserService_1.default.deleteUserById(id);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(null, 'Deleted successfully', constant_1.CODE.SUCCESS, true));
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
exports.default = new UserController();
