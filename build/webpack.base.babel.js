import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const pkg = require('../package.json');
const configFile = require('../baumeister.json');
import {settings} from './config';

const isDevMode = process.env.NODE_ENV === 'development';
const buildTarget = isDevMode ? ' Development ' : ' Production ';
const generateCssFile = new ExtractTextPlugin({
	filename: 'assets/css/[name].bundle.css'
});

console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));

module.exports = (options) => ({
	devServer: options.devServer,
	entry: {
		polyfills: `${settings.sources.app}polyfills.js`,
		app: `${settings.sources.app}index.js`,
		vendor: Object.keys(pkg.dependencies)
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
		generateCssFile,
		new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		new CopyWebpackPlugin([
			settings.destinations.handlebars,
			{
				from: settings.sources.fonts,
				to: settings.destinations.fonts
			},
			{
				from: settings.sources.images,
				to: settings.destinations.images
			}
		]),
		...options.plugins
	],
	stats: {
		timings: true,
		version: false,
		hash: false
	}
});
