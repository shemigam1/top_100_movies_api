"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieFactory = exports.authFactory = void 0;
const auth_1 = __importDefault(require("../classes/auth"));
const movie_1 = __importDefault(require("../classes/movie"));
const authFactory = () => {
    // define parameters for initialization here
    return new auth_1.default();
};
exports.authFactory = authFactory;
const movieFactory = () => {
    return new movie_1.default();
};
exports.movieFactory = movieFactory;
