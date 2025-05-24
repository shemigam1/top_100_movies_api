"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = require("../controllers/movie");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const movieRouter = (0, express_1.Router)();
movieRouter.get('/search?', authMiddleware_1.default, movie_1.searchMovieController);
movieRouter.get('/', authMiddleware_1.default, movie_1.getListController);
movieRouter.post('/add', authMiddleware_1.default, movie_1.addMovieToListController);
movieRouter.delete('/remove', authMiddleware_1.default, movie_1.removeMovieFromListController);
movieRouter.get('/discover', authMiddleware_1.default, movie_1.discoverController);
movieRouter.get('/details', authMiddleware_1.default, movie_1.getMovieDetailsController);
movieRouter.get('/movie-night', movie_1.MovieNightController);
exports.default = movieRouter;
