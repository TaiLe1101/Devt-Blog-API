"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateValues = exports.isVerifyPassword = exports.isMinLength = exports.isEmail = exports.isPositiveNumber = exports.isNumber = exports.isStringEmpty = void 0;
function isStringEmpty(listString) {
    return listString.some((str) => str === undefined ||
        str === null ||
        str === '' ||
        (typeof str === 'string' && !str.trim()));
}
exports.isStringEmpty = isStringEmpty;
function isNumber(number) {
    return !isNaN(number);
}
exports.isNumber = isNumber;
function isPositiveNumber(number) {
    return number > 0;
}
exports.isPositiveNumber = isPositiveNumber;
function isEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.isEmail = isEmail;
function isMinLength(string, minLength) {
    return string.length >= minLength;
}
exports.isMinLength = isMinLength;
function isVerifyPassword(password, verifyPassword) {
    return password === verifyPassword;
}
exports.isVerifyPassword = isVerifyPassword;
function validateValues(values, options) {
    let isValid = false;
    values.forEach((value) => {
        if (typeof value === 'string') {
            if (value.trim().length <= 0 || value.trim() === '') {
                isValid = true;
            }
        }
        else if (value === undefined || value === null) {
            isValid = true;
        }
        else if (typeof value === 'number') {
            if (options === null || options === void 0 ? void 0 : options.unPositiveNumber) {
                if (!isPositiveNumber(value)) {
                    isValid = true;
                }
            }
            if (!isNumber(value)) {
                isValid = true;
            }
        }
    });
    return isValid;
}
exports.validateValues = validateValues;
