import Post from '../../database/models/Posts';
import User from '../../database/models/Users';

class PostRepository {
    async getAll() {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'postUserData',
                    attributes: ['id', 'fullName'],
                },
            ],
        });

        return posts;
    }

    async getById(id: number) {
        const post = await Post.findOne({
            where: {
                id,
            },
            include: {
                model: User,
                as: 'postUserData',
                attributes: ['id', 'fullName'],
            },
        });

        return post;
    }

    async create(
        title: string,
        content: string,
        thumbnail: string,
        userId: number
    ) {
        const createdPost = await Post.create({
            title,
            content,
            thumbnail,
            userId,
        });

        return createdPost;
    }
}

export default new PostRepository();
