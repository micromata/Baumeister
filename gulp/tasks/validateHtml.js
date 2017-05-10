import gulp from 'gulp';
import htmllint from 'gulp-html';

import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';
import onError from '../onError';

/**
 * HTML validation using the Nu HTML Checker
 */
function validateHtml() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.markup)
			.pipe(htmllint())
			.pipe(gulp.dest(settings.destinations.dev.markup));
	}
	return gulp.src(settings.sources.markup)
		.pipe(htmllint())
		.on('error', onError)
		.pipe(gulp.dest(settings.destinations.prod.markup));
}

export default validateHtml;
