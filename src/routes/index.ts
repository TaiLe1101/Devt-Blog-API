import { Express } from 'express';

import authRouter from './AuthRoute';
import postRouter from './PostRoute';
import userRouter from './UserRoute';

function route(app: Express) {
    const endPointURL = '/api';

    app.use(endPointURL + '/posts', postRouter);
    app.use(endPointURL + '/auth', authRouter);
    app.use(endPointURL + '/users', userRouter);
}

export default route;
