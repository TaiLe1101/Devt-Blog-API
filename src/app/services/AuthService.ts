/* eslint-disable @typescript-eslint/no-explicit-any */
import { compare, genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';

import { Server } from '../../constants';
import {
    HttpException,
    HttpServerException,
    HttpUnAuthorizedException,
} from '../../exceptions';
import generateToken from '../../helpers/generateToken';
import logger from '../../helpers/logger';
import { LoginPayload, RegisterPayload } from '../../payloads';
import userService from '../services/UserService';
import cookieStoreService from './CookieStoreService';
import { AppDataSource } from '../../configs/connectDb';
import { UserEntity } from '../../database/entities/UserEntity';

class AuthService {
    private readonly userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async userRegister(payload: RegisterPayload) {
        try {
            const user = await userService.getUserByUsername(payload.username);
            if (user) {
                throw new HttpException('Username is exists');
            }

            const salt = await genSalt(10);
            const hashedPassword = await hash(payload.password, salt);

            const newUser = await this.userRepository.save({
                ...payload,
                password: hashedPassword,
            });

            if (!newUser) {
                throw new HttpException('Register failed');
            }

            return true;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async userLogin(payload: LoginPayload) {
        try {
            const user = await userService.getUserByUsername(payload.username);
            if (!user) {
                throw new HttpUnAuthorizedException('Wrong username');
            }

            const isPassword = await compare(payload.password, user.password);
            if (!isPassword) {
                throw new HttpUnAuthorizedException('Wrong Password');
            }

            const accessToken = generateToken(
                process.env.ACCESS_KEY as string,
                user,
                '2h'
            );
            const refreshToken = generateToken(
                process.env.REFRESH_KEY as string,
                user,
                '30d'
            );

            await cookieStoreService.createRefreshToken(refreshToken);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: newUserPassword, ...others } = user;

            return { ...others, accessToken, refreshToken };
        } catch (error: any) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            let newAccessToken = '';
            let newRefreshToken = '';

            const isDeleted = await cookieStoreService.deleteRefreshTokeByValue(
                refreshToken
            );

            if (!isDeleted) {
                throw new HttpUnAuthorizedException();
            }

            jwt.verify(
                refreshToken,
                process.env.REFRESH_KEY as string,
                (err, user: any) => {
                    if (err) {
                        throw new HttpException('Token is valid');
                    }

                    newAccessToken = generateToken(
                        process.env.ACCESS_KEY as string,
                        user,
                        '2h'
                    );

                    newRefreshToken = generateToken(
                        process.env.REFRESH_KEY as string,
                        user,
                        '30d'
                    );
                }
            );

            if (!newAccessToken || !newRefreshToken) {
                throw new HttpException();
            }

            await cookieStoreService.createRefreshToken(newRefreshToken);

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async userLogout(refreshToken: string) {
        try {
            const isDeleted = await cookieStoreService.deleteRefreshTokeByValue(
                refreshToken
            );

            if (!isDeleted) {
                throw new HttpUnAuthorizedException();
            }

            return isDeleted;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }
}

export default new AuthService();
