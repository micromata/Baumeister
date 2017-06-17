import path from 'path';
import gulp from 'gulp';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';

import {settings, pkgJson} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Bundle CSS files defined in package.json → baumeister.bundleCSS
 */
function bundleExternalCSS(done) {
	const files = pkgJson.baumeister.bundleCSS.map(sourcePath => path.join('node_modules/', sourcePath));
	if (!files.length) return done();
	if (isProdBuild()) {
		return gulp.src(files)
			.pipe(cleanCss())
			.pipe(concat('libs.min.css'))
			.pipe(gulp.dest(settings.destinations.prod.libs));
	}
	return gulp.src(files)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(settings.destinations.dev.libs));
}

export default bundleExternalCSS;
