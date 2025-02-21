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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieNightController = exports.getMovieDetailsController = exports.rankController = exports.discoverController = exports.getListController = exports.removeMovieFromListController = exports.addMovieToListController = exports.searchMovieController = void 0;
const factories_1 = require("../services/factories");
const searchMovieController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        movieTitle: req.body.movieTitle,
        language: req.body.language,
        page: req.body.page,
        include_adult: false
    };
    const response = yield (0, factories_1.movieFactory)().search(input);
    console.log(response.data);
    return res.status(response.code).json(response);
});
exports.searchMovieController = searchMovieController;
const addMovieToListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        api_id: req.body.api_id,
        user: res.locals.user
    };
    const response = yield (0, factories_1.movieFactory)().addMovieToList(input);
    // console.log(await res.locals.user);
    return res.status(response.code).json(response);
    // return res.status(200).json({ error: "error" })
});
exports.addMovieToListController = addMovieToListController;
const removeMovieFromListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        api_id: req.body.api_id,
        user: res.locals.user
    };
    const response = yield (0, factories_1.movieFactory)().removeMovieFromList(input);
    return res.status(response.code).json(response);
});
exports.removeMovieFromListController = removeMovieFromListController;
const getListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        user: res.locals.user,
    };
    const response = yield (0, factories_1.movieFactory)().getList(input);
    return res.status(response.code).json(response);
});
exports.getListController = getListController;
const discoverController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        page: req.body.page,
    };
    const response = yield (0, factories_1.movieFactory)().discover(input);
    return res.status(response.code).json(response);
});
exports.discoverController = discoverController;
const rankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        user: res.locals.user,
        old_rank: req.body.old_rank,
        new_rank: req.body.new_rank
    };
    const response = yield (0, factories_1.movieFactory)().rank(input);
    return res.status(response.code).json(response);
});
exports.rankController = rankController;
const getMovieDetailsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        api_id: req.body.api_id,
        user: res.locals.user
    };
    const response = yield (0, factories_1.movieFactory)().getMovieDetails(input);
    return res.status(response.code).json(response);
});
exports.getMovieDetailsController = getMovieDetailsController;
const MovieNightController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, factories_1.movieFactory)().MovieNight();
    return res.status(response.code).json(response);
});
exports.MovieNightController = MovieNightController;
