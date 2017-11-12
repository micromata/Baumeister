import path from 'path';
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import concat from 'gulp-concat';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Bundle CSS files defined in baumeister.json → bundleCSS
 */
function bundleExternalCSS(done) {
	const files = settings.sources.externalCss.map(sourcePath => path.join('node_modules/', sourcePath));
	if (!files.length) return done();
	if (isProdBuild()) {
		return gulp.src(files)
			.pipe(postcss([cssnano({
				discardComments: {
					removeAll: true
				}
			})]))
			.pipe(concat('libs.min.css'))
			.pipe(gulp.dest(settings.destinations.prod.libs));
	}
	return gulp.src(files)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(settings.destinations.dev.libs));
}

export default bundleExternalCSS;
