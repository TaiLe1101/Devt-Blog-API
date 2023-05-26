"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const connectDb_1 = __importDefault(require("./configs/connectDb"));
const logger_1 = __importDefault(require("./helpers/logger"));
const connectCookieStore_1 = __importDefault(require("./configs/connectCookieStore"));
const constant_1 = require("./constant");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process_1.default.env.PORT || 3303;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true, //access-control-allow-credentials:true
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, connectDb_1.default)();
(0, connectCookieStore_1.default)();
(0, routes_1.default)(app);
if (constant_1.__PROD__) {
    console.log('process.env.DOMAIN_FE ->', process_1.default.env.DOMAIN_FE);
}
app.listen(port, () => {
    logger_1.default.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
