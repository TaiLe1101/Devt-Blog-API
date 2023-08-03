import User, { UserAttributes } from '../../database/models/Users';

class UserRepository {
    async findAll(): Promise<User[]> {
        return await User.findAll({
            attributes: [
                'id',
                'fullName',
                'avatar',
                'username',
                'email',
                'address',
                'phoneNumber',
                'createdAt',
                'updatedAt',
            ],
        });
    }

    async findOneByUsername(username: string) {
        return await User.findOne({
            where: {
                username,
            },
        });
    }

    async findOneById(id: number) {
        return await User.findOne({
            where: {
                id,
            },
        });
    }

    async deleteOneById(id: number) {
        return await User.destroy({
            where: {
                id,
            },
        });
    }

    async update(id: number, payload: UserAttributes) {
        await User.update(payload, {
            where: {
                id,
            },
        });

        return await this.findOneById(id);
    }
}

export default new UserRepository();
