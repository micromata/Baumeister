import gulp from 'gulp';
import eslint from 'gulp-eslint';

import {settings} from '../config';
import onError from '../onError';
import {isProdBuild} from '../commandLineArgs';
/**
 * ESLint task:
 * Run `gulp lint` respectively `gulp lint --production`
 */
function lint() {
	if (isProdBuild()) {
		return gulp.src([...settings.sources.scripts, './*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
	/**
	 * TODO: Run ESLint with --fix for dev build
	 * Seems that isn’t possible to fix files in place with multiple inputs. See example.
	 * Looks like we would need to use https://github.com/robrich/gulp-exec to execute ESLint (or xo) with the fix option.
	 */
	return gulp.src([...settings.sources.scripts, './*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.on('error', onError);
}
lint.description = '`gulp lint` lints JavaScript via ESLint';

export default lint;
