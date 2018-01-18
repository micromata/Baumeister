import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import {mainDirectories} from './config';
const configFile = require('../baumeister.json');

module.exports = require('./webpack.base.babel')({
	devServer: {
		contentBase: path.join(__dirname, mainDirectories.prod),
		port: 3001,
		overlay: true
	},
	output: {
		path: path.join(__dirname, mainDirectories.prod),
		filename: 'app/[name].bundle.js'
	},
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}
		}),
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.production})
	]
});
