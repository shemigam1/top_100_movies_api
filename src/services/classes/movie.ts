import { ISearchMovie } from "../../types/movie";
import axios from "axios";
import config from "../../helpers/config";
import { ResultFunction } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";



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
}

export default Movie