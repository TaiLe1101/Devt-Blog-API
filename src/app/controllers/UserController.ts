import { Request, Response } from 'express';
import userService from '../services/UserService';
import { responseData } from '../../helpers';
import { CODE } from '../../constant';
import ThrowResponse from '../../types/ThrowResponse';
import { RequestMiddleware } from '../../types/RequestMiddleware';
import { FileUpload } from '../../types/FileUpload';

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
            if (isNaN(id) || id <= 0) {
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
        const fullName = req.body.fullName;
        const avatarFile = req.file;
        const id = Number(req.user?.id);
        const oldAvatar = req.user?.avatar;

        try {
            const result = await userService.updateUserById(
                id,
                fullName,
                avatarFile,
                oldAvatar
            );

            return res
                .status(CODE.SUCCESS)
                .json(responseData(result, 'Updated successfully'));
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
