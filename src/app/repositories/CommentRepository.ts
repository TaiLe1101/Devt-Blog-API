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
}

export default new CommentRepository();
