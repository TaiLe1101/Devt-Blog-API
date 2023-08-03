import User, { UserAttributes } from '../../database/models/Users';

class AuthRepository {
    async createUser(payload: UserAttributes) {
        return await User.create(payload);
    }
}

export default new AuthRepository();
