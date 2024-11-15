import mongoose, { Schema } from "mongoose";
import { ICache } from "../types/movie";

const MovieSchema: Schema = new Schema<ICache>({
    // adult: { type: Boolean },
    // backdrop_path: { type: String },
    // genre_ids: { type: [Number] },
    api_id: { type: Number, required: true },
    // original_language: { type: String },
    // original_title: { type: String },
    // overview: { type: String },
    // popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },
    // video: { type: Boolean },
    // vote_average: { type: Number },
    // vote_count: { type: Number }

})

const MovieModel = mongoose.model<ICache>('Movie', MovieSchema)
export default MovieModel