import gulp from 'gulp';
import bootlint from 'gulp-bootlint';

import {settings, useHandlebars} from '../config';
import {isProdBuild} from '../command-line-args';

const sourceFiles = useHandlebars ? './.metalsmith-build/*.html' : settings.sources.html;

/**
 * Lint HTML with Bootlint
 */
function lintBootstrap() {
	return gulp.src(sourceFiles)
		.pipe(bootlint({
			stoponerror: isProdBuild(),
			disabledIds: ['W005']
		}));
}

export default lintBootstrap;
