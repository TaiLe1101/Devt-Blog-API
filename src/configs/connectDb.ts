/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import process from 'process';
import { DataSource as DataSourceConfig } from 'typeorm';
import logger from '../helpers/logger';

dotenv.config();

export const AppDataSource = new DataSourceConfig({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.ts'],
    synchronize: true,
});

const connectDb = async () => {
    try {
        await AppDataSource.initialize();
        logger.info('⚡️[server]: Connect to database successfully.');
    } catch (error) {
        logger.error(
            '⚡️[server]: Unable to connect to the database:\n',
            error
        );
    }
};

export default connectDb;
