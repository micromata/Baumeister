import path from 'path';
import webpack from 'webpack';
import globby from 'globby';
import {stripIndents} from 'common-tags';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import ImageminPlugin from 'imagemin-webpack-plugin';

import {generateBanners, settings, useHandlebars} from '../config';
import {isDevMode} from './helpers';
import {generateCssFile} from './plugin.generate-css-file';

const pkg = require('../../package.json');
const configFile = require('../../baumeister.json');

const manifest = new WebpackAssetsManifest({
	output: path.resolve('.webpack-assets.json')
});

const copyVendorFiles = configFile.vendor.includeStaticFiles.map(glob => {
	return {
		from: glob,
		context: 'node_modules',
		to: settings.destinations.vendorFiles
	};
});

const purifyCSSOptions = {
	paths: globby.sync(path.join(settings.destinations.handlebars, '**/*.html')),
	purifyOptions: {
		minify: true,
		cleanCssOptions: {level: {1: {specialComments: 0}}},
		whitelist: configFile.purifyCSS.whitelist
	}
};

/**
 * Plugins used for development and production builds
 */
const generalPlugins = [
	manifest,
	generateCssFile,
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: module => /node_modules/.test(module.resource)
	}),
	new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
	new CopyWebpackPlugin([
		{
			from: '**/*.html',
			context: useHandlebars ? settings.destinations.handlebars : './src',
			transform(content) {
				return content.toString().replace(/@@(.*\.css|.*\.js)/g, (match, $1) => {
					if (!($1 in manifest.assets)) {
						return `<!-- No ${$1} to be bundled -->`;
					}
					return /\.css/g.test($1) ? `<link href="${manifest.assets[$1]}" rel="stylesheet">` : `<script src="${manifest.assets[$1]}"></script>`;
				});
			}
		},
		{
			from: '**/*',
			context: settings.sources.assets,
			to: settings.destinations.assets,
			ignore: ['scss/**']
		},
		...copyVendorFiles
	]),
	new webpack.DefinePlugin(isDevMode() ? {...configFile.webpack.DefinePlugin.development} : {...configFile.webpack.DefinePlugin.production})
];

/**
 * Plugins used for development builds only
 */
const devPlugins = [
	new webpack.SourceMapDevToolPlugin({columns: false})
];

/**
 * Plugins used for production builds only
 */
const prodPlugins = [
	new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i}),
	new UglifyJSPlugin({
		uglifyOptions: {
			compress: {
				drop_console: true, // eslint-disable-line camelcase
				drop_debugger: true // eslint-disable-line camelcase
			}
		}
	}),
	configFile.purifyCSS.usePurifyCSS ? new PurifyCSSPlugin(purifyCSSOptions) : false,
	generateBanners ? new webpack.BannerPlugin({
		banner: stripIndents`${pkg.title} - v${pkg.version}
		${pkg.author.email}
		Copyright ©${new Date().getFullYear()} ${pkg.author.name}
		${new Date().toLocaleDateString('en-US', {day: '2-digit', month: 'long', year: 'numeric'})}`
	}) : false
].filter(Boolean);

export const plugins = isDevMode() ? [...generalPlugins, ...devPlugins] : [...generalPlugins, ...prodPlugins];
