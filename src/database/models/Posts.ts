/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';
import User from './Users';

export interface PostAttributes {
    id?: number;

    title?: string;
    content?: string;
    thumbnail?: string;

    userId?: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export type PostInput = Optional<PostAttributes, 'id'>;

export type PostOutput = Required<PostAttributes>;

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public thumbnail!: string;

    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
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
        content: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        thumbnail: {
            allowNull: true,
            type: DataTypes.STRING,
            defaultValue: null,
        },
        userId: {
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

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'posts',
});

export default Post;
