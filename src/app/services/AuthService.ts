/* eslint-disable @typescript-eslint/no-explicit-any */
import { hash, genSalt, compare } from 'bcrypt';
import process from 'process';
import jwt from 'jsonwebtoken';

import { CODE, __PROD__ } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import authRepository from '../repositories/AuthRepository';
import userService from '../services/UserService';
import ThrowResponse from '../../types/ThrowResponse';
import generateToken from '../../helpers/generateToken';
import cookieStoreService from './CookieStoreService';

class AuthService {
    async userRegister(
        fullName: string,
        username: string,
        password: string,
        avatar?: string | null
    ) {
        try {
            const user = await userService.getUserByUsername(username);
            if (user) {
                throw responseData(
                    null,
                    'User name is exists',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);

            const newUser = await authRepository.register(
                fullName,
                username,
                hashedPassword,
                avatar
            );

            if (!newUser) {
                throw responseData(
                    null,
                    'Register failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: newUserPassword, ...others } = newUser.dataValues;

            return others;
        } catch (error: any) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(null, 'Server', CODE.SERVER, true);
        }
    }

    async userLogin(username: string, password: string) {
        try {
            const user = await userService.getUserByUsername(username);
            if (!user) {
                throw responseData(
                    null,
                    'Incorrect username',
                    CODE.BAD_REQUEST,
                    true
                );
            }
            const isPassword = await compare(password, user.password);
            if (!isPassword) {
                throw responseData(
                    null,
                    'Wrong password',
                    CODE.BAD_REQUEST,
                    true
                );
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
            const { password: newUserPassword, ...others } = user.dataValues;

            return { ...others, accessToken, refreshToken };
        } catch (error: any) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async refreshToken(refreshToken: string): Promise<{
        newAccessToken: string | undefined;
        newRefreshToken: string | undefined;
    }> {
        try {
            const isExistsRefreshToken =
                await cookieStoreService.findRefreshTokenByValue(refreshToken);
            logger.log(isExistsRefreshToken);

            if (!isExistsRefreshToken) {
                throw responseData(
                    null,
                    'Refresh token is not valid',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            let newAccessToken;
            let newRefreshToken;

            jwt.verify(
                refreshToken,
                process.env.REFRESH_KEY as string,
                (err, user: any) => {
                    if (err) {
                        throw responseData(
                            null,
                            'Token is valid',
                            CODE.BAD_REQUEST,
                            true
                        );
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
                throw responseData(
                    null,
                    'Refresh token failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            await cookieStoreService.deleteRefreshTokeByValue(refreshToken);
            await cookieStoreService.createRefreshToken(newRefreshToken);

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async userLogout(refreshToken: string) {
        try {
            const deleteResult =
                await cookieStoreService.deleteRefreshTokeByValue(refreshToken);

            logger.info(deleteResult);

            if (deleteResult.deletedCount < 0) {
                throw responseData(
                    null,
                    'Logout failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            return deleteResult;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }
}

export default new AuthService();
