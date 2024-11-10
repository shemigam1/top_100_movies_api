import { Router } from "express";
import { addMovieToListController, getListController, removeMovieFromListController, searchMovieController } from "../controllers/movie";

const movieRouter = Router()

movieRouter.get('/search?', searchMovieController)
movieRouter.get('/', getListController)
movieRouter.post('/add', addMovieToListController)
movieRouter.delete('/remove', removeMovieFromListController)

export default movieRouter