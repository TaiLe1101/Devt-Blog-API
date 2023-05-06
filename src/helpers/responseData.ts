/* eslint-disable @typescript-eslint/no-explicit-any */
import PostApiResponse from '../types/PostApiResponse';

function responseResponse(
    data: any,
    message = 'success',
    status = 200,
    error = false
): PostApiResponse {
    return {
        status,
        error,
        message,
        data,
    };
}

export default responseResponse;
