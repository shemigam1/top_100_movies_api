import { Request, Response, NextFunction } from 'express'
import { IAddMovie, IGetList, ISearchMovie, IUpdateMovie } from '../types/movie'
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

export const addMovieToListController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IAddMovie = {
        userId: req.body.userId,
        originalMovieTitle: req.body.originalMovieTitle
    }

    const response = await movieFactory().addMovieToList(input)
    // console.log(response.data);

    return res.status(response.code).json(response);
}

export const removeMovieFromListController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IUpdateMovie = {
        userId: req.body.userId,
        api_id: req.body.api_id,
        update: { deleted: true }
    }

    const response = await movieFactory().removeMovieFromList(input)
    return res.status(response.code).json(response);
}

export const getListController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetList = {
        userId: req.body.userId,
    }

    const response = await movieFactory().getList(input)
    return res.status(response.code).json(response);
}
