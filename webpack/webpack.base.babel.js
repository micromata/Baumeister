import path from 'path';
import chalk from 'chalk';

import webpack from 'webpack';

const pkg = require('../package.json');
const configFile = require('../baumeister.json');
import {settings} from './config';

const buildTarget = process.env.NODE_ENV === 'production' ? ' Production ' : ' Development ';
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
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, settings.sources.app),
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	output: options.output,
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		new webpack.ProvidePlugin({...configFile.webpack.ProvidePlugin}),
		...options.plugins
	],
	stats: {
		timings: true,
		version: false,
		hash: false
	}
});
