const webpack = require('webpack');

module.exports = {
	entry: {
		polyfills: './src/app/polyfills.js',
		vendor: './src/app/vendor.js',
		app: './src/app/index.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		})
	]
};
