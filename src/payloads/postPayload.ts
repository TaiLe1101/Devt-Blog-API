export interface GetDetailPostPayload {
    postId: string;
}

export interface CreatePostPayload {
    title: string;
    content: string;
    fileImage?: File;
}
