"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Logger_1 = __importDefault(require("../services/Logger"));
const utils_1 = require("../helpers/utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const generic_1 = require("../types/generic");
const errorHandler = (err, req, res, next) => {
    var _a, _b, _c, _d, _e;
    const logger = new Logger_1.default().logger;
    let message = 'Oops, something went wrong. Please try again later';
    let errCode = 422;
    console.log('error handler: ', err.message);
    if (err instanceof mongoose_1.Error.CastError) {
        //handle mongoose cast error
        message = `Invalid ${err.path}: ${err.value}.`;
        errCode = 400;
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        //handle mongoose field validation error
        const errors = Object.values(err.errors).map((error) => error.message);
        message = `Invalid input data. ${errors.join('. ')}`;
        errCode = 400;
    }
    else if (err.code === 11000) {
        //handle mongoose duplicate field errors
        const value = ((_b = (_a = err.errmsg) === null || _a === void 0 ? void 0 : _a.match(/(["'])(\\?.)*?\1/)) === null || _b === void 0 ? void 0 : _b[0]) || '';
        message = `An account with ${value} already exists! Please use another email`;
        errCode = 400;
    }
    else if (err.isAxiosError) {
        //handle axios errors
        if (err.response)
            message =
                // @ts-ignore
                ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data.error) ||
                    (
                    // @ts-ignore
                    (_d = err.response) === null || _d === void 0 ? void 0 : _d.data.message);
        else
            message = err.message;
        errCode = ((_e = err.response) === null || _e === void 0 ? void 0 : _e.status) || 500;
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        //handle jwt errors
        // err.message contains the reason for the error (as per what's wrong with the token)
        // but in a more professional setting we return 'invalid or missing token'
        message = err.message;
        errCode = 403;
    }
    else if (err instanceof Error) {
        //handle multer errors
        message = err.message;
        errCode = 422;
    }
    else if (err instanceof SyntaxError ||
        err instanceof EvalError ||
        err instanceof RangeError ||
        err instanceof ReferenceError ||
        err instanceof TypeError ||
        err instanceof URIError) {
        //handle global error types
        message = err.message;
        errCode = 400;
    }
    logger.error(`[${req.method} ${req.url}] ${
    //convert other data types to strings to ensure readability in logs
    typeof message === 'string' ? message : JSON.stringify(message)}`);
    // if (config.nodeEnv !== 'test') console.error(err);
    const response = (0, utils_1.ResultFunction)(false, message, errCode, generic_1.ReturnStatus.NOT_OK, null);
    res.status(errCode).json(response);
};
exports.default = errorHandler;
