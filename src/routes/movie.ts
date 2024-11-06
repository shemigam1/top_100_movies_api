import { Router } from "express";
import { searchMovieController } from "../controllers/movie";

const movieRouter = Router()

movieRouter.get('/search?', searchMovieController)

export default movieRouter