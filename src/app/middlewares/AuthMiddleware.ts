import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { RequestMiddleware } from '../../types/RequestMiddleware';
import { CODE } from '../../constant';
import User from '../../database/models/Users';
import { responseData } from '../../helpers';

class AuthMiddleware {
    verifyToken = (
        req: RequestMiddleware,
        res: Response,
        next: NextFunction
    ) => {
        const token = req.headers.authorization;

        if (token) {
            const accessToken = token.replace('Bearer ', '');
            jwt.verify(
                accessToken,
                process.env.ACCESS_KEY as string,
                (err, user) => {
                    if (err) {
                        return res
                            .status(CODE.BAD_REQUEST)
                            .json(
                                responseData(
                                    null,
                                    'Token is valid',
                                    CODE.BAD_REQUEST,
                                    true
                                )
                            );
                    }
                    req.user = user as User;
                    next();
                }
            );
        } else {
            return res
                .status(CODE.BAD_REQUEST)
                .json(
                    responseData(
                        null,
                        "You're not Authorization",
                        CODE.BAD_REQUEST,
                        true
                    )
                );
        }
    };

    verifyTokenAndAdminAuth = (
        req: RequestMiddleware,
        res: Response,
        next: NextFunction
    ) => {
        this.verifyToken(req, res, () => {
            if (req.user?.id === Number(req.params.id)) {
                next();
            } else {
                res.status(CODE.BAD_REQUEST).json(
                    responseData(
                        null,
                        'You not permission',
                        CODE.BAD_REQUEST,
                        true
                    )
                );
            }
        });
    };
}

export default new AuthMiddleware();
