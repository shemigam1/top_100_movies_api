export interface ISearchMovie {
    movieTitle: string
    page: number
    include_adult: boolean
    language: string
}

export type MovieResult = {
    page: number,
    result: IMovieResult[]
}

// export interface IMovieDetails {
//     movieId: string
//     details: string[]
// }

export interface IMovieResult {
    "adult": boolean,
    "backdrop_path": string,
    "genre_ids": number[],
    "api_id": number,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "release_date": string,
    "title": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
}