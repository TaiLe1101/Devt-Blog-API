import { Request, Response } from 'express';

import { responseData } from '../../helpers';
import ThrowResponse from '../../types/ThrowResponse';
import { CODE, DATE, __PROD__ } from '../../constant';
import authService from '../services/AuthService';
import { isMinLength, isStringEmpty, validateValues } from '../../validators';

class AuthController {
    async register(req: Request, res: Response) {
        const fullName: string = req.body.fullName;
        const username: string = req.body.username;
        const password: string = req.body.password;

        try {
            if (
                validateValues([fullName, username, password]) ||
                !isMinLength(password, 6)
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
                .json(responseData(newUser, 'Register successfully'));
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
                validateValues([username, password]) ||
                !isMinLength(password, 6)
            ) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'User name or password is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const user = await authService.userLogin(username, password);
            const { refreshToken, ...others } = user;

            return res
                .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: __PROD__,
                    sameSite: 'none',
                    maxAge: DATE.MILLISECOND * DATE.SECOND * DATE.MINUTES, //1hour
                    domain: req.headers.origin,
                    // domain: '.',
                    // domain: process.env.HOST_FE,
                    path: '/',
                })
                .status(CODE.SUCCESS)
                .json(
                    responseData(
                        others,
                        'Login successfully',
                        CODE.SUCCESS,
                        false
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

    async refreshToken(req: Request, res: Response) {
        const refreshToken: string = req.cookies.refreshToken;
        try {
            if (isStringEmpty([refreshToken])) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'RefreshToken not found',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const { newAccessToken, newRefreshToken } =
                await authService.refreshToken(refreshToken);

            return res
                .cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: __PROD__,
                    sameSite: 'none',
                    maxAge: DATE.MILLISECOND * DATE.SECOND * DATE.MINUTES, // 1hour
                    // domain: process.env.HOST_FE,
                    domain: req.headers.origin,
                    path: '/',
                })
                .status(CODE.SUCCESS)
                .json(
                    responseData(
                        { accessToken: newAccessToken },
                        'Refresh successfully'
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
            console.log('cookie', refreshToken);
            if (isStringEmpty([refreshToken])) {
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

            await authService.userLogout(refreshToken);

            return res
                .clearCookie('refreshToken')
                .status(CODE.SUCCESS)
                .json(responseData(null, 'Logout successfully'));
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
