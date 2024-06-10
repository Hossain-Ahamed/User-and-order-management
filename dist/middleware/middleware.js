"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
/*------------ Logger -------------------*/
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Cookies : ', req.cookies);
    next();
};
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';
    res.status(statusCode).json({
        success: false,
        message: message,
        error: {
            // name: error.name,
            code: statusCode,
            description: error.message,
            // stack: config.stack === 'production' ? null : error.stack,
        },
    });
};
exports.middlewares = {
    logger,
    errorHandler,
};
