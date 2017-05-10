import gulp from 'gulp';
import rev from 'gulp-rev-append';
import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';

function cacheBust(done) {
	if (isProdBuild()) {
		return gulp.src(`${settings.destinations.prod.markup}/**/*.html`)
			.pipe(rev())
			.pipe(gulp.dest(settings.destinations.prod.markup));
	}
	done();
}

export default cacheBust;
