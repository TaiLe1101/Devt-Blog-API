import RefreshToken from '../../database/models/Token';

class CookieStoreRepository {
    async create(value: string) {
        const refreshToken = await RefreshToken.create({
            value,
        });

        return refreshToken;
    }

    async findByValue(value: string) {
        const refreshToken = await RefreshToken.find({
            value,
        });

        return refreshToken;
    }

    async delete(value: string) {
        const deleteResult = await RefreshToken.deleteOne({
            value,
        });

        return deleteResult;
    }
}

export default new CookieStoreRepository();
