import gulp from 'gulp';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import es from 'event-stream';

import {settings} from '../config';
import onError from '../onError';
import {isProdBuild} from '../commandLineArgs';

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

/**
 * ESLint task:
 * Run `gulp lint` respectively `gulp lint --production`
 */
function lint(done) {
	if (isProdBuild()) {
		return gulp.src([...settings.sources.scripts, './*.js', './gulp/**/*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}

	return es.concat(
		gulp.src(settings.sources.scripts)
			.pipe(eslint({fix: true}))
			.pipe(eslint.format())
			.pipe(gulpIf(isFixed, gulp.dest('./src/app/')))
			.pipe(eslint.failAfterError())
			.on('error', onError),
		gulp.src('./*.js')
			.pipe(eslint({fix: true}))
			.pipe(eslint.format())
			.pipe(gulpIf(isFixed, gulp.dest('./')))
			.pipe(eslint.failAfterError())
			.on('error', onError),
		gulp.src('./gulp/**/*.js')
			.pipe(eslint({fix: true}))
			.pipe(eslint.format())
			.pipe(gulpIf(isFixed, gulp.dest('./gulp/')))
			.pipe(eslint.failAfterError())
			.on('error', onError)
	).on('end', done);
}
lint.description = '`gulp lint` lints JavaScript via ESLint';

export default lint;
