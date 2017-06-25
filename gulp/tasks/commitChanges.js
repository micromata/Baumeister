import gulp from 'gulp';
import git from 'gulp-git';

import {pkgJson} from '../config';

/**
 * Commits changes.
 * Used in release task.
 */
function commitChanges() {
	return gulp.src('.')
		.pipe(git.add())
		.pipe(git.commit(`chore: Release ${pkgJson.version}`));
}

export default commitChanges;
