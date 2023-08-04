import { BaseParam } from './../common';
import { FileUpload } from '../types/FileUpload';

/** GET */
export interface GetDetailPostParam extends BaseParam {
    postId: string;
}

/** CREATE */

/** CONTROLLER */
export interface CreatePostBody {
    title: string;
    desc: string;
    content: string;
}
export type UpdatePostBody = CreatePostBody;
export interface UpdatePostParam extends BaseParam {
    postId: string;
}

/** SERVICE */
export interface CreatePostPayload extends CreatePostBody {
    userId: number;
    file: FileUpload;
}
export type UpdatePostPayload = CreatePostPayload;

/** DELETE */

/** CONTROLLER */
export interface DeletePostParam extends BaseParam {
    postId: string;
}

/** SERVICE */

export interface DeletePostPayload {
    id: number;
}
