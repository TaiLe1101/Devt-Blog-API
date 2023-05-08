"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../../configs/connectDb");
const Users_1 = __importDefault(require("./Users"));
const Posts_1 = __importDefault(require("./Posts"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    content: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    postId: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT,
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
Comment.belongsTo(Users_1.default, {
    foreignKey: 'userId',
    as: 'commentUserData',
});
Users_1.default.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'userCommentData',
});
Comment.belongsTo(Posts_1.default, {
    foreignKey: 'postId',
    as: 'commentPostData',
});
Posts_1.default.hasMany(Comment, {
    foreignKey: 'postId',
    as: 'postCommentData',
});
exports.default = Comment;
