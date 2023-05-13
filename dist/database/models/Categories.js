"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../../configs/connectDb");
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    desc: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    sequelize: connectDb_1.sequelize,
    underscored: false,
});
exports.default = Category;
