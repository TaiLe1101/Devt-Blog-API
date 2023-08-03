import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HttpStatus } from '../../constants';
import { HttpUnAuthorizedException } from '../../exceptions';
import { RequestAuth, UserJwt } from '../../types/request';

class AuthMiddleware {
    verifyToken = (req: RequestAuth, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if (token) {
            const accessToken = token.replace('Bearer ', '');
            jwt.verify(
                accessToken,
                process.env.ACCESS_KEY as string,
                (err, user) => {
                    if (err) {
                        return res
                            .status(HttpStatus.UNAUTHORIZED)
                            .json(new HttpUnAuthorizedException());
                    }

                    req.user = user as UserJwt;

                    next();
                }
            );
        } else {
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json(new HttpUnAuthorizedException());
        }
    };

    verifyTokenAndAdminAuth = (
        req: RequestAuth,
        res: Response,
        next: NextFunction
    ) => {
        this.verifyToken(req, res, () => {
            if (Number(req.user?.id) === Number(req.params.id)) {
                next();
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json(
                    new HttpUnAuthorizedException()
                );
            }
        });
    };
}

export default new AuthMiddleware();
