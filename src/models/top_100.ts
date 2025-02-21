import mongoose, { Schema } from "mongoose";
import { IList } from "../types/movie";
import Movie from "./movie";

const Top100Schema = new Schema<IList>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
    movieId: { type: Schema.Types.ObjectId, required: true, ref: 'Movie' },
    rank: { type: Number }
    // list: {
    //     type: [{
    //         // local_id: {type: Schema.Types.ObjectId, ref: 'Movie'},
    //         api_id: { type: Number, ref: 'Movie' },
    //         rank: { type: Number }
    //     }]

    // }
})

const Top100 = mongoose.model<IList>('Top100', Top100Schema)
export default Top100