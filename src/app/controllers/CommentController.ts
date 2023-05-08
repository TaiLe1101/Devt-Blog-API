import { Request, Response } from 'express';
import ThrowResponse from '../../types/ThrowResponse';
import { responseData } from '../../helpers';
import commentService from '../services/CommentService';
import { CODE } from '../../constant';
import { RequestMiddleware } from '../../types/RequestMiddleware';
import { validateValues } from '../../validators';

class CommentController {
    async create(req: RequestMiddleware, res: Response) {
        const content: string = req.body.content;
        const userId = Number(req.user?.id);
        const postId = Number(req.params.postId);

        try {
            if (
                validateValues([content, postId, userId], {
                    unPositiveNumber: true,
                })
            ) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Value is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const comment = await commentService.addComment(
                content,
                userId,
                postId
            );

            return res
                .status(CODE.SUCCESS)
                .json(responseData(comment, 'Comment successfully'));
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
            if (validateValues([postId], { unPositiveNumber: true })) {
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

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            if (validateValues([id], { unPositiveNumber: true })) {
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

            await commentService.deleteCommentById(id);

            return res
                .status(CODE.SUCCESS)
                .json(responseData(null, 'Deleted successfully'));
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
