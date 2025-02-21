"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
const generic_1 = require("../types/generic");
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract auth header
    const authorization = req.headers.authorization;
    const response = (0, utils_1.ResultFunction)(false, 'invalid or missing token', 401, generic_1.ReturnStatus.INVALID_TOKEN, null);
    if (!authorization) {
        return res.status(response.code).json(response);
    }
    // check if token is bearer token
    if (authorization.startsWith('Bearer ') === false) {
        return res.status(response.code).json(response);
    }
    const token = authorization.split(' ')[1];
    // extract jwt token
    if (!token) {
        return res.status(response.code).json(response);
    }
    // console.log('token got here');
    // verify jwt token
    const payload = (0, utils_1.verifyJwt)(token);
    if (payload instanceof jsonwebtoken_1.JsonWebTokenError) {
        // if it's an instance of JsonWebTokenError then something was wrong with the token
        // check how JsonWebTokenError is handled in error handler
        return next(payload);
    }
    // console.log('token got verified');
    const id = payload._id;
    // console.log(id);
    // find user and add to res object
    const user = yield user_1.default.findOne({ _id: id });
    if (user) {
        const currentUser = {
            id: id,
            email: user.email,
            name: user.name
        };
        res.locals.user = currentUser;
    }
    // console.log('token got into res.locals');
    next();
});
exports.default = authMiddleWare;
