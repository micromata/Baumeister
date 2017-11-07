import {settings} from './gulp/config';

const webpack = require('webpack');
const path = require('path');

const dev = {
	entry: {
		polyfills: './src/app/polyfills.js',
		vendor: './src/app/vendor.js',
		app: './src/app/index.js'
	},
	output: {
		path: path.join(__dirname, settings.destinations.dev.app),
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		})
	]
};

const prod = {
	...dev,
	output: {
		path: path.join(__dirname, settings.destinations.prod.app),
		filename: '[name].bundle.min.js'
	}
};

module.exports = {dev, prod};
