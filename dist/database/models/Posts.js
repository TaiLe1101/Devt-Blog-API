"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../../configs/connectDb");
const Users_1 = __importDefault(require("./Users"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    content: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    userId: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT,
    },
}, {
    timestamps: true,
    sequelize: connectDb_1.sequelize,
    underscored: false,
});
Post.belongsTo(Users_1.default, {
    foreignKey: 'userId',
    as: 'postUserData',
});
Users_1.default.hasMany(Post, {
    foreignKey: 'userId',
    as: 'userPostData',
});
exports.default = Post;
