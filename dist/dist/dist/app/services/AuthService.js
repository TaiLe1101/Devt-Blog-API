"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = require("bcrypt");
const process_1 = __importDefault(require("process"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../../constant");
const helpers_1 = require("../../helpers");
const logger_1 = __importDefault(require("../../helpers/logger"));
const AuthRepository_1 = __importDefault(require("../repositories/AuthRepository"));
const UserService_1 = __importDefault(require("../services/UserService"));
const generateToken_1 = __importDefault(require("../../helpers/generateToken"));
const CookieStoreService_1 = __importDefault(require("./CookieStoreService"));
class AuthService {
    userRegister(fullName, username, password, avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.getUserByUsername(username);
                if (user) {
                    throw (0, helpers_1.responseData)(null, 'User name is exists', constant_1.CODE.BAD_REQUEST, true);
                }
                const salt = yield (0, bcrypt_1.genSalt)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
                const newUser = yield AuthRepository_1.default.register(fullName, username, hashedPassword, avatar);
                if (!newUser) {
                    throw (0, helpers_1.responseData)(null, 'Register failed', constant_1.CODE.BAD_REQUEST, true);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _a = newUser.dataValues, { password: newUserPassword } = _a, others = __rest(_a, ["password"]);
                return others;
            }
            catch (error) {
                const err = error;
                if (err.status) {
                    throw err;
                }
                if (!constant_1.__PROD__)
                    logger_1.default.error(err.message);
                throw (0, helpers_1.responseData)(null, 'Server', constant_1.CODE.SERVER, true);
            }
        });
    }
    userLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserService_1.default.getUserByUsername(username);
                if (!user) {
                    throw (0, helpers_1.responseData)(null, 'Incorrect username', constant_1.CODE.BAD_REQUEST, true);
                }
                const isPassword = yield (0, bcrypt_1.compare)(password, user.password);
                if (!isPassword) {
                    throw (0, helpers_1.responseData)(null, 'Wrong password', constant_1.CODE.BAD_REQUEST, true);
                }
                const accessToken = (0, generateToken_1.default)(process_1.default.env.ACCESS_KEY, user, '2h');
                const refreshToken = (0, generateToken_1.default)(process_1.default.env.REFRESH_KEY, user, '30d');
                yield CookieStoreService_1.default.createRefreshToken(refreshToken);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _a = user.dataValues, { password: newUserPassword } = _a, others = __rest(_a, ["password"]);
                return Object.assign(Object.assign({}, others), { accessToken, refreshToken });
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
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isExistsRefreshToken = yield CookieStoreService_1.default.findRefreshTokenByValue(refreshToken);
                logger_1.default.log(isExistsRefreshToken);
                if (!isExistsRefreshToken) {
                    throw (0, helpers_1.responseData)(null, 'Refresh token is not valid', constant_1.CODE.BAD_REQUEST, true);
                }
                let newAccessToken;
                let newRefreshToken;
                jsonwebtoken_1.default.verify(refreshToken, process_1.default.env.REFRESH_KEY, (err, user) => {
                    if (err) {
                        throw (0, helpers_1.responseData)(null, 'Token is valid', constant_1.CODE.BAD_REQUEST, true);
                    }
                    newAccessToken = (0, generateToken_1.default)(process_1.default.env.ACCESS_KEY, user, '2h');
                    newRefreshToken = (0, generateToken_1.default)(process_1.default.env.REFRESH_KEY, user, '30d');
                });
                if (!newAccessToken || !newRefreshToken) {
                    throw (0, helpers_1.responseData)(null, 'Refresh token failed', constant_1.CODE.BAD_REQUEST, true);
                }
                yield CookieStoreService_1.default.deleteRefreshTokeByValue(refreshToken);
                yield CookieStoreService_1.default.createRefreshToken(newRefreshToken);
                return { newAccessToken, newRefreshToken };
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
    userLogout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResult = CookieStoreService_1.default.deleteRefreshTokeByValue(refreshToken);
                if (!deleteResult) {
                    throw (0, helpers_1.responseData)(null, 'Logout failed', constant_1.CODE.BAD_REQUEST, true);
                }
                return deleteResult;
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
exports.default = new AuthService();
