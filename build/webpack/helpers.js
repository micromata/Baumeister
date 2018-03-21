export const isDevMode = function () {
	return process.env.NODE_ENV === 'development';
};

export const isProdMode = function () {
	return process.env.NODE_ENV === 'production';
};
