import { __PROD__, CODE } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import ThrowResponse from '../../types/ThrowResponse';
import cookieStoreRepository from '../repositories/CookieStoreRepository';

class CookieStoreService {
    async createRefreshToken(value: string) {
        try {
            const refreshToken = await cookieStoreRepository.create(value);

            if (!refreshToken) {
                throw responseData(
                    null,
                    'Created failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            return refreshToken;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async findRefreshTokenByValue(value: string) {
        try {
            const refreshToken = await cookieStoreRepository.findByValue(value);
            return refreshToken;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async deleteRefreshTokeByValue(value: string) {
        try {
            const deleteResult = await cookieStoreRepository.delete(value);

            if (!deleteResult) {
                throw responseData(
                    null,
                    'Deleted failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            return deleteResult;
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

export default new CookieStoreService();
