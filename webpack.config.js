import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import {settings} from './gulp/config';

const configFile = require('./baumeister.json');

const dev = {
	entry: {
		polyfills: './src/app/polyfills.js',
		app: './src/app/index.js',
		vendor: settings.sources.externalJs
	},
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
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	stats: {
		timings: true,
		version: false
	}
};

const prod = {
	entry: {
		...dev.entry
	},
	output: {
		path: path.join(__dirname, settings.destinations.prod.app),
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
	],
	module: {
		...dev.module
	}
};

module.exports = {dev, prod};
