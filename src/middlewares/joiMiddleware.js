"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joiMiddleware = (schema, obj = 'body') => (req, _, next) => {
    try {
        const { error } = schema.validate(req[obj]);
        if (error) {
            // console.log('An error occured in joi validation');
            return next(error);
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.default = joiMiddleware;
