import cloudinary from '../../configs/connectDbImages';
import { Server } from '../../constants';
import {
    HttpException,
    HttpNotFoundException,
    HttpServerException,
} from '../../exceptions';
import logger from '../../helpers/logger';
import { CreatePostPayload, UpdatePostPayload } from '../../payloads';
import postRepository from '../repositories/PostRepository';

class PostService {
    async getAllPosts() {
        try {
            const posts = await postRepository.findAll();

            return posts;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async getPostById(id: number) {
        try {
            const post = await postRepository.findOneById(id);

            if (!post) {
                throw new HttpException('Post is not exists');
            }

            return post;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async createPost(userId: number, payload: CreatePostPayload) {
        try {
            let thumbnail = '';
            let imgId = '';

            if (payload.fileImage) {
                const res = await cloudinary.uploader.upload(
                    payload.fileImage.path,
                    (err) => {
                        if (err) {
                            console.log('err ->', err);
                            throw new HttpException();
                        }
                    }
                );

                thumbnail = res.secure_url;
                imgId = res.public_id;
            }

            const createdPost = await postRepository.create({
                content: payload.content,
                title: payload.title,
                userId,
                thumbnail,
                desc: payload.desc,
                imgId,
            });

            if (!createdPost) {
                throw new HttpException();
            }

            return createdPost;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            } else {
                if (!Server.__PROD__) logger.error(error);
                throw new HttpServerException();
            }
        }
    }

    async updatePost(id: number, userId: number, payload: UpdatePostPayload) {
        try {
            let thumbnail = '';
            let imgId = '';
            if (payload.fileImage) {
                const findPost = await postRepository.findOneById(id);
                if (!findPost) {
                    throw new HttpNotFoundException();
                }
                cloudinary.uploader.destroy(findPost.imgId);

                const res = await cloudinary.uploader.upload(
                    payload.fileImage.path,
                    (err) => {
                        if (err) {
                            console.log('err ->', err);
                            throw new HttpException();
                        }
                    }
                );

                thumbnail = res.secure_url;
                imgId = res.public_id;
            }

            const post = await postRepository.update(id, {
                ...payload,
                userId,
                thumbnail,
                imgId,
            });

            if (!post) {
                throw new HttpNotFoundException();
            }

            return post;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }
}
export default new PostService();
