import gulp from 'gulp';
import wp from 'webpack-stream';
import {isProdBuild} from '../command-line-args';
import {settings} from '../config';

const config = require('../../webpack.config');

function webpack() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.scripts)
			.pipe(wp(config.prod))
			.pipe(gulp.dest(settings.destinations.prod.app));
	}
	return gulp.src(settings.sources.scripts)
		.pipe(wp(config.dev))
		.pipe(gulp.dest(settings.destinations.dev.app));
}

function webpackWatch() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.scripts)
			.pipe(wp({
				...config.prod,
				watch: true
			}))
			.pipe(gulp.dest(settings.destinations.prod.app));
	}
	return gulp.src(settings.sources.scripts)
		.pipe(wp({
			...config.dev,
			watch: true
		}))
		.pipe(gulp.dest(settings.destinations.dev.app));
}

export {webpack, webpackWatch};
