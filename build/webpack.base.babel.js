import path from 'path';
import chalk from 'chalk';
import globby from 'globby';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import minimist from 'minimist';
import {stripIndents} from 'common-tags';

import {settings, useHandlebars} from './config';
const configFile = require('../baumeister.json');

const cliFlags = minimist(process.argv.slice(2));
const isDevMode = process.env.NODE_ENV === 'development';
const buildTarget = isDevMode ? ' Development ' : ' Production ';

const manifest = new WebpackAssetsManifest({
	output: path.resolve('.webpack-assets.json')
});

const generateCssFile = new ExtractTextPlugin({
	filename: configFile.cacheBusting && !isDevMode ? 'assets/css/[name].[chunkhash].bundle.css' : 'assets/css/[name].bundle.css'
});

const copyVendorFiles = configFile.vendor.includeStaticFiles.map(glob => {
	return {
		from: glob,
		context: 'node_modules',
		to: settings.destinations.vendorFiles
	};
});

const getVendorCSS = function () {
	// Return flattened array of resolved globs from baumeister.json
	const vendorCSS = [].concat(...configFile.vendor.bundleCSS.map(glob => globby.sync(`./node_modules/${glob}`)));
	if (!vendorCSS.length) {
		return false;
	}
	return {vendor: vendorCSS};
};

if (!cliFlags.json) {
	console.log(chalk.yellow(stripIndents`Build target: ${chalk.bold.inverse(buildTarget)}
	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
}

module.exports = (options) => ({
	devServer: options.devServer,
	entry: {
		app: `${settings.sources.app}index.js`,
		...getVendorCSS()
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, '../', settings.sources.app),
				loader: 'babel-loader', options: {sourceMap: true}
			},
			{
				test: /\.css$/,
				use: generateCssFile.extract({
					use: [
						{loader: 'css-loader', options: {sourceMap: true}}
					]
				})
			},
			{
				test: /\.scss$/,
				use: generateCssFile.extract({
					use: [
						{loader: 'css-loader', options: {sourceMap: true}},
						{loader: 'postcss-loader', options:
							{
								sourceMap: true,
								config: {
									ctx: {
										usePurifyCSS: configFile.purifyCSS.usePurifyCSS,
										cssnano: {
											discardComments: {
												removeAll: true
											}
										},
										autoprefixer: {
											browsers: [
												'> 1%',
												'last 3 version',
												'ie 8',
												'ie 9',
												'Firefox ESR',
												'Opera 12.1'
											]
										}
									}
								}
							}
						},
						{loader: 'sass-loader', options: {sourceMap: true}}
					]
				})
			}
		]
	},
	output: options.output,
	plugins: [
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
		...options.plugins
	],
	stats: {
		timings: true,
		version: false,
		hash: false
	}
});
