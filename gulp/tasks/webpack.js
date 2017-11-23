import gulp from 'gulp';
import wp from 'webpack-stream';
import {args, isProdBuild} from '../command-line-args';
import {settings} from '../config';

const config = require('../../webpack.config');

function webpack(done) {

	// Prevent doubled excution of webpack in watch mode
	if (args._[0] !== 'build') return done();

	if (isProdBuild()) {
		return gulp.src(settings.sources.scripts)
			.pipe(wp(config.prod))
			.pipe(gulp.dest(settings.destinations.prod.app));
	}
	return gulp.src(settings.sources.scripts)
		.pipe(wp(config.dev))
		.pipe(gulp.dest(settings.destinations.dev.app));
}

export function webpackWatch() {
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

export default webpack;
