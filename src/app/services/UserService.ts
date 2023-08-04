/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';

import { AppDataSource } from '../../configs/connectDb';
import { Server } from '../../constants';
import { UserEntity } from '../../database/entities/UserEntity';
import { HttpException, HttpServerException } from '../../exceptions';
import logger from '../../helpers/logger';
import { UserUpdatePayload } from '../../payloads';

class UserService {
    private readonly userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.find();
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
            const user = this.userRepository.findOneBy({
                username,
            });

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

    async updateUserById(id: number, payload: UserUpdatePayload) {
        try {
            let avatar = '';
            const user = await this.userRepository.findOneBy({
                id,
            });

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

            await this.userRepository.update(id, {
                ...others,
                avatar,
            });

            const userR = await this.userRepository.findOneBy({
                id,
            });

            return userR;
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
