import path from 'path';
import crypto from 'crypto';
import chalk from 'chalk';
import globby from 'globby';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import minimist from 'minimist';

import {settings, useHandlebars} from './config';
const pkg = require('../package.json');
const configFile = require('../baumeister.json');

const cliFlags = minimist(process.argv.slice(2));
const hash = crypto.createHash('sha512').update(String(Date.now())).digest('hex').slice(0, 20);
const isDevMode = process.env.NODE_ENV === 'development';
const buildTarget = isDevMode ? ' Development ' : ' Production ';

const generateCssFile = new ExtractTextPlugin({
	filename: 'assets/css/[name].[chunkhash].bundle.css'
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
	return [].concat(...configFile.vendor.bundleCSS.map(glob => globby.sync(`./node_modules/${glob}`)));
};

if (!cliFlags.json) {
	console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));
}

module.exports = (options) => ({
	devServer: options.devServer,
	entry: {
		polyfills: `${settings.sources.app}polyfills.js`,
		app: `${settings.sources.app}index.js`,
		vendor: [...Object.keys(pkg.dependencies), ...getVendorCSS()]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
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
										usePurifyCSS: configFile.usePurifyCSS,
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
		new WebpackAssetsManifest({
			writeToDisk: true,
			output: path.resolve('.webpack-assets.json'),
			done(manifest) {
				console.log(chalk.cyan('\n⏰  Here we are in the done() method of WebpackAssetsManifest'));
				console.log(`\nThe manifest has been written to ${manifest.getOutputPath()}`);
			}
		}),
		generateCssFile,
		new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		new CopyWebpackPlugin([
			{
				from: '**/*.html',
				context: useHandlebars ? settings.destinations.handlebars : './src',
				transform(content) {
					const assets = require('../.webpack-assets.json');
					console.log(chalk.magenta('\n⏰  Here we are in the transform() method of CopyWebpackPlugin'));
					content = content.toString();
					content = content.replace(/@@(.*\.css|.*\.js)/g, (match, $1) => assets[$1]);
					return content;
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
