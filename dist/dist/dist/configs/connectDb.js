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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
const logger_1 = __importDefault(require("../helpers/logger"));
dotenv_1.default.config();
const dbName = process_1.default.env.DB_NAME;
const dbUser = process_1.default.env.DB_USER;
const dbPassword = process_1.default.env.DB_PASSWORD;
const dbHost = process_1.default.env.DB_HOST;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost || 'development',
    dialect: 'postgres',
    logging: false,
});
exports.sequelize = sequelize;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        logger_1.default.info('⚡️[server]: Connect to database successfully.');
    }
    catch (error) {
        logger_1.default.error('⚡️[server]: Unable to connect to the database:\n', error);
    }
});
exports.default = connectDb;
