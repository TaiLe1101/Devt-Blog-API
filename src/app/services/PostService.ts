import { Server } from '../../constants';
import { HttpException, HttpServerException } from '../../exceptions';
import logger from '../../helpers/logger';
import { CreatePostPayload } from '../../payloads';
import postRepository from '../repositories/PostRepository';

class PostService {
    async getAllPosts() {
        try {
            const posts = await postRepository.findAll();

            return posts;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
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
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async createPost(userId: number, payload: CreatePostPayload) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars

            const createdPost = await postRepository.create({
                content: payload.content,
                title: payload.title,
                userId,
            });

            if (!createdPost) {
                throw new HttpException();
            }

            return createdPost;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode() === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }
}
export default new PostService();
