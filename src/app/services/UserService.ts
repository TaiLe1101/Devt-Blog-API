/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';

import { Server } from '../../constants';
import { HttpException, HttpServerException } from '../../exceptions';
import logger from '../../helpers/logger';
import { UserUpdatePayload } from '../../payloads';
import userRepository from '../repositories/UserRepository';

class UserService {
    async getAllUsers() {
        try {
            const users = await userRepository.findAll();
            return users;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async getUserByUsername(username: string) {
        try {
            const user = userRepository.findOneByUsername(username);

            if (!user) {
                throw new HttpException();
            }

            return user;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async deleteUserById(id: number) {
        try {
            const deletedRow = await userRepository.deleteOneById(id);

            if (deletedRow <= 0) {
                throw new HttpException();
            }

            return !!deletedRow;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async updateUserById(id: number, payload: UserUpdatePayload) {
        try {
            let avatar: string | null = null;
            const user = await userRepository.findOneById(id);

            if (!user) {
                throw new HttpException();
            }

            if (payload.fileImage) {
                if (user.avatar) {
                    fs.unlinkSync(
                        `src/public/uploads/user/${user?.avatar
                            ?.split('/')
                            .pop()}`
                    );
                }

                avatar = `${process.env.BE_ORIGIN}/uploads/user/${payload.fileImage.filename}`;
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { fileImage, ...others } = payload;

            const updatedUser = await userRepository.update(id, {
                ...others,
                avatar,
            });

            return updatedUser;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }
}

export default new UserService();
