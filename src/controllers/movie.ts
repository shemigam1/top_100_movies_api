import { Request, Response, NextFunction } from 'express'
import { IAddMovie, IDiscover, IGetList, IRank, ISearchMovie, IUpdateMovie } from '../types/movie'
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
        api_id: req.body.api_id,
        user: res.locals.user
    }

    const response = await movieFactory().addMovieToList(input)
    // console.log(await res.locals.user);

    return res.status(response.code).json(response);
    // return res.status(200).json({ error: "error" })
}

export const removeMovieFromListController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IAddMovie = {
        api_id: req.body.api_id,
        user: res.locals.user
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
        user: res.locals.user,
    }

    const response = await movieFactory().getList(input)
    return res.status(response.code).json(response);
}


export const discoverController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IDiscover = {
        page: req.body.page,
    }

    const response = await movieFactory().discover(input)
    return res.status(response.code).json(response);
}

export const rankController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IRank = {
        user: res.locals.user,
        api_id: req.body.api_id,
        new_rank: req.body.new_rank
    }

    const response = await movieFactory().rank(input)
    // return res.status(response.code).json(response);
}


export const getMovieDetailsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IAddMovie = {
        api_id: req.body.api_id,
        user: res.locals.user
    }

    const response = await movieFactory().getMovieDetails(input)
    return res.status(response.code).json(response);
}