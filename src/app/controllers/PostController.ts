/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import postService from '../services/PostService';
import { responseData } from '../../helpers';
import ThrowResponse from '../../types/ThrowResponse';
import { CODE } from '../../constant';
import { RequestMiddleware } from '../../types/RequestMiddleware';
import { validateValues } from '../../validators';

class PostController {
    async index(_req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            return res
                .status(CODE.SUCCESS)
                .json(responseData(posts, 'Get Posts Successfully'));
        } catch (error) {
            const err = error as ThrowResponse;

            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async getById(req: Request, res: Response) {
        const id = Number(req.query.id);
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

            const post = await postService.getPostById(id);

            return res.status(CODE.SUCCESS).json(responseData(post, 'Ok'));
        } catch (error) {
            const err = error as ThrowResponse;
            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async create(req: RequestMiddleware, res: Response) {
        const title = req.body.title;
        const content = req.body.content;
        const thumbnail = '';
        const userId = Number(req.user?.id);

        try {
            if (
                validateValues([title, content, userId], {
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

            const post = await postService.createPost(
                title,
                content,
                thumbnail,
                userId
            );

            return res.status(CODE.SUCCESS).json(responseData(post, 'Ok'));
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

export default new PostController();
