/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDataSource } from '../../configs/ConnectDb';
import cloudinary from '../../configs/ConnectDbImages';
import { Server } from '../../constants';
import { UserEntity } from '../../database/entities/UserEntity';
import { HttpException, HttpServerException } from '../../exceptions';
import logger from '../../helpers/Logger';
import { UpdateUserPayload } from '../../payloads';

class UserService {
    private readonly userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    async findAll() {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async findOneByUsername(username: string) {
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
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async update(id: number, payload: UpdateUserPayload) {
        try {
            let avatar = '';
            let imgId = '';
            const findUser = await this.userRepository.findOneBy({
                id,
            });

            if (!findUser) {
                throw new HttpException();
            }

            if (payload.file) {
                if (findUser.imgId) {
                    cloudinary.uploader.destroy(findUser.imgId);
                }

                const res = await cloudinary.uploader
                    .upload(payload.file.path)
                    .catch((err) => {
                        if (Server.__PROD__) logger.error(err);

                        throw new HttpException();
                    });

                avatar = res.secure_url;
                imgId = res.public_id;
            } else {
                avatar = findUser.avatar;
                imgId = findUser.imgId;
            }

            const updatedUser = await this.userRepository.update(id, {
                address: payload.address,
                avatar,
                imgId,
                email: payload.email,
                fullName: payload.fullName,
                phoneNumber: payload.phoneNumber,
            });

            if (!updatedUser.affected) {
                throw new HttpException();
            }

            const user = await this.userRepository.findOneBy({ id });

            return user;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }
}

export default new UserService();
