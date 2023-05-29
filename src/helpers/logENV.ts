import logger from './logger';

function logENV() {
    logger.log(process.env.PORT);
    logger.log(process.env.NODE_ENV);
    logger.log(process.env.BE_ORIGIN);
    logger.log(process.env.FE_ORIGIN);
    logger.log(process.env.HOST_FE);
}

export default logENV;
