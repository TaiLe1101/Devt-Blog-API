import { HttpMessage, HttpStatus } from '../constants';

export class HttpException {
    protected statusCode: number;
    protected message: string;
    protected data: null;

    constructor(message?: string, statusCode?: number) {
        this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
        this.message = message || HttpMessage.BAD_REQUEST;
        this.data = null;
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

export class HttpNotFoundException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class HttpUnAuthorizedException extends HttpException {
    constructor(message?: string) {
        super(message || HttpMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
}

export class HttpValidateException extends HttpException {
    constructor(message?: string) {
        super(message || 'Validate');
    }
}

export class HttpServerException extends HttpException {
    constructor() {
        super(HttpMessage.INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER);
    }
}
