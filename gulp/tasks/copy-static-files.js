import gulp from 'gulp';
import path from 'path';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Copy files defined in baumeister.json → includeStaticFiles
 */
function copyStaticFiles(done) {
	if (!settings.sources.staticFiles.length) {
		done();
		return false;
	}

	return gulp.src(settings.sources.staticFiles.map(sourcePath => path.join('node_modules/', sourcePath)), {base: 'node_modules/'})
		.pipe(gulp.dest(isProdBuild() ? settings.destinations.prod.libs : settings.destinations.dev.libs));
}

export default copyStaticFiles;
