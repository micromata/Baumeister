import path from 'path';
import webpack from 'webpack';

import {mainDirectories} from './config';
const configFile = require('../baumeister.json');

module.exports = require('./webpack.base.babel')({
	devServer: {
		contentBase: path.join(__dirname, mainDirectories.dev),
		port: 3000,
		overlay: true
	},
	output: {
		path: path.join(__dirname, mainDirectories.dev),
		filename: 'app/[name].bundle.js'
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			columns: false
		}),
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.development})
	]
});
