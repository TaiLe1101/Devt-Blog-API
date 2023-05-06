/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';
import User from './Users';

export interface PostAttributes {
    id?: number;
    title?: string | null;
    content?: string | null;
    thumbnail?: string | null;

    userId?: number | null;

    createdAt?: Date;
    updatedAt?: Date;
}

export type PostInput = Optional<PostAttributes, 'id'>;

export type PostOutput = Required<PostAttributes>;

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public thumbnail?: string | null | undefined;

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
    as: 'postUserData',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    as: 'userPostData',
});

export default Post;
