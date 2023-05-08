import User, { UserAttributes } from '../../database/models/Users';

class UserRepository {
    async findAllUser() {
        const users = await User.findAll();
        return users;
    }

    async findByUsername(username: string) {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        return user;
    }

    async findById(id: number) {
        const user = await User.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    async deleteById(id: number) {
        const deletedRow = await User.destroy({
            where: {
                id,
            },
        });

        return deletedRow;
    }

    async updateById(
        id: number,
        fullName: string | null,
        avatar: string | null
    ) {
        const user = await User.findOne({ where: { id } });

        const fields: (keyof UserAttributes)[] | undefined =
            [] as (keyof UserAttributes)[];

        if (fullName !== null) fields?.push('fullName');
        if (avatar !== null) fields?.push('avatar');

        const updatedUser = user?.update(
            {
                fullName,
                avatar,
            },
            {
                fields,
            }
        );

        return updatedUser;
    }
}

export default new UserRepository();
