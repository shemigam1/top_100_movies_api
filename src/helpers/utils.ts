import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import config from './config';
import { ICache, IDiscover, IMovieResult, ISearchMovie } from '../types/movie';

export const ResultFunction = <T>(
	success: boolean,
	message: string,
	code: number,
	returnStatus: string,
	data: T
) => {
	return {
		success,
		message,
		code,
		returnStatus,
		data,
	};
};

export const signJwt = (user: any) => {
	try {
		const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET, {
			expiresIn: '1h',
		});
		return token;
	} catch (error) {
		return null;
	}
};
export const verifyJwt = (token: string) => {
	try {
		const verify = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
		return verify;
	} catch (error: any) {
		return error as JsonWebTokenError;
	}
};

export const search_serializer = ({ movieTitle, language, page, include_adult }: ISearchMovie) => {
	if (!language) language = 'en-US'
	if (!page) page = 1
	if (!include_adult) include_adult = false
	return `${config.MOVIE_API_SEARCH}?query=${movieTitle}&include_adult=${include_adult}&language=${language}&page=${page}`


}

export const discover_serializer = ({ page }: IDiscover) => {
	if (!page) page = 1
	return `${config.MOVIE_API_DISCOVER}&page=${page}`
}


export const formatData = (data: any) => {
	const returnData: ICache[] = []

	data.forEach((movie: any) => {
		returnData.push({
			api_id: movie.id,
			title: movie.title,
			poster_path: movie.poster_path,
			release_date: movie.release_date
		})
	})

	return returnData
}


export const formatDetails = (data: any) => {
	const returnData: IMovieResult = {
		api_id: data.id,
		title: data.title,
		poster_path: data.poster_path,
		release_date: data.release_date,
		original_language: data.original_language,
		original_title: data.original_title,
		overview: data.overview,
		popularity: data.popularity,
		// genre_ids: data.genre_ids
	}
	return returnData
}