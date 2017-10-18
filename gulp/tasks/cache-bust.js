import gulp from 'gulp';
import rev from 'gulp-rev-append';
import {settings} from '../config';
import {isProdBuild} from '../command-line-args';

function cacheBust(done) {
	if (isProdBuild()) {
		return gulp.src(`${settings.destinations.prod.html}/**/*.html`)
			.pipe(rev())
			.pipe(gulp.dest(settings.destinations.prod.html));
	}
	done();
}

export default cacheBust;
