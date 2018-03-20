import ExtractTextPlugin from 'extract-text-webpack-plugin';

const configFile = require('../../baumeister.json');

export const isDevMode = function () {
	return process.env.NODE_ENV === 'development';
};

export const isProdMode = function () {
	return process.env.NODE_ENV === 'production';
};

export const generateCssFile = new ExtractTextPlugin({
	filename: configFile.cacheBusting && isProdMode() ? 'assets/css/[name].[chunkhash].bundle.css' : 'assets/css/[name].bundle.css'
});

