import { Request, Response } from 'express';
import userService from '../services/UserService';
import { responseData } from '../../helpers';
import { CODE } from '../../constant';
import ThrowResponse from '../../types/ThrowResponse';
import { RequestMiddleware } from '../../types/RequestMiddleware';
import { isEmail, validateValues } from '../../validators';

class UserController {
    async index(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            return res
                .status(CODE.SUCCESS)
                .json(
                    responseData(
                        users,
                        'Get users success',
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

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            if (validateValues([id], { unPositiveNumber: true })) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Id is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            await userService.deleteUserById(id);

            return res
                .status(CODE.SUCCESS)
                .json(
                    responseData(
                        null,
                        'Deleted successfully',
                        CODE.SUCCESS,
                        true
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

    async update(req: RequestMiddleware, res: Response) {
        const email: string = req.body.email;
        const address: string = req.body.address;
        const phoneNumber: string = req.body.phoneNumber;
        const fullName: string = req.body.fullName;
        const avatarFile = req.file;
        const id = Number(req.user?.id);

        try {
            if (!isEmail(email)) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Email is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const result = await userService.updateUserById(
                id,
                fullName,
                avatarFile,
                email,
                phoneNumber,
                address
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...other } = result.dataValues;
            return res
                .status(CODE.SUCCESS)
                .json(responseData({ ...other }, 'Updated successfully'));
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

export default new UserController();
