"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../../configs/connectDb");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    fullName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    avatar: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    username: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    sequelize: connectDb_1.sequelize,
    underscored: false,
});
exports.default = User;
