import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import process from 'process';
import logger from '../helpers/logger';

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost || 'development',
    dialect: 'postgres',
    logging: false,
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        logger.info('⚡️[server]: Connect to database successfully.');
    } catch (error) {
        logger.error(
            '⚡️[server]: Unable to connect to the database:\n',
            error
        );
    }
};

export { sequelize };

export default connectDb;
