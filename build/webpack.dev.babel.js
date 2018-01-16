import path from 'path';
import webpack from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');

import {mainDirectories, settings} from './config';
const configFile = require('../baumeister.json');

module.exports = require('./webpack.base.babel')({
	devServer: {
		contentBase: mainDirectories.dev,
		port: 3000,
		overlay: true
	},
	output: {
		path: path.join(__dirname, settings.destinations.dev.app),
		filename: '[name].bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Dev Server'
		}),
		new webpack.SourceMapDevToolPlugin({
			columns: false
		}),
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.development})
	]
});
