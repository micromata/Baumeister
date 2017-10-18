import gulp from 'gulp';
import htmllint from 'gulp-html';

import {settings, useHandlebars} from '../config';
import {isProdBuild} from '../command-line-args';
import onError from '../on-error';

const sourceFiles = useHandlebars ? './.metalsmith-build/*.html' : settings.sources.html;

/**
 * HTML validation using the Nu HTML Checker
 */
function validateHtml() {
	if (isProdBuild()) {
		return gulp.src(sourceFiles)
			.pipe(htmllint())
			.pipe(gulp.dest(settings.destinations.dev.html));
	}
	return gulp.src(sourceFiles)
		.pipe(htmllint())
		.on('error', onError)
		.pipe(gulp.dest(settings.destinations.prod.html));
}

export default validateHtml;
