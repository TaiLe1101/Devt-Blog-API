"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const sequelize_1 = require("sequelize");
const connectDb_1 = require("../../configs/connectDb");
const Categories_1 = __importDefault(require("./Categories"));
class Project extends sequelize_1.Model {
}
Project.init({
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
    thumbnail: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    categoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT,
    },
}, {
    timestamps: true,
    sequelize: connectDb_1.sequelize,
    underscored: false,
});
Project.belongsTo(Categories_1.default, {
    foreignKey: 'categoryId',
    as: 'projectCategoryData',
});
Categories_1.default.hasMany(Project, {
    foreignKey: 'categoryId',
    as: 'categoryProjectData',
});
exports.default = Project;
