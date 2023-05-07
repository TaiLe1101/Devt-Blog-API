/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { responseData } from '../../helpers';
import ThrowResponse from '../../types/ThrowResponse';
import { CODE, DATE, __PROD__ } from '../../constant';
import authService from '../services/AuthService';

class AuthController {
    async register(req: Request, res: Response) {
        const fullName: string = req.body.fullName;
        const username: string = req.body.username;
        const password: string = req.body.password;

        try {
            if (
                fullName.trim().length <= 0 ||
                (username.trim().length <= 0 && username.includes('@')) ||
                password.trim().length <= 5
            ) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Value is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const newUser = await authService.userRegister(
                fullName,
                username,
                password
            );
            return res
                .status(CODE.SUCCESS)
                .json(responseData(newUser, 'Register success'));
        } catch (error) {
            const err = error as ThrowResponse;

            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async login(req: Request, res: Response) {
        const username: string = req.body.username;
        const password: string = req.body.password;

        try {
            if (
                (username.trim().length <= 0 && username.includes('@')) ||
                password.trim().length <= 0
            ) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'username or password is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const user = await authService.userLogin(username, password);
            const { refreshToken, ...others } = user;
            res.cookie('refreshToken', refreshToken, {
                maxAge: DATE.MILLISECOND * DATE.SECOND * DATE.MINUTES, // 1hour
                httpOnly: true,
                secure: __PROD__,
                sameSite: 'lax',
            });

            return res
                .status(CODE.SUCCESS)
                .json(
                    responseData(others, 'Login success', CODE.SUCCESS, false)
                );
        } catch (error) {
            const err = error as ThrowResponse;

            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken: string = req.cookies.refreshToken;
        try {
            if (!refreshToken || refreshToken.trim().length <= 0) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Can not find refresh token',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const { newAccessToken, newRefreshToken } =
                await authService.refreshToken(refreshToken);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: __PROD__,
                sameSite: true,
                maxAge: DATE.MILLISECOND * DATE.SECOND * DATE.MINUTES, // 1hour
            });

            return res
                .status(CODE.SUCCESS)
                .json(
                    responseData(
                        { accessToken: newAccessToken },
                        'Refresh success'
                    )
                );
        } catch (error) {
            const err = error as ThrowResponse;

            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;
        try {
            if (!refreshToken) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'You are not logged in',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            res.clearCookie('refreshToken');

            await authService.userLogout(refreshToken);

            return res
                .status(CODE.SUCCESS)
                .json(responseData(null, 'logout success'));
        } catch (error) {
            const err = error as ThrowResponse;

            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }
}

export default new AuthController();
