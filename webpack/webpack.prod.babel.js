import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const configFile = require('../baumeister.json');
import {settings} from '../gulp/config';

module.exports = require('./webpack.base.babel')({
	output: {
		path: path.join(__dirname, '../', settings.destinations.prod.app),
		filename: '[name].bundle.min.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.prod}),
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}
		})
	]
});
