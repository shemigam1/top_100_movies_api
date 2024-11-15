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

        const url = search_serializer(input)
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

      const list = await Top100.findOne({ userId: user.id })
      let listLength
      if (list) {
        // console.log('-------list', list);

        let existingMovie = list.list.filter(movie => movie.api_id === api_id)
        if (existingMovie.length > 0) {
          return ResultFunction(
            false,
            'movie exists in list already',
            422,
            ReturnStatus.BAD_REQUEST,
            null
          );
        }
        listLength = list.list.length
        if (listLength >= 100) {
          return ResultFunction(
            false,
            'top100 list is full',
            422,
            ReturnStatus.BAD_REQUEST,
            null
          );
        }

        list.list.push({ api_id, rank: listLength + 1 })
        const top100List = await Top100.findOneAndUpdate({ userId: user.id }, { list: list.list })

        return ResultFunction(
          true,
          'movie added sucessfully',
          200,
          ReturnStatus.OK,
          list.list
        );
      } else {
        const top100List = await Top100.create({ userId: user.id, list: [{ api_id, rank: 1 }] })
        return ResultFunction(
          true,
          'movie added sucessfully',
          200,
          ReturnStatus.OK,
          top100List
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

  public async removeMovieFromList(input: IAddMovie) {
    try {
      const { api_id, user } = input

      const list = await Top100.findOne({ userId: user.id })
      if (list) {
        let existingMovie = list.list.filter(movie => movie.api_id === api_id)
        if (existingMovie.length <= 0) {
          return ResultFunction(
            false,
            'movie is not in list',
            422,
            ReturnStatus.BAD_REQUEST,
            null
          );
        }

        const newList = list.list.filter((movie) => movie.api_id !== api_id)
        const top100List = await Top100.findOneAndUpdate({ userId: user.id }, { list: newList })

        return ResultFunction(
          true,
          'movie removed sucessfully',
          200,
          ReturnStatus.OK,
          newList
        );
      } else
        return ResultFunction(
          false,
          'something went wrong',
          422,
          ReturnStatus.NOT_OK,
          []
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

      const top100List = await Top100.findOne({ userId: user.id })
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
          'something went wrong',
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

  }
}

export default Movie