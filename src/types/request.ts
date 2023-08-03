/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import * as core from 'express-serve-static-core';

export interface UserJwt {
    id: string;
    iat: number;
    exp: number;
}

export type RequestAuth<
    BodyPayload = any,
    QueryPayload = any,
    ParamPayload = core.ParamsDictionary
> = Request<ParamPayload, any, BodyPayload, QueryPayload> & {
    user?: UserJwt;
};
