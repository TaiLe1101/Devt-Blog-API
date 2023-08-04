/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { HttpStatus } from '../../constants';
import { HttpException, HttpValidateException } from '../../exceptions';
import { ResponseData } from '../../global/responses';
import {
    CreatePostPayload,
    GetDetailPostPayload,
    UpdatePostPayload,
} from '../../payloads';
import { RequestAuth } from '../../types/request';
import { validateValues } from '../../validators';
import postService from '../services/PostService';

class PostController {
    async index(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            return res.status(HttpStatus.SUCCESS).json(new ResponseData(posts));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(
                    new ResponseData(
                        err.getData(),
                        err.getStatusCode(),
                        err.getMessage()
                    )
                );
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
                .json(
                    new ResponseData(
                        err.getData(),
                        err.getStatusCode(),
                        err.getMessage()
                    )
                );
        }
    }

    async create(req: RequestAuth<CreatePostPayload>, res: Response) {
        const { title, content, desc, imgId } = req.body;
        const fileImage = req.file;
        const userId = Number(req.user?.id);

        console.log('desc ->', desc);

        try {
            if (
                validateValues([title, content, userId, desc], {
                    unPositiveNumber: true,
                })
            ) {
                throw new HttpValidateException();
            }

            const post = await postService.createPost(userId, {
                title,
                content,
                fileImage,
                desc,
                imgId,
            });

            return res.status(HttpStatus.SUCCESS).json(new ResponseData(post));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(
                    new ResponseData(
                        err.getData(),
                        err.getStatusCode(),
                        err.getMessage()
                    )
                );
        }
    }

    async update(
        req: RequestAuth<UpdatePostPayload, any, { id: string }>,
        res: Response
    ) {
        const id = Number(req.params.id);
        const { title, content, desc } = req.body;
        const fileImage = req.file;
        const userId = Number(req.user?.id);
        try {
            const result = await postService.updatePost(id, userId, {
                title,
                content,
                desc,
                fileImage,
            });

            return res
                .status(HttpStatus.SUCCESS)
                .json(new ResponseData(result));
        } catch (error) {
            const err = error as HttpException;
            return res
                .status(err.getStatusCode())
                .json(
                    new ResponseData(
                        err.getData(),
                        err.getStatusCode(),
                        err.getMessage()
                    )
                );
        }
    }
}

export default new PostController();
