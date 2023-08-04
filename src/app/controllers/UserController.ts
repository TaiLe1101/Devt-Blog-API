/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { HttpStatus } from '../../constants';
import { HttpException, HttpValidateException } from '../../exceptions';
import { ResponseData } from '../../global/responses';
import { UpdateUserBody, UpdateUserParam } from '../../payloads';
import { RequestAuth } from '../../types/Request';
import { isEmail } from '../../validators';
import userService from '../services/UserService';

class UserController {
    async index(req: Request, res: Response) {
        try {
            const result = await userService.findAll();
            return res
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData(result));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async update(
        req: RequestAuth<UpdateUserBody, any, UpdateUserParam>,
        res: Response
    ) {
        const { address, email, fullName, phoneNumber } = req.body;
        const userId = Number(req.user?.id);
        const file = req.file;

        try {
            if (email) {
                if (!isEmail(email)) {
                    throw new HttpValidateException();
                }
            }

            const result = await userService.update(userId, {
                address,
                email,
                file,
                fullName,
                phoneNumber,
            });

            return res
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

export default new UserController();
