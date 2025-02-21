"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../helpers/config"));
const utils_1 = require("../../helpers/utils");
const generic_1 = require("../../types/generic");
const top_100_1 = __importDefault(require("../../models/top_100"));
const movie_1 = __importDefault(require("../../models/movie"));
const options = {
    // method: 'GET',
    // url: url_serializer(input),
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config_1.default.MOVIE_API_KEY}`
    }
};
class Movie {
    search(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { movieTitle, language, page, include_adult } = input;
                try {
                    // const cache = await MovieModel.find({ title: movieTitle })
                    // if (cache) {
                    //   return ResultFunction(
                    //     true,
                    //     'data fetched sucessfully',
                    //     200,
                    //     ReturnStatus.OK,
                    //     cache
                    //   );
                    // }
                    const url = (0, utils_1.search_serializer)(input);
                    const res = yield axios_1.default.get(url, options);
                    const data = res.data.results;
                    const returnData = (0, utils_1.formatData)(data);
                    // await MovieModel.create(returnData)
                    return (0, utils_1.ResultFunction)(true, 'data fetched sucessfully', 200, generic_1.ReturnStatus.OK, returnData);
                }
                catch (error) {
                    // console.log(error);
                    return (0, utils_1.ResultFunction)(false, 'data fetched failed', 400, generic_1.ReturnStatus.BAD_REQUEST, []);
                }
            }
            catch (_a) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, []);
            }
        });
    }
    addMovieToList(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { api_id, user } = input;
                const listCount = yield top_100_1.default.find({ userId: user.id }).countDocuments();
                if (listCount >= 100) {
                    return (0, utils_1.ResultFunction)(false, 'top100 list is full', 422, generic_1.ReturnStatus.BAD_REQUEST, null);
                }
                const existingMovie = yield top_100_1.default.findOne({ userId: user.id, api_id: api_id });
                if (existingMovie) {
                    return (0, utils_1.ResultFunction)(false, 'movie exists in list already', 422, generic_1.ReturnStatus.BAD_REQUEST, null);
                }
                const inCache = yield movie_1.default.findOne({ api_id: api_id });
                if (inCache) {
                    const inCacheId = inCache._id;
                    const movie = yield top_100_1.default.create({ userId: user.id, movieId: inCacheId, rank: listCount + 1 });
                    return (0, utils_1.ResultFunction)(true, 'movie added sucessfully', 200, generic_1.ReturnStatus.OK, movie);
                }
                else {
                    const url = `https://api.themoviedb.org/3/movie/${api_id}?language=en-US`;
                    const res = yield axios_1.default.get(url, options);
                    const data = res.data;
                    const returnData = (0, utils_1.formatDetails)(data);
                    const inCache = yield movie_1.default.create(returnData);
                    const movie = yield top_100_1.default.create({ userId: user.id, movieId: inCache._id, rank: listCount + 1 });
                    return (0, utils_1.ResultFunction)(true, 'movie added sucessfully', 200, generic_1.ReturnStatus.OK, movie);
                }
            }
            catch (error) {
                console.log(error);
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    removeMovieFromList(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { api_id, user } = input;
                yield top_100_1.default.findOneAndDelete({ userId: user.id, api_id: api_id });
                return (0, utils_1.ResultFunction)(true, 'movie removed sucessfully', 200, generic_1.ReturnStatus.OK, null);
            }
            catch (error) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    getList(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = input;
                const top100List = yield top_100_1.default.find({ userId: user.id }).populate('movieId').exec();
                if (top100List) {
                    return (0, utils_1.ResultFunction)(true, 'data fetched sucessfully', 200, generic_1.ReturnStatus.OK, top100List);
                }
                else {
                    return (0, utils_1.ResultFunction)(false, 'something went wrong, no list', 422, generic_1.ReturnStatus.NOT_OK, null);
                }
            }
            catch (error) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    getMovieDetails(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { api_id, user } = input;
                const url = `https://api.themoviedb.org/3/movie/${api_id}?language=en-US`;
                const res = yield axios_1.default.get(url, options);
                const data = res.data;
                // console.log(data);
                const returnData = (0, utils_1.formatDetails)(data);
                return (0, utils_1.ResultFunction)(true, 'details fetched sucessfully', 200, generic_1.ReturnStatus.OK, returnData);
            }
            catch (error) {
                // console.log(error);
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    discover(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page } = input;
                try {
                    const url = (0, utils_1.discover_serializer)(input);
                    const res = yield axios_1.default.get(url, options);
                    const data = res.data.results;
                    const returnData = (0, utils_1.formatData)(data);
                    return (0, utils_1.ResultFunction)(true, 'data fetched sucessfully', 200, generic_1.ReturnStatus.OK, returnData);
                }
                catch (error) {
                    return (0, utils_1.ResultFunction)(false, 'data fetched failed', 400, generic_1.ReturnStatus.BAD_REQUEST, []);
                }
            }
            catch (_a) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, []);
            }
        });
    }
    rank(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, old_rank, new_rank } = input;
                const existingMovie = yield top_100_1.default.findOne({ userId: user.id, rank: old_rank });
                console.log(existingMovie);
                if (existingMovie) {
                    let temp = existingMovie.rank;
                    if (temp === new_rank) {
                        return (0, utils_1.ResultFunction)(false, 'rank change invalid', 422, generic_1.ReturnStatus.BAD_REQUEST, null);
                    }
                    const movie1 = yield top_100_1.default.findOneAndUpdate({ userId: user.id, rank: old_rank }, { rank: new_rank });
                    const movie2 = yield top_100_1.default.findOneAndUpdate({ userId: user.id, rank: new_rank }, { rank: temp });
                    console.log(movie1);
                    console.log(movie2);
                    return (0, utils_1.ResultFunction)(true, 'rank updated sucessfully', 200, generic_1.ReturnStatus.OK, null);
                }
                else {
                    return (0, utils_1.ResultFunction)(false, 'movie doesnt exist', 422, generic_1.ReturnStatus.BAD_REQUEST, null);
                }
            }
            catch (error) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
    MovieNight() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.discover({ page: 1 });
                const movies = data.data;
                return (0, utils_1.ResultFunction)(true, 'Movie Night!!!!', 200, generic_1.ReturnStatus.OK, movies);
            }
            catch (error) {
                return (0, utils_1.ResultFunction)(false, 'something went wrong', 422, generic_1.ReturnStatus.NOT_OK, null);
            }
        });
    }
}
exports.default = Movie;
