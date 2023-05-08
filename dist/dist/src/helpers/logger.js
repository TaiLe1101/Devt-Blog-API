"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
class Logger {
    info(...msg) {
        console.info('[INFO]:', ...msg);
    }
    error(...msg) {
        console.error('[ERROR]:', ...msg);
    }
    log(...msg) {
        console.log('[LOG]:', ...msg);
    }
}
exports.default = new Logger();
