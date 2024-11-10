import mongoose, { Schema } from "mongoose";
import { ITop100 } from "../types/movie";
import Movie from "./movie";

const Top100Schema = new Schema<ITop100>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    top_100: { type: [{}], required: true, default: [] }
})

const Top100 = mongoose.model<ITop100>('Top100', Top100Schema)
export default Top100