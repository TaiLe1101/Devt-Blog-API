/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { HttpStatus } from '../../constants';
import {
    HttpException,
    HttpNotFoundException,
    HttpValidateException,
} from '../../exceptions';
import { ResponseData } from '../../global/responses';
import { UserUpdatePayload } from '../../payloads';
import { RequestAuth } from '../../types/request';
import { isEmail } from '../../validators';
import userService from '../services/UserService';

class UserController {
    async index(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res.status(HttpStatus.SUCCESS).json(new ResponseData(users));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async update(req: RequestAuth<UserUpdatePayload>, res: Response) {
        const { address, email, fileImage, fullName, phoneNumber } = req.body;
        const userId = Number(req.user?.id);

        try {
            if (!isEmail(email)) {
                throw new HttpValidateException();
            }

            const result = await userService.updateUserById(userId, {
                fullName,
                fileImage,
                email,
                phoneNumber,
                address,
            });

            if (!result) {
                throw new HttpNotFoundException();
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion
            const { password, ...other } = result;
            return res.status(HttpStatus.SUCCESS).json(new ResponseData(other));
        } catch (error) {
            const err = error as HttpException;

            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }
}

export default new UserController();
