"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = exports.createResponse = void 0;
const createResponse = (status, data) => {
    return {
        status,
        data,
    };
};
exports.createResponse = createResponse;
exports.constants = {
    SUCCESS_MESSAGE: "success",
    FAILED_MESSAGE: "failed",
};
