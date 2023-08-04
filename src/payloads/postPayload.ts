import { FileUpload } from '../types/FileUpload';

export interface GetDetailPostPayload {
    postId: string;
}

export interface CreatePostPayload {
    title: string;
    content: string;
    desc: string;
    imgId: string;
    fileImage?: FileUpload;
}

export interface UpdatePostPayload {
    title: string;
    content: string;
    desc: string;
    fileImage?: FileUpload;
}
