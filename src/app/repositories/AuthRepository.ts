import User from '../../database/models/Users';

class AuthRepository {
    async register(
        fullName: string,
        username: string,
        password: string,
        avatar?: string | null
    ) {
        const user = await User.create({
            fullName,
            username,
            password,
            avatar,
        });

        return user;
    }

    async login(username: string, password: string) {
        const user = await User.findOne({
            where: {
                username,
                password,
            },
        });

        return user;
    }
}

export default new AuthRepository();
