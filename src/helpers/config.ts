const config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	DATABASE_URL: process.env.DATABASE_URL || '',
	JWT_SECRET: process.env.JWT_SECRET || '',
	MOVIE_API_SEARCH: process.env.MOVIE_API_SEARCH || '',
	MOVIE_API_KEY: process.env.MOVIE_API_KEY || '',
	MOVIE_API_DISCOVER: process.env.MOVIE_API_DISCOVER || ''
};

export default config;
