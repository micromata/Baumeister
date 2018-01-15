import chalk from 'chalk';

import {settings} from '../gulp/config';

const buildTarget = process.env.NODE_ENV === 'production' ? ' Production ' : ' Development ';
console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));

module.exports = (options) => ({
	entry: {
		polyfills: './src/app/polyfills.js',
		app: './src/app/index.js',
		vendor: settings.sources.externalJs
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	output: options.output,
	plugins: options.plugins,
	stats: {
		timings: true,
		version: false,
		hash: false
	}
});
