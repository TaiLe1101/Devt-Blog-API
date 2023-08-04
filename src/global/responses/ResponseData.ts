import { HttpStatus, HttpMessage } from '../../constants';

export class ResponseData<Data> {
    statusCode: number;
    message: string;
    data: Data;

    constructor(data: Data, statusCode?: number, message?: string) {
        this.statusCode = statusCode || HttpStatus.SUCCESS;
        this.message = message || HttpMessage.SUCCESS;
        this.data = data;

        return this;
    }

    getStatusCode() {
        return this.statusCode;
    }

    getMessage() {
        return this.message;
    }

    getData() {
        return this.data;
    }
}
