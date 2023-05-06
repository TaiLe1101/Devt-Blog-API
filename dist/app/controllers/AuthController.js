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
const helpers_1 = require("../../helpers");
const constant_1 = require("../../constant");
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullName = req.body.fullName;
            const username = req.body.username;
            const password = req.body.password;
            try {
                if (fullName.trim().length <= 0 ||
                    (username.trim().length <= 0 && username.includes('@')) ||
                    password.trim().length <= 5) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Value is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const newUser = yield AuthService_1.default.userRegister(fullName, username, password);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(newUser, 'Register success'));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const password = req.body.password;
            try {
                if ((username.trim().length <= 0 && username.includes('@')) ||
                    password.trim().length <= 0) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'username or password is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                const user = yield AuthService_1.default.userLogin(username, password);
                const { refreshToken } = user, others = __rest(user, ["refreshToken"]);
                res.cookie('refreshToken', refreshToken, {
                    maxAge: constant_1.DATE.MILLISECOND * constant_1.DATE.SECOND * constant_1.DATE.MINUTES,
                    httpOnly: true,
                    secure: constant_1.__PROD__,
                    sameSite: 'lax',
                });
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(others, 'Login success', constant_1.CODE.SUCCESS, false));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            try {
                if (!refreshToken || refreshToken.trim().length <= 0) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Can not find refresh token', constant_1.CODE.BAD_REQUEST, true));
                }
                const { newAccessToken, newRefreshToken } = yield AuthService_1.default.refreshToken(refreshToken);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: constant_1.__PROD__,
                    sameSite: true,
                    maxAge: constant_1.DATE.MILLISECOND * constant_1.DATE.SECOND * constant_1.DATE.MINUTES, // 1hour
                });
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)({ accessToken: newAccessToken }, 'Refresh success'));
            }
            catch (error) {
                const err = error;
                return res
                    .status(err.status)
                    .json((0, helpers_1.responseData)(err.data, err.message, err.status, err.error));
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            try {
                if (!refreshToken) {
                    return res
                        .status(constant_1.CODE.BAD_REQUEST)
                        .json((0, helpers_1.responseData)(null, 'Token is valid', constant_1.CODE.BAD_REQUEST, true));
                }
                res.clearCookie('refreshToken');
                yield AuthService_1.default.userLogout(refreshToken);
                return res
                    .status(constant_1.CODE.SUCCESS)
                    .json((0, helpers_1.responseData)(null, 'logout success'));
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
exports.default = new AuthController();
