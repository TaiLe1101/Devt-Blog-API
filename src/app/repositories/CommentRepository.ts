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

    async delete(id: number) {
        const deletedResult = await Comment.destroy({
            where: {
                id,
            },
        });

        return deletedResult;
    }
}

export default new CommentRepository();
