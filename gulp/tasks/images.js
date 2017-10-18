import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Minify PNG, JPEG, GIF and SVG images with imagemin
 */
function images() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.images)
			.pipe(imagemin())
			.pipe(gulp.dest(settings.destinations.prod.images));
	}
	return gulp.src(settings.sources.images)
		.pipe(gulp.dest(settings.destinations.dev.images));
}

export default images;
