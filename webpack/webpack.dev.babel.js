import path from 'path';
import webpack from 'webpack';

const configFile = require('../baumeister.json');
import {settings} from '../gulp/config';

module.exports = require('./webpack.base.babel')({
	output: {
		path: path.join(__dirname, settings.destinations.dev.app),
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.dev}),
		new webpack.SourceMapDevToolPlugin({
			columns: false
		})
	]
});
