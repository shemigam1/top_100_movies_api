"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const joiMiddleware_1 = __importDefault(require("../middlewares/joiMiddleware"));
const auth_2 = require("../validators/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, joiMiddleware_1.default)(auth_2.loginValidator), auth_1.loginController);
authRouter.post('/signup', (0, joiMiddleware_1.default)(auth_2.signupValidator), auth_1.signupController);
authRouter.post('/forgotPassword', (0, joiMiddleware_1.default)(auth_2.forgotPasswordValidator), auth_1.forgotPasswordController);
exports.default = authRouter;
