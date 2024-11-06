import Auth from '../classes/auth';
import Movie from '../classes/movie';

export const authFactory = () => {
	// define parameters for initialization here

	return new Auth();
};

export const movieFactory = () => {
	return new Movie()
}