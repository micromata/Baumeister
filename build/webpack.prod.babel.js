import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import globby from 'globby';

import {mainDirectories, settings} from './config';
const configFile = require('../baumeister.json');

const purifyCSSOptions = {
	verbose: true,
	paths: globby.sync(path.join(settings.destinations.handlebars, '**/*.html')),
	purifyOptions: {
		minify: true,
		cleanCssOptions: {level: {1: {specialComments: 0}}},
		whitelist: [
			'*navbar*',
			'*modal*',
			'*dropdown*',
			'*carousel*',
			'*tooltip*',
			'open',
			'fade',
			'collapse',
			'collapsing',
			'in'
		]
	}
};

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
		new webpack.DefinePlugin({...configFile.webpack.DefinePlugin.production}),
		configFile.usePurifyCSS ? new PurifyCSSPlugin(purifyCSSOptions) : function noop(){}
	]
});
