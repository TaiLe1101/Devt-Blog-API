/* eslint-disable @typescript-eslint/no-explicit-any */
class Logger {
    info(...msg: any) {
        console.info('[INFO]:', ...msg);
    }

    error(...msg: any) {
        console.error('[ERROR]:', ...msg);
    }

    log(...msg: any) {
        console.log('[LOG]:', ...msg);
    }
}

export default new Logger();
