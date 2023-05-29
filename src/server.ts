import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import process from 'process';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import route from './routes';
import connectDb from './configs/connectDb';
import logger from './helpers/logger';
import connectCookieStore from './configs/connectCookieStore';
import logENV from './helpers/logENV';
import { responseData } from './helpers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3303;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: (process.env.FE_ORIGIN as string).split(','),
        credentials: true, //access-control-allow-credentials:true
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

connectDb();
connectCookieStore();

route(app);

logENV();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json(responseData(null, 'Connect to server successfully'));
});

app.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
