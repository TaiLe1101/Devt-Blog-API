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
                    'You not comment in this post',
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
}

export default new CommentService();
