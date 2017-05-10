import gulp from 'gulp';
import changelog from 'gulp-conventional-changelog';
/**
 * Creates changelog.
 * Used in release task.
 */
function createChangelog() {
	return gulp.src('./CHANGELOG.md', {buffer: false})
		.pipe(changelog({preset: 'angular'}))
		.pipe(gulp.dest('./'));
}

export default createChangelog;
