import gulp from 'gulp';
import path from 'path';

import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Copy files defined in package.json → baumeister.includeStaticFiles
 */
function copyStaticFiles() {
	return gulp.src(settings.sources.staticFiles.map(sourcePath => path.join('node_modules/', sourcePath)), {base: 'node_modules/'})
		.pipe(gulp.dest(isProdBuild() ? settings.destinations.prod.libs : settings.destinations.dev.libs));
}

export default copyStaticFiles;
