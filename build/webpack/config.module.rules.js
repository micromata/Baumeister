import path from 'path';

import {settings} from '../config';
import {generateCssFile} from './plugin.generate-css-file';

const configFile = require('../../baumeister.json');

export const rules = [
	{
		test: /\.(js|jsx)$/,
		include: path.resolve(__dirname, '../../', settings.sources.app),
		loader: 'babel-loader', options: {
			sourceMap: true
		}
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
				{
					loader: 'postcss-loader', options:
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
