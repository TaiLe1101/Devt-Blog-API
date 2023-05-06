/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';
import User from './Users';
import Post from './Posts';

export interface CommentAttributes {
    id?: number;

    content?: string | null;

    postId?: number | null;
    userId?: number | null;

    createdAt?: Date;
    updatedAt?: Date;
}

export type CommentInput = Optional<CommentAttributes, 'id'>;

export type CommentOutput = Required<CommentAttributes>;

class Comment
    extends Model<CommentAttributes, CommentInput>
    implements CommentAttributes
{
    public id!: number;

    public content!: string;
    public postId!: number;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        content: {
            allowNull: false,
            type: DataTypes.STRING,
        },

        postId: {
            allowNull: false,
            type: DataTypes.BIGINT,
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

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'commentUserData',
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'userCommentData',
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
    as: 'commentPostData',
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    as: 'postCommentData',
});

export default Comment;
