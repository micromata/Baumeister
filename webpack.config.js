import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import {settings} from './gulp/config';

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
		new webpack.ProvidePlugin({...settings.webpack.ProvidePlugin}),
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
		...dev.plugins,
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}
		}),
		new webpack.DefinePlugin({...settings.webpack.DefinePlugin})
	],
	module: {
		...dev.module
	}
};

module.exports = {dev, prod};
