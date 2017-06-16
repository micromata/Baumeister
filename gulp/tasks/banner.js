/**
 * Generate banner on processed source code
 */
import gulp from 'gulp';
import gulpBanner from 'gulp-banner';
import {isProdBuild} from '../commandLineArgs';
import {generateBanners, pkgJson, settings} from '../config';
import merge from 'merge-stream';

const bannerString = '/*! <%= pkgJson.title %> - v<%= pkgJson.version %>\n' +
	' * <%= pkgJson.author.email %>\n' +
	' * Copyright ©<%= yearString %> <%= pkgJson.author.name %>\n' +
	' * <%= dateString %>\n' +
	' */\n';

function banner(done) {
	const yearString = new Date().getFullYear();
	const dateString = new Date().toLocaleDateString('en-US');

	const opts = {pkgJson, yearString, dateString};
	if (isProdBuild() && generateBanners) {
		return merge(gulp.src(settings.destinations.prod.app + '**/*.js')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.app)),
		gulp.src(settings.destinations.prod.styles + '**/*.css')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.styles)),
		gulp.src(settings.destinations.prod.libs + '*.js')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.libs)),
		gulp.src(settings.destinations.prod.libs + '*.css')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.libs))
		);
	}
	done();
}

export default banner;
