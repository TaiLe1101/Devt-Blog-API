import { BaseParam } from '../common';
import { FileUpload } from '../types/FileUpload';

/** UPDATE */

/** CONTROLLER */
export interface UpdateUserBody {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
}

export interface UpdateUserParam extends BaseParam {
    userId: string;
}

/** SERVICE */

export interface UpdateUserPayload extends UpdateUserBody {
    file: FileUpload;
}
