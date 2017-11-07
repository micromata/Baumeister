import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import {settings} from './gulp/config';

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
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	module: {
		...dev.module
	}
};

module.exports = {dev, prod};
