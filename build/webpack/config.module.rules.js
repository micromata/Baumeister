import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {settings} from '../config';
import {isDevMode} from './helpers';

const configFile = require('../../baumeister.json');

export const rules = [
	{
		test: /\.(js|jsx)$/,
		include: path.resolve(__dirname, '../../', settings.sources.app),
		exclude: /(node_modules)/,
		loader: 'babel-loader', options: {
			sourceMap: isDevMode()
		}
	},
	{
		test: /\.css$/,
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader'
		]
	},
	{
		test: /\.scss$/,
		use: [
			(MiniCssExtractPlugin.loader),
			{loader: 'css-loader', options: {sourceMap: isDevMode()}},
			{
				loader: 'postcss-loader', options:
						{
							sourceMap: isDevMode(),
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
			{loader: 'sass-loader', options: {sourceMap: isDevMode()}}
		]
	},
	{
		test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		use: [
			{
				loader: 'file-loader',
				options: {
					outputPath: '../',
					useRelativePath: true,
					name: '[name].[ext]'
				}
			}
		]
	}
];
