import { IAddMovie, IGetList, IMovieResult, ISearchMovie, IUpdateMovie } from "../../types/movie";
import axios from "axios";
import config from "../../helpers/config";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import User from "../../models/user";
import Top100 from "../../models/top_100";



class Movie {
    public async search(input: ISearchMovie) {
        try {
            const { movieTitle, language, page, include_adult } = input
            // console.log(movieTitle, language, page, include_adult);


            const options = {
                method: 'GET',
                url: `${config.MOVIE_API_SEARCH}?query=${movieTitle}&include_adult=${include_adult}&language=${language}&page=${page}`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${config.MOVIE_API_KEY}`
                }
            };

            try {


                const res = await axios.request(options)

                const data = res.data
                // console.log(data.data.results);


                return ResultFunction(
                    true,
                    'data fetched sucessfully',
                    200,
                    ReturnStatus.OK,
                    data
                );

            } catch (error) {
                console.log(error);

                return ResultFunction(
                    false,
                    'data fetched failed',
                    400,
                    ReturnStatus.BAD_REQUEST,
                    null
                );
            }

        } catch {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async addMovieToList(input: IAddMovie) {
        try {
            const { originalMovieTitle, userId } = input
            const searchInput: ISearchMovie = {
                movieTitle: originalMovieTitle,
                language: 'en-US',
                page: 1,
                include_adult: false
            }
            const response = await this.search(searchInput)
            const data = await response.data.results[0]

            const movieData: IMovieResult = {
                "genre_ids": data.genre_ids,
                "api_id": data.id,
                "original_language": data.original_language,
                "original_title": data.original_title,
                "overview": data.overview,
                // "popularity": number,
                "poster_path": data.poster_path,
                "release_date": data.release_date,
                "title": data.title,
                "deleted": false
            }

            try {
                // const user = await User.findById(userId)
                const top100List = await Top100.findOneAndUpdate(
                    { userId },
                    { $addToSet: { top_100: movieData } },
                    { new: true, upsert: true }
                );

                return ResultFunction(
                    true,
                    'data fetched sucessfully',
                    200,
                    ReturnStatus.OK,
                    top100List
                );
            } catch (error) {
                return ResultFunction(
                    false,
                    'user does not exist',
                    400,
                    ReturnStatus.BAD_REQUEST,
                    null
                );
            }


        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async removeMovieFromList(input: IUpdateMovie) {
        try {
            const { userId, api_id, update } = input

            const top100List = await Top100.findOneAndUpdate(
                { userId, 'top_100.api_id': api_id },
                update
                // { new: true }
            )

            return ResultFunction(
                true,
                'movie deleted sucessfully',
                200,
                ReturnStatus.OK,
                top100List
            );

        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }

    public async getList(input: IGetList) {
        try {
            const { userId } = input

            const top100List = await Top100.findOne({ userId })
            console.log(top100List);

            return ResultFunction(
                true,
                'data fetched sucessfully',
                200,
                ReturnStatus.OK,
                top100List
            );
        } catch (error) {
            return ResultFunction(
                false,
                'something went wrong',
                422,
                ReturnStatus.NOT_OK,
                null
            );
        }
    }
}

export default Movie