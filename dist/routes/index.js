"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_routes_1 = __importDefault(require("./post.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
function route(app) {
    const endPointURL = '/api';
    app.use(endPointURL + '/posts', post_routes_1.default);
    app.use(endPointURL + '/auth', auth_routes_1.default);
    app.use(endPointURL + '/users', user_routes_1.default);
    app.use(endPointURL + '/comments', comment_routes_1.default);
}
exports.default = route;
