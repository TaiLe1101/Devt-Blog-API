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
        avatar: string | null,
        email?: string | null,
        phoneNumber?: string | null,
        address?: string | null
    ) {
        const user = await User.findOne({ where: { id } });

        const fields: (keyof UserAttributes)[] | undefined =
            [] as (keyof UserAttributes)[];

        if (fullName !== null) fields?.push('fullName');
        if (avatar !== null) fields?.push('avatar');
        if (email !== null) fields?.push('email');
        if (phoneNumber !== null) fields?.push('phoneNumber');
        if (address !== null) fields?.push('address');

        const updatedUser = await user?.update(
            {
                fullName,
                avatar,
                email,
                phoneNumber,
                address,
            },
            {
                fields,
            }
        );

        return updatedUser;
    }
}

export default new UserRepository();
