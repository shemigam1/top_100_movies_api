import { IAddMovie, ICache, IDiscover, IGetList, IMovieResult, IRank, ISearchMovie, IUpdateMovie } from "../../types/movie";
import axios from "axios";
import config from "../../helpers/config";
import { ResultFunction, search_serializer, discover_serializer, formatData, formatDetails } from "../../helpers/utils";
import { ReturnStatus } from "../../types/generic";
import User from "../../models/user";
import Top100 from "../../models/top_100";
import MovieModel from "../../models/movie";

const options = {
  // method: 'GET',
  // url: url_serializer(input),
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${config.MOVIE_API_KEY}`
  }
};


class Movie {
  public async search(input: ISearchMovie) {

    try {
      const { movieTitle, language, page, include_adult } = input
      try {
        const cache = await MovieModel.find({ title: movieTitle })
        if (cache) {
          return ResultFunction(
            true,
            'data fetched sucessfully',
            200,
            ReturnStatus.OK,
            cache
          );
        }
        const url = search_serializer(input)
        const res = await axios.get(url, options)

        const data = res.data.results

        const returnData = formatData(data)

        await MovieModel.create(returnData)
        return ResultFunction(
          true,
          'data fetched sucessfully',
          200,
          ReturnStatus.OK,
          returnData
        );

      } catch (error) {
        console.log(error);

        return ResultFunction(
          false,
          'data fetched failed',
          400,
          ReturnStatus.BAD_REQUEST,
          []
        );
      }

    } catch {
      return ResultFunction(
        false,
        'something went wrong',
        422,
        ReturnStatus.NOT_OK,
        []
      );
    }
  }

  public async addMovieToList(input: IAddMovie) {
    try {
      const { api_id, user } = input

      const listCount = await Top100.find({ userId: user.id }).countDocuments()
      if (listCount >= 100) {
        return ResultFunction(
          false,
          'top100 list is full',
          422,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }
      const existingMovie = await Top100.findOne({ userId: user.id, api_id: api_id })
      if (existingMovie) {
        return ResultFunction(
          false,
          'movie exists in list already',
          422,
          ReturnStatus.BAD_REQUEST,
          null
        );
      }
      const inCache = await MovieModel.findOne({ api_id: api_id })
      if (inCache) {
        const inCacheId = inCache._id
        const movie = await Top100.create({ userId: user.id, movieId: inCacheId, rank: listCount + 1 })

        return ResultFunction(
          true,
          'movie added sucessfully',
          200,
          ReturnStatus.OK,
          movie
        );
      } else {
        const url = `https://api.themoviedb.org/3/movie/${api_id}?language=en-US`
        const res = await axios.get(url, options)

        const data = res.data

        const returnData = formatDetails(data)
        const inCache = await MovieModel.create(returnData)
        const movie = await Top100.create({ userId: user.id, movieId: inCache._id, rank: listCount + 1 })

        return ResultFunction(
          true,
          'movie added sucessfully',
          200,
          ReturnStatus.OK,
          movie
        );
      }

    } catch (error) {
      console.log(error);

      return ResultFunction(
        false,
        'something went wrong',
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }
  }

  public async removeMovieFromList(input: IAddMovie) {
    try {
      const { api_id, user } = input

      await Top100.findOneAndDelete({ userId: user.id, api_id: api_id })

      return ResultFunction(
        true,
        'movie removed sucessfully',
        200,
        ReturnStatus.OK,
        null
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
      const { user } = input

      const top100List = await Top100.find({ userId: user.id }).populate('movieId').exec()
      if (top100List) {
        return ResultFunction(
          true,
          'data fetched sucessfully',
          200,
          ReturnStatus.OK,
          top100List
        );
      } else {
        return ResultFunction(
          false,
          'something went wrong, no list',
          422,
          ReturnStatus.NOT_OK,
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

  public async getMovieDetails(input: IAddMovie) {
    try {
      const { api_id, user } = input
      const url = `https://api.themoviedb.org/3/movie/${api_id}?language=en-US`
      const res = await axios.get(url, options)
      const data = res.data
      // console.log(data);

      const returnData = formatDetails(data)

      return ResultFunction(
        true,
        'details fetched sucessfully',
        200,
        ReturnStatus.OK,
        returnData
      );

    } catch (error) {
      // console.log(error);

      return ResultFunction(
        false,
        'something went wrong',
        422,
        ReturnStatus.NOT_OK,
        null
      );
    }

  }

  public async discover(input: IDiscover) {

    try {
      const { page } = input
      try {

        const url = discover_serializer(input)
        const res = await axios.get(url, options)

        const data = res.data.results
        const returnData = formatData(data)

        return ResultFunction(
          true,
          'data fetched sucessfully',
          200,
          ReturnStatus.OK,
          returnData
        );

      } catch (error) {
        return ResultFunction(
          false,
          'data fetched failed',
          400,
          ReturnStatus.BAD_REQUEST,
          []
        );
      }

    } catch {
      return ResultFunction(
        false,
        'something went wrong',
        422,
        ReturnStatus.NOT_OK,
        []
      );
    }
  }


  public async rank(input: IRank) {
    try {
      const { user, old_rank, new_rank } = input

      const existingMovie = await Top100.findOne({ userId: user.id, rank: old_rank })
      console.log(existingMovie);

      if (existingMovie) {
        let temp = existingMovie.rank
        if (temp === new_rank) {
          return ResultFunction(
            false,
            'rank change invalid',
            422,
            ReturnStatus.BAD_REQUEST,
            null
          );
        }
        const movie1 = await Top100.findOneAndUpdate({ userId: user.id, rank: old_rank }, { rank: new_rank })
        const movie2 = await Top100.findOneAndUpdate({ userId: user.id, rank: new_rank }, { rank: temp })

        console.log(movie1);
        console.log(movie2);
        return ResultFunction(
          true,
          'rank updated sucessfully',
          200,
          ReturnStatus.OK,
          null
        );
      } else {

        return ResultFunction(
          false,
          'movie doesnt exist',
          422,
          ReturnStatus.BAD_REQUEST,
          null)
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
}

export default Movie