import mongoose, { Schema } from "mongoose";
import { IMovieResult } from "../types/movie";

const MovieSchema: Schema = new Schema<IMovieResult>({
    // adult: { type: Boolean },
    // backdrop_path: { type: String },
    genre_ids: { type: [Number] },
    api_id: { type: Number, required: true },
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    // popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },
    // video: { type: Boolean },
    // vote_average: { type: Number },
    // vote_count: { type: Number }

})

const Movie = mongoose.model<IMovieResult>('Movie', MovieSchema)
export default Movie