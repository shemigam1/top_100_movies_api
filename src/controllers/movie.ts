import { Request, Response, NextFunction } from 'express'
import { ISearchMovie } from '../types/movie'
import { movieFactory } from '../services/factories'

export const searchMovieController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: ISearchMovie = {
        movieTitle: req.body.movieTitle,
        language: req.body.language,
        page: req.body.page,
        include_adult: false
    }

    const response = await movieFactory().search(input)
    console.log(response.data);

    return res.status(response.code).json(response);
}