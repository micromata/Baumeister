import gulp from 'gulp';
import wp from 'webpack-stream';
import {isProdBuild} from '../command-line-args';
import {settings} from '../config';

const config = require('../../webpack.config');
const webpack = createWebpackFunctions({});
const webpackWatch = createWebpackFunctions({watch: true});

function createWebpackFunctions(additionalOptions) {
	return function () {
		if (isProdBuild()) {
			return gulp.src(settings.sources.scripts)
				.pipe(wp({
					...config.prod,
					...additionalOptions
				}))
				.pipe(gulp.dest(settings.destinations.prod.app));
		}
		return gulp.src(settings.sources.scripts)
			.pipe(wp({
				...config.dev,
				...additionalOptions
			}))
			.pipe(gulp.dest(settings.destinations.dev.app));
	};
}

export {webpack, webpackWatch};
