/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDataSource } from '../../configs/ConnectDb';
import cloudinary from '../../configs/ConnectDbImages';
import { Server } from '../../constants';
import { PostEntity } from '../../database/entities/PostEntity';
import {
    HttpException,
    HttpNotFoundException,
    HttpServerException,
} from '../../exceptions';
import logger from '../../helpers/Logger';
import { CreatePostPayload, UpdatePostPayload } from '../../payloads';

class PostService {
    private readonly postRepository;

    constructor() {
        this.postRepository = AppDataSource.getRepository(PostEntity);
    }

    async findAll() {
        try {
            const posts = await this.postRepository.find({
                relations: ['user'],
            });

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

    async findOneById(id: number) {
        try {
            const post = await this.postRepository.findOne({
                where: {
                    id,
                },
                relations: ['user'],
            });

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

    async create(payload: CreatePostPayload) {
        try {
            let thumbnail = '';
            let imgId = '';

            if (payload.file) {
                const res = await cloudinary.uploader.upload(
                    payload.file.path,
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

            const newPost = this.postRepository.create({
                content: payload.content,
                desc: payload.desc,
                imgId,
                thumbnail,
                title: payload.title,
                user: {
                    id: payload.userId,
                },
            });

            const createdPost = await this.postRepository.save(newPost);

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

    async update(id: number, payload: UpdatePostPayload) {
        try {
            const findPost = await this.postRepository.findOneBy({ id });

            if (!findPost) {
                throw new HttpException();
            }

            let thumbnail = '';
            let imgId = '';

            if (payload.file) {
                if (findPost.imgId) {
                    cloudinary.uploader.destroy(findPost.imgId);
                }
                const res = await cloudinary.uploader.upload(
                    payload.file.path,
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

            const updatedPost = await this.postRepository.update(id, {
                content: payload.content,
                thumbnail,
                imgId,
                user: {
                    id: payload.userId,
                },
                desc: payload.desc,
                title: payload.title,
            });

            return !!updatedPost.affected;
        } catch (error) {
            const err = error as HttpException;
            if (typeof err.getStatusCode === 'function') {
                throw err;
            }

            if (!Server.__PROD__) logger.error(error);
            throw new HttpServerException();
        }
    }

    async delete(id: number) {
        try {
            const post = await this.postRepository.findOneBy({
                id,
            });

            if (!post) throw new HttpNotFoundException();

            cloudinary.uploader.destroy(post.imgId);

            const deletedPost = await this.postRepository.delete({
                id,
            });

            return !!deletedPost.affected;
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
