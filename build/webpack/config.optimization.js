import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export const optimization = {
	runtimeChunk: {
		name: 'runtime'
	},
	splitChunks: {
		cacheGroups: {
			commons: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'all'
			}
		}
	},
	minimizer: [
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}
		})
	]
};
