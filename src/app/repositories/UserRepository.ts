import User from '../../database/models/Users';

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

    async deleteById(id: number) {
        const deletedRow = await User.destroy({
            where: {
                id,
            },
        });

        return deletedRow;
    }
}

export default new UserRepository();
