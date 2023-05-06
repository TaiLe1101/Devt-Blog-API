import { Request } from 'express';
import User from '../database/models/Users';

export type RequestMiddleware = Request & {
    user?: User;
};
