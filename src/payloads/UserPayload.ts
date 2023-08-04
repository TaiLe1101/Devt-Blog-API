import { FileUpload } from '../types/FileUpload';

export interface UserUpdatePayload {
    fullName: string;
    fileImage: FileUpload;
    email: string;
    address: string;
    phoneNumber: string;
}

export interface DeleteUserPayload {
    id: string;
}
