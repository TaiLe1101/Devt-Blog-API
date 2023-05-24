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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const helpers_1 = require("../../helpers");
const constant_1 = require("../../constant");
const validators_1 = require("../../validators");
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
                if ((0, validators_1.validateValues)([id], { unPositiveNumber: true })) {
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
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const address = req.body.address;
            const phoneNumber = req.body.phoneNumber;
            const fullName = req.body.fullName;
            const avatarFile = req.file;
            const id = Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            try {
                if (!(0, validators_1.isEmail)(email)) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Email is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const result = yield UserService_1.default.updateUserById(id, fullName, avatarFile, email, phoneNumber, address);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _b = result.dataValues, { password } = _b, other = __rest(_b, ["password"]);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(Object.assign({}, other), 'Updated successfully'));
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
