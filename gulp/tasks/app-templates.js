import gulp from 'gulp';
import changed from 'gulp-changed';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Copy HTML files from src/app/
 */
function appTemplates() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.appTemplates)
			.pipe(changed(settings.destinations.prod.app))
			.pipe(gulp.dest(settings.destinations.prod.app));
	}
	return gulp.src(settings.sources.appTemplates)
		.pipe(changed(settings.destinations.dev.app))
		.pipe(gulp.dest(settings.destinations.dev.app));
}

export default appTemplates;
