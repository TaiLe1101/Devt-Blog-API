import { Express } from 'express';

import postRouter from './post.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import commentRouter from './comment.routes';

function route(app: Express) {
    const endPointURL = '/api';

    app.use(endPointURL + '/posts', postRouter);
    app.use(endPointURL + '/auth', authRouter);
    app.use(endPointURL + '/users', userRouter);
    app.use(endPointURL + '/comments', commentRouter);
}

export default route;
