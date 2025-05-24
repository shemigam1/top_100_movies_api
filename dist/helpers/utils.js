"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDetails = exports.formatData = exports.discover_serializer = exports.search_serializer = exports.verifyJwt = exports.signJwt = exports.ResultFunction = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const ResultFunction = (success, message, code, returnStatus, data) => {
    return {
        success,
        message,
        code,
        returnStatus,
        data,
    };
};
exports.ResultFunction = ResultFunction;
const signJwt = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, config_1.default.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }
    catch (error) {
        return null;
    }
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        const verify = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        return verify;
    }
    catch (error) {
        return error;
    }
};
exports.verifyJwt = verifyJwt;
const search_serializer = ({ movieTitle, language, page, include_adult }) => {
    if (!language)
        language = 'en-US';
    if (!page)
        page = 1;
    if (!include_adult)
        include_adult = false;
    return `${config_1.default.MOVIE_API_SEARCH}?query=${movieTitle}&include_adult=${include_adult}&language=${language}&page=${page}`;
};
exports.search_serializer = search_serializer;
const discover_serializer = ({ page }) => {
    if (!page)
        page = 1;
    return `${config_1.default.MOVIE_API_DISCOVER}&page=${page}`;
};
exports.discover_serializer = discover_serializer;
const formatData = (data) => {
    const returnData = [];
    data.forEach((movie) => {
        returnData.push({
            api_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date
        });
    });
    return returnData;
};
exports.formatData = formatData;
const formatDetails = (data) => {
    const returnData = {
        api_id: data.id,
        title: data.title,
        poster_path: data.poster_path,
        release_date: data.release_date,
        original_language: data.original_language,
        original_title: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        // genre_ids: data.genre_ids
    };
    return returnData;
};
exports.formatDetails = formatDetails;
