import Comment from '../../database/models/Comments';

class CommentRepository {
    async add(content: string, userId: number, postId: number) {
        const comment = await Comment.create({
            content,
            userId,
            postId,
        });

        return comment;
    }

    async getByPostId(postId: number) {
        const comments = await Comment.findAll({
            where: {
                postId,
            },
        });

        return comments;
    }
}

export default new CommentRepository();
