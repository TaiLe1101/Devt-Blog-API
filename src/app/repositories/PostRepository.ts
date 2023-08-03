import { PostAttributes } from './../../database/models/Posts';
import Post from '../../database/models/Posts';
import User from '../../database/models/Users';

class PostRepository {
    async findAll(): Promise<Post[]> {
        return await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'fullName',
                        'username',
                        'email',
                        'avatar',
                        'address',
                        'phoneNumber',
                    ],
                },
            ],
        });
    }

    async findOneById(id: number) {
        const post = await Post.findOne({
            where: {
                id,
            },
            include: {
                model: User,
                as: 'postUserData',
                attributes: [
                    'id',
                    'fullName',
                    'username',
                    'email',
                    'avatar',
                    'address',
                    'phoneNumber',
                ],
            },
        });

        return post;
    }

    async create(payload: PostAttributes) {
        return await Post.create(payload);
    }
}

export default new PostRepository();
