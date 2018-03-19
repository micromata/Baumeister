import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import ImageminPlugin from 'imagemin-webpack-plugin';
import globby from 'globby';
import {stripIndents} from 'common-tags';

import {mainDirectories, settings, generateBanners} from './config';
const pkg = require('../package.json');
const configFile = require('../baumeister.json');

const purifyCSSOptions = {
	paths: globby.sync(path.join(settings.destinations.handlebars, '**/*.html')),
	purifyOptions: {
		minify: true,
		cleanCssOptions: {level: {1: {specialComments: 0}}},
		whitelist: configFile.purifyCSS.whitelist
	}
};

const bannerPlugin = function () {
	if (!generateBanners) {
		return function () {};
	}

	return new webpack.BannerPlugin({
		banner: stripIndents`${pkg.title} - v${pkg.version}
		${pkg.author.email}
		Copyright ©${new Date().getFullYear()} ${pkg.author.name}
		${new Date().toLocaleDateString('en-US', {day: '2-digit', month: 'long', year: 'numeric'})}`
	});
};

module.exports = require('./webpack.base.babel')({
	devServer: {
		contentBase: path.join(__dirname, mainDirectories.prod),
		port: 3001,
		overlay: true
	},
	output: {
		path: path.join(__dirname, mainDirectories.prod),
		filename: configFile.cacheBusting ? 'app/[name].[chunkhash].bundle.js' : 'app/[name].bundle.js',
		chunkFilename: configFile.cacheBusting ? 'app/[name].[chunkhash].bundle.js' : 'app/[name].bundle.js'
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
		configFile.purifyCSS.usePurifyCSS ? new PurifyCSSPlugin(purifyCSSOptions) : function () {},
		new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i}),
		bannerPlugin()
	]
});
