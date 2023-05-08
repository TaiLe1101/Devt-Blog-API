"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE = exports.CODE = exports.__PROD__ = void 0;
exports.__PROD__ = process.env.NODE_ENV === 'production';
exports.CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER: 500,
};
exports.DATE = {
    MILLISECOND: 1000,
    SECOND: 60,
    MINUTES: 60,
    HOUR: 60,
};
