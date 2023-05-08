"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertSignStringToUnSignString(str) {
    const convertedStr = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    const lowerCaseStr = convertedStr.toLowerCase();
    return lowerCaseStr;
}
exports.default = convertSignStringToUnSignString;
