/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';
import Category from './Categories';

export interface ProjectAttributes {
    id?: number;

    title?: string | null;
    thumbnail?: string | null;

    categoryId?: number | null;

    createdAt?: Date;
    updatedAt?: Date;
}

export type ProjectInput = Optional<ProjectAttributes, 'id'>;

export type ProjectOutput = Required<ProjectAttributes>;

class Project
    extends Model<ProjectAttributes, ProjectInput>
    implements ProjectAttributes
{
    public id!: number;
    public title!: string;
    public thumbnail?: string | null | undefined;

    public categoryId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Project.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        thumbnail: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        categoryId: {
            allowNull: false,
            type: DataTypes.BIGINT,
        },
    },
    {
        timestamps: true,
        sequelize: sequelize,
        underscored: false,
    }
);

Project.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'projectCategoryData',
});

Category.hasMany(Project, {
    foreignKey: 'categoryId',
    as: 'categoryProjectData',
});

export default Project;
