/* eslint-disable @typescript-eslint/no-explicit-any */
import { __PROD__, CODE } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import ThrowResponse from '../../types/ThrowResponse';
import userRepository from '../repositories/UserRepository';

class UserService {
    async getAllUsers() {
        try {
            const users = await userRepository.findAllUser();
            if (!users) {
                throw responseData(null, 'Users Empty', CODE.BAD_REQUEST, true);
            }
            return users;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async getUserByUsername(username: string) {
        try {
            const user = userRepository.findByUsername(username);

            if (!user) {
                throw responseData(
                    null,
                    'User not found',
                    CODE.NOT_FOUND,
                    true
                );
            }

            return user;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async deleteUserById(id: number) {
        try {
            const deletedRow = await userRepository.deleteById(id);

            if (deletedRow <= 0) {
                throw responseData(
                    null,
                    'User not found',
                    CODE.NOT_FOUND,
                    true
                );
            }

            return deletedRow;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }
}

export default new UserService();
