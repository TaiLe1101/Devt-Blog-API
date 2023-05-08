import { CODE, __PROD__ } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import ThrowResponse from '../../types/ThrowResponse';
import commentRepository from '../repositories/CommentRepository';

class CommentService {
    async addComment(content: string, userId: number, postId: number) {
        try {
            const comment = await commentRepository.add(
                content,
                userId,
                postId
            );

            if (!comment) {
                throw responseData(
                    null,
                    "You can't comment",
                    CODE.BAD_REQUEST,
                    true
                );
            }
            return comment;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);

            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async getCommentByPostId(postId: number) {
        try {
            const comments = await commentRepository.getByPostId(postId);

            return comments;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);
            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async deleteCommentById(id: number) {
        try {
            const deletedResult = await commentRepository.delete(id);

            if (deletedResult <= 0) {
                throw responseData(
                    null,
                    'Deleted comment failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            return deletedResult;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);
            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }
}

export default new CommentService();
