import { Request, Response } from 'express';
import ThrowResponse from '../../types/ThrowResponse';
import { responseData } from '../../helpers';
import commentService from '../services/CommentService';
import { CODE } from '../../constant';
import { RequestMiddleware } from '../../types/RequestMiddleware';

class CommentController {
    async add(req: RequestMiddleware, res: Response) {
        const content: string = req.body.content;
        const userId = Number(req.user?.id);
        const postId = Number(req.params.postId);

        try {
            if (
                content.trim().length <= 0 ||
                isNaN(userId) ||
                isNaN(postId) ||
                postId <= 0 ||
                userId <= 0
            ) {
                res.status(CODE.BAD_REQUEST).json(
                    responseData(null, 'Value is valid', CODE.BAD_REQUEST, true)
                );
            }

            const comment = await commentService.addComment(
                content,
                userId,
                postId
            );

            return res
                .status(CODE.SUCCESS)
                .json(responseData(comment, 'Comment success'));
        } catch (error) {
            const err = error as ThrowResponse;
            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async getByPostId(req: Request, res: Response) {
        const postId = Number(req.params.postId);
        try {
            if (postId <= 0 || isNaN(postId)) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Id is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const comments = await commentService.getCommentByPostId(postId);
            return res
                .status(CODE.SUCCESS)
                .json(responseData(comments, 'Get comment success'));
        } catch (error) {
            const err = error as ThrowResponse;
            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }
}

export default new CommentController();
