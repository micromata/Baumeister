import gulp from 'gulp';
import bootlint from 'gulp-bootlint';

import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Lint HTML with Bootlint
 */
function lintBootstrap() {
	return gulp.src(settings.sources.markup)
		.pipe(bootlint({
			stoponerror: isProdBuild(),
			disabledIds: ['W005']
		}));
}

export default lintBootstrap;
