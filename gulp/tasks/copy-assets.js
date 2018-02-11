import gulp from 'gulp';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Copy additional directories from src/assets
 */
function copyAssets() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.assets)
			.pipe(gulp.dest(settings.destinations.prod.assets));
	}
	return gulp.src(settings.sources.assets)
		.pipe(gulp.dest(settings.destinations.dev.assets));
}

export default copyAssets;
