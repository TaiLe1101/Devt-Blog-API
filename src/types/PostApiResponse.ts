import Post from '../database/models/Posts';
import IApiResponse from '../interfaces/IApiResponse';

interface PostApiResponse extends IApiResponse {
    data?: Post | Post[] | null;
}

export default PostApiResponse;
