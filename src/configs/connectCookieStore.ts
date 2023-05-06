import mongoose from 'mongoose';
import logger from '../helpers/logger';

async function connectCookieStore() {
    const password = process.env.MG_PASSWORD as string;
    const username = process.env.MG_USER as string;
    try {
        await mongoose.connect(
            `mongodb+srv://${username}:${password}@redis.p6nxbgd.mongodb.net/?retryWrites=true&w=majority`
        );
        logger.info('⚡️[server]: Connect to Cookie Store successfully');
    } catch (error) {
        logger.error('⚡️[server]: Connect to Cookie Store failed');
    }
}

export default connectCookieStore;
