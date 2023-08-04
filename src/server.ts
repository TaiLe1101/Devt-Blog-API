import 'reflect-metadata';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Response } from 'express';
import path from 'path';
import process from 'process';

import connectCookieStore from './configs/connectCookieStore';
import connectDb from './configs/connectDb';
import { HttpStatus } from './constants';
import { ResponseData } from './global/responses';
import logger from './helpers/logger';
import route from './routes';

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
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

connectDb();
connectCookieStore();

route(app);

app.get('/', (_, res: Response) => {
    res.status(200).json(
        new ResponseData(null, HttpStatus.SUCCESS, 'Welcome to APIs DevT Blog')
    );
});

app.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
