import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const pkg = require('../package.json');
const configFile = require('../baumeister.json');
import {settings} from './config';

const buildTarget = process.env.NODE_ENV === 'production' ? ' Production ' : ' Development ';
console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));

const generateCssFile = new ExtractTextPlugin({
	filename: 'assets/css/[name].bundle.css',
	disable: process.env.NODE_ENV === 'development'
});

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
						{loader: 'sass-loader', options: {sourceMap: true}}
					],
					// Use style-loader in development
					fallback: 'style-loader'
				})
			}
		]
	},
	output: options.output,
	plugins: [
		generateCssFile,
		new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		new CopyWebpackPlugin([settings.destinations.handlebars]),
		...options.plugins
	],
	stats: {
		timings: true,
		version: false,
		hash: false
	}
});
