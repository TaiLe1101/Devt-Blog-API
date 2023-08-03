/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';

import { HttpStatus } from '../../constants';
import { HttpException, HttpValidateException } from '../../exceptions';
import { ResponseData } from '../../global/responses';
import { RequestAuth } from '../../types/request';
import { validateValues } from '../../validators';
import postService from '../services/PostService';
import { CreatePostPayload, GetDetailPostPayload } from '../../payloads';

class PostController {
    async index(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            return res.status(HttpStatus.SUCCESS).json(new ResponseData(posts));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async getById(req: Request<GetDetailPostPayload>, res: Response) {
        const id = Number(req.params.postId);
        try {
            if (validateValues([id], { unPositiveNumber: true })) {
                throw new HttpValidateException();
            }

            const post = await postService.getPostById(id);

            return res.status(HttpStatus.SUCCESS).json(new ResponseData(post));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }

    async create(req: RequestAuth<CreatePostPayload>, res: Response) {
        const { title, content } = req.body;

        const userId = Number(req.user?.id);

        try {
            if (
                validateValues([title, content, userId], {
                    unPositiveNumber: true,
                })
            ) {
                throw new HttpValidateException();
            }

            const post = await postService.createPost(userId, {
                title,
                content,
            });

            return res.status(HttpStatus.SUCCESS).json(new ResponseData(post));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(new HttpException(err.getMessage(), err.getStatusCode()));
        }
    }
}

export default new PostController();
