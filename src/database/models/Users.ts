/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Optional, DataTypes } from 'sequelize';

import { sequelize } from '../../configs/connectDb';

export interface UserAttributes {
    id?: number;

    fullName?: string | null;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    avatar?: string | null;
    address?: string | null;
    phoneNumber?: string | null;

    createdAt?: Date;
    updatedAt?: Date;
}

export type UserInput = Optional<UserAttributes, 'id'>;

export type UserOutput = Required<UserAttributes>;

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public fullName!: string;
    public username!: string;
    public password!: string;
    public avatar?: string | null | undefined;
    public email?: string | null | undefined;
    public address?: string | null | undefined;
    public phoneNumber?: string | null | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        fullName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        phoneNumber: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        sequelize: sequelize,
        underscored: false,
    }
);

export default User;
