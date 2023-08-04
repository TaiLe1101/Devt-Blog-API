/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export interface UserJwt {
    id: string;
    iat: number;
    exp: number;
}

export type RequestAuth<
    BodyPayload = any,
    QueryPayload = any,
    ParamPayload = any
> = Request<ParamPayload, any, BodyPayload, QueryPayload> & {
    user?: UserJwt;
};
