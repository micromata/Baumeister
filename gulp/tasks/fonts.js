import gulp from 'gulp';
import changed from 'gulp-changed';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Copy fonts from src/assets/fonts
 */
function fonts() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.fonts)
			.pipe(changed(settings.destinations.prod.fonts))
			.pipe(gulp.dest(settings.destinations.prod.fonts));
	}
	return gulp.src(settings.sources.fonts)
		.pipe(changed(settings.destinations.dev.fonts))
		.pipe(gulp.dest(settings.destinations.dev.fonts));
}

export default fonts;
