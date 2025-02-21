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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const generic_1 = require("../../types/generic");
const hash_1 = require("../../helpers/hash");
const user_1 = __importDefault(require("../../models/user"));
class Auth {
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                // validation
                const user = yield user_1.default.findOne({
                    email: email,
                });
                if (user) {
                    // console.log(user.password.length);
                    const passwordMatch = (0, hash_1.comparePassword)(user.password, password);
                    if (!passwordMatch) {
                        return (0, utils_1.ResultFunction)(false, 'invalid email or password', 400, generic_1.ReturnStatus.BAD_REQUEST, null);
                    }
                    const jwtToken = (0, utils_1.signJwt)(user);
                    if (!jwtToken) {
                        return (0, utils_1.ResultFunction)(false, 'unprocessable entity', 422, generic_1.ReturnStatus.NOT_OK, null);
                    }
                    const data = {
                        token: jwtToken,
                        user: {
                            id: user.id,
                            email,
                            name: user.name,
                        },
                    };
                    return (0, utils_1.ResultFunction)(true, 'login successful', 200, generic_1.ReturnStatus.OK, data);
                }
                else {
                    return (0, utils_1.ResultFunction)(false, 'user does not exist', 400, generic_1.ReturnStatus.BAD_REQUEST, null);
                }
                // check db
                // generate access token
                // maybe use jwt???
            }
            catch (error) {
                console.error(error);
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    signup(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = input;
                const data = {
                    user: {
                        name,
                        email,
                        password,
                    },
                };
                // abstract into function
                const user = yield user_1.default.findOne({
                    email: email,
                });
                if (user) {
                    return (0, utils_1.ResultFunction)(false, 'user exists already', 400, generic_1.ReturnStatus.BAD_REQUEST, null);
                }
                else {
                    try {
                        // data.user.password = await hashPassword(data.user.password)
                        // console.log(data.user.password);
                        const newUser = (yield user_1.default.create(data.user)).toObject();
                        // console.log(newUser);
                        const { password } = newUser, other = __rest(newUser, ["password"]);
                        const { _id } = other;
                        const id = _id.toString();
                        // const newList = await Top100.create({ userId: id, list: {} })
                        // console.log(newList);
                        // console.log(other);
                        // console.log(password);
                        // data.user = other
                        return (0, utils_1.ResultFunction)(true, 'signup successful', 200, generic_1.ReturnStatus.OK, other);
                    }
                    catch (error) {
                        console.log(error);
                        return (0, utils_1.ResultFunction)(false, 'sigunp failed', 400, generic_1.ReturnStatus.UNAUTHORIZED, null);
                    }
                }
            }
            catch (error) {
                // console.log(error);
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    forgotPassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = input;
            // check if user exists
            const user = yield user_1.default.findOne({
                email: email,
            });
            if (!user) {
                // user does not exist
                return (0, utils_1.ResultFunction)(false, 'user does not exist', 442, generic_1.ReturnStatus.BAD_REQUEST, null);
            }
            // send email with otp
            return (0, utils_1.ResultFunction)(false, 'check your email', 200, generic_1.ReturnStatus.OK, null);
        });
    }
    confirmOTP(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // confirm otp
        });
    }
    changePassword(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // once otp is confirmed
            // change password
        });
    }
}
exports.default = Auth;
