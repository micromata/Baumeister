import gulp from 'gulp';
import changed from 'gulp-changed';
import htmlmin from 'gulp-htmlmin';
import processhtml from 'gulp-processhtml';

import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Process HTML:
 * - Replaces references to JS and CSS for production build
 * - Remove comments for production build
 * - Simply copy HTML for dev build
 */
function processHtml() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.html)
			.pipe(processhtml())
			.pipe(htmlmin({removeComments: true, preserveLineBreaks: true, collapseWhitespace: true}))
			.pipe(gulp.dest(settings.destinations.prod.html));
	}
	return gulp.src(settings.sources.html)
		.pipe(changed(settings.destinations.dev.html))
		.pipe(gulp.dest(settings.destinations.dev.html));
}

export default processHtml;
