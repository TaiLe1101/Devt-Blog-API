import { Server } from '../../constants';
import { HttpException, HttpServerException } from '../../exceptions';
import { ResponseData } from '../../global/responses';
import logger from '../../helpers/Logger';
import cookieStoreRepository from '../repositories/CookieStoreRepository';

class CookieStoreService {
    async createRefreshToken(value: string) {
        try {
            const refreshToken = await cookieStoreRepository.create(value);

            if (!refreshToken) {
                throw new ResponseData(true);
            }

            return refreshToken;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async deleteRefreshTokeByValue(value: string) {
        try {
            const deleteResult = await cookieStoreRepository.delete(value);

            if (deleteResult.deletedCount < 0) {
                throw new HttpException();
            }

            return !!deleteResult.deletedCount;
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

export default new CookieStoreService();
