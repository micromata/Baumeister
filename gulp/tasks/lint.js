import gulp from 'gulp';
import eslint from 'gulp-eslint';

import {settings} from '../config';
import onError from '../on-error';
import {isProdBuild} from '../command-line-args';
/**
 * ESLint task:
 * Run `gulp lint` respectively `gulp lint --production`
 */
function lint() {
	if (isProdBuild()) {
		return gulp.src([...settings.sources.scripts, './*.js', './gulp/**/*.js', './src/handlebars/helpers/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}

	return gulp.src([...settings.sources.scripts, './*.js', './gulp/**/*.js', './src/handlebars/helpers/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.on('error', onError);
}
lint.description = '`gulp lint` lints JavaScript via ESLint';

export default lint;
