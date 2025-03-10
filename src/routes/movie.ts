import { Router } from "express";
import { addMovieToListController, discoverController, getListController, getMovieDetailsController, MovieNightController, rankController, removeMovieFromListController, searchMovieController } from "../controllers/movie";
import authMiddleWare from "../middlewares/authMiddleware";

const movieRouter = Router()

movieRouter.get('/search?', authMiddleWare, searchMovieController)
movieRouter.get('/', authMiddleWare, getListController)
movieRouter.post('/add', authMiddleWare, addMovieToListController)
movieRouter.delete('/remove', authMiddleWare, removeMovieFromListController)
movieRouter.get('/discover', authMiddleWare, discoverController)
movieRouter.get('/details', authMiddleWare, getMovieDetailsController)
movieRouter.get('/movie-night', MovieNightController)

export default movieRouter