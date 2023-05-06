"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseResponse(data, message = 'success', status = 200, error = false) {
    return {
        status,
        error,
        message,
        data,
    };
}
exports.default = responseResponse;
