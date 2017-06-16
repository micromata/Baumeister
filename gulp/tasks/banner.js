/**
 * Generate banner on processed source code
 */
import gulp from 'gulp';
import gulpBanner from 'gulp-banner';
import {isProdBuild} from '../commandLineArgs';
import {generateBanner, pkgJson, settings} from '../config';
import merge from 'merge-stream';

const bannerString = '/*! <%= pkgJson.title %> - v<%= pkgJson.version %>\n' +
	' * <%= pkgJson.author.email %>\n' +
	' * Copyright ©<%= yearString %> <%= pkgJson.author.name %>\n' +
	' * <%= dateString %>\n' +
	' */\n';

function banner(done) {
	const currentDate = new Date();
	const yearString = currentDate.getFullYear();
	const monthString = currentDate.getUTCMonth() > 8 ? currentDate.getUTCMonth() + 1 : `0${currentDate.getUTCMonth() + 1}`;
	const dayString = currentDate.getDate() > 9 ? currentDate.getDate() : `0${currentDate.getDate()}`;
	const dateString = `${yearString}-${monthString}-${dayString}`;

	const opts = {pkgJson, yearString, dateString};
	if (isProdBuild() && generateBanner) {
		return merge(gulp.src(settings.destinations.prod.app + '**/*.js')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.app)),
		gulp.src(settings.destinations.prod.styles + '**/*.css')
			.pipe(gulpBanner(bannerString, opts))
			.pipe(gulp.dest(settings.destinations.prod.styles))
		);
	}
	done();
}

export default banner;
