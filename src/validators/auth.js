"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordValidator = exports.signupValidator = exports.loginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.signupValidator = joi_1.default.object({
    name: joi_1.default.string().alphanum().required().min(3),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.forgotPasswordValidator = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
