/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';

export interface CategoryAttributes {
    id?: number;

    name?: string | null;
    desc?: string | null;

    createdAt?: Date;
    updatedAt?: Date;
}

export type CategoryInput = Optional<CategoryAttributes, 'id'>;

export type CategoryOutput = Required<CategoryAttributes>;

class Category
    extends Model<CategoryAttributes, CategoryInput>
    implements CategoryAttributes
{
    public id!: number;

    public name!: string;
    public desc?: string | null | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        desc: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        sequelize: sequelize,
        underscored: false,
    }
);

export default Category;
