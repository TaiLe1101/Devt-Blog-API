/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { HttpStatus, Server, Token } from '../../constants';
import {
    HttpException,
    HttpUnAuthorizedException,
    HttpValidateException,
} from '../../exceptions';
import { ResponseData } from '../../global/responses';
import { LoginPayload, RegisterPayload } from '../../payloads';
import { isMinLength, isStringEmpty, validateValues } from '../../validators';
import authService from '../services/AuthService';

class AuthController {
    async register(req: Request<RegisterPayload>, res: Response) {
        const { fullName, password, username } = req.body;

        try {
            if (
                validateValues([fullName, username, password]) ||
                !isMinLength(password, 6)
            ) {
                throw new HttpValidateException();
            }

            const newUser = await authService.userRegister({
                fullName,
                password,
                username,
            });

            return res
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData(newUser));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async login(req: Request<LoginPayload>, res: Response) {
        const { username, password } = req.body;

        try {
            if (
                validateValues([username, password]) ||
                !isMinLength(password, 6)
            ) {
                throw new HttpValidateException();
            }

            const user = await authService.userLogin({ username, password });
            const { refreshToken, ...others } = user;
            const MILLISECOND = 1000;
            const SECOND = 60;
            const MINUTES = 60;
            return res
                .cookie(Token.REFRESH_TOKEN, refreshToken, {
                    httpOnly: true,
                    secure: Boolean(Server.__PROD__),
                    sameSite: 'none',
                    maxAge: MILLISECOND * SECOND * MINUTES, //1hour
                })
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData(others));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken: string = req.cookies.refreshToken;
        try {
            if (isStringEmpty([refreshToken])) {
                throw new HttpValidateException();
            }

            const { newAccessToken, newRefreshToken } =
                await authService.refreshToken(refreshToken);
            const MILLISECOND = 1000;
            const SECOND = 60;
            const MINUTES = 60;
            return res
                .cookie(Token.REFRESH_TOKEN, newRefreshToken, {
                    httpOnly: true,
                    secure: Boolean(Server.__PROD__),
                    sameSite: 'none',
                    maxAge: MILLISECOND * SECOND * MINUTES, // 1hour
                })
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData({ accessToken: newAccessToken }));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async logout(
        req: Request,
        res: Response
    ): Promise<Response<ResponseData<boolean>, Record<string, any>>> {
        const refreshToken = req.cookies.refreshToken;
        try {
            if (isStringEmpty([refreshToken])) {
                throw new HttpUnAuthorizedException();
            }

            const result = await authService.userLogout(refreshToken);

            return res
                .clearCookie(Token.REFRESH_TOKEN)
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData(result));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }
}

export default new AuthController();
