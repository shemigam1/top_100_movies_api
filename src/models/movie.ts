import mongoose, { Schema } from "mongoose";
import { ICache } from "../types/movie";

const MovieSchema: Schema = new Schema<ICache>({

    api_id: { type: Number, required: true, index: true },

    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },


})

const MovieModel = mongoose.model<ICache>('Movie', MovieSchema)
export default MovieModel