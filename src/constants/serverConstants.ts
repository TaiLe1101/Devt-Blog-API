export enum Server {
    __PROD__ = process.env.NODE_ENV === 'production' ? 1 : 0,
}
