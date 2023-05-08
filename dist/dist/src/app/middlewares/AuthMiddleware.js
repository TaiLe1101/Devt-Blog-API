"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../../constant");
const helpers_1 = require("../../helpers");
class AuthMiddleware {
    constructor() {
        this.verifyToken = (req, res, next) => {
            const token = req.headers.authorization;
            if (token) {
                const accessToken = token.replace('Bearer ', '');
                jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                    if (err) {
                        return res
                            .status(constant_1.CODE.BAD_REQUEST)
                            .json((0, helpers_1.responseData)(null, 'Verify token failed', constant_1.CODE.BAD_REQUEST, true));
                    }
                    req.user = user;
                    next();
                });
            }
            else {
                return res
                    .status(constant_1.CODE.FORBIDDEN)
                    .json((0, helpers_1.responseData)(null, "You're not Authorization", constant_1.CODE.FORBIDDEN, true));
            }
        };
        this.verifyTokenAndAdminAuth = (req, res, next) => {
            this.verifyToken(req, res, () => {
                var _a;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === Number(req.params.id)) {
                    next();
                }
                else {
                    res.status(constant_1.CODE.FORBIDDEN).json((0, helpers_1.responseData)(null, 'Permission denied', constant_1.CODE.FORBIDDEN, true));
                }
            });
        };
    }
}
exports.default = new AuthMiddleware();
