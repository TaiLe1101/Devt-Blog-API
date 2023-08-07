/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { HttpStatus } from '../../constants';
import { HttpException, HttpValidateException } from '../../exceptions';
import { ResponseData } from '../../global/responses';
import {
    GetDetailPostParam,
    UpdatePostBody,
    UpdatePostParam,
} from '../../payloads';
import { CreatePostBody, DeletePostParam } from '../../payloads/PostPayload';
import { RequestAuth } from '../../types/Request';
import { validateValues } from '../../validators';
import postService from '../services/PostService';

class PostController {
    async index(req: Request, res: Response) {
        try {
            const posts = await postService.findAll();
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

    async detail(req: Request<GetDetailPostParam>, res: Response) {
        const id = Number(req.params.postId);
        try {
            if (validateValues([id], { unPositiveNumber: true })) {
                throw new HttpValidateException();
            }

            const post = await postService.findOneById(id);

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

    async create(req: RequestAuth<CreatePostBody>, res: Response) {
        const { content, desc, title } = req.body;
        const file = req.file;
        const test = req.files;
        const userId = Number(req.user?.id);

        try {
            if (
                validateValues([title, content, userId, desc], {
                    unPositiveNumber: true,
                })
            ) {
                throw new HttpValidateException();
            }

            const post = await postService.create({
                title,
                content,
                file,
                desc,
                userId,
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
        req: RequestAuth<UpdatePostBody, any, UpdatePostParam>,
        res: Response
    ) {
        const id = Number(req.params.postId);
        const { title, content, desc } = req.body;
        const file = req.file;
        const userId = Number(req.user?.id);

        try {
            const result = await postService.update(id, {
                title,
                content,
                desc,
                file,
                userId,
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

    async delete(req: RequestAuth<any, any, DeletePostParam>, res: Response) {
        const postId = Number(req.params.postId);
        try {
            const result = await postService.delete(postId);
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
