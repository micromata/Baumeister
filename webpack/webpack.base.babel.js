import chalk from 'chalk';

const pkg = require('../package.json');

const buildTarget = process.env.NODE_ENV === 'production' ? ' Production ' : ' Development ';
console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));

module.exports = (options) => ({
	entry: {
		polyfills: './src/app/polyfills.js',
		app: './src/app/index.js',
		vendor: Object.keys(pkg.dependencies)
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
