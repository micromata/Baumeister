import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import processhtml from 'gulp-processhtml';

import {settings, useHandlebars} from '../config';
import {isProdBuild} from '../command-line-args';

const sourceFiles = useHandlebars ? `${settings.destinations.handlebars}/*.html` : settings.sources.html;

/**
 * Process HTML:
 * - Replaces references to JS and CSS for production build
 * - Remove comments for production build
 * - Simply copy HTML for dev build
 */
function processHtml() {
	if (isProdBuild()) {
		return gulp.src(sourceFiles)
			.pipe(processhtml())
			.pipe(htmlmin({removeComments: true, preserveLineBreaks: true, collapseWhitespace: true}))
			.pipe(gulp.dest(settings.destinations.prod.html));
	}
	return gulp.src(sourceFiles)
		.pipe(gulp.dest(settings.destinations.dev.html));
}

export default processHtml;
