/* eslint-disable @typescript-eslint/no-explicit-any */
import { CODE, __PROD__ } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import postRepository from '../repositories/PostRepository';

class PostService {
    async getAllPosts() {
        try {
            const posts = await postRepository.getAll();

            if (!posts) {
                throw responseData(
                    null,
                    "Can't get posts",
                    CODE.NOT_FOUND,
                    true
                );
            }

            return posts;
        } catch (error: any) {
            if (error.status) {
                throw error;
            }
            if (!__PROD__) logger.error(error.message);

            throw responseData(null, 'Server', CODE.SERVER, true);
        }
    }

    async getPostById(id: number) {
        try {
            const post = await postRepository.getById(id);

            if (!post) {
                throw responseData(
                    null,
                    'Post not found',
                    CODE.NOT_FOUND,
                    true
                );
            }

            return post;
        } catch (error: any) {
            if (error.status) {
                throw error;
            }
            if (!__PROD__) logger.error(error.message);

            throw responseData(null, 'Server', CODE.SERVER, true);
        }
    }

    async createPost(
        title: string,
        content: string,
        thumbnail: string,
        userId: number
    ) {
        try {
            const createdPost = await postRepository.create(
                title,
                content,
                thumbnail,
                userId
            );

            if (!createdPost) {
                throw responseData(
                    null,
                    "Can't create post",
                    CODE.NOT_FOUND,
                    true
                );
            }

            return createdPost;
        } catch (error: any) {
            if (error.status) {
                throw error;
            }
            if (!__PROD__) logger.error(error.message);
            throw responseData(null, 'Server', CODE.SERVER, true);
        }
    }
}
export default new PostService();
