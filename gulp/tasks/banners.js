/**
 * Generate banners on processed source code
 */
import gulp from 'gulp';
import gulpBanner from 'gulp-banner';
import {isProdBuild} from '../command-line-args';
import {generateBanners, settings} from '../config';
import merge from 'merge-stream';

const pkgJson = require('../../package.json');

const banner = `/*! <%= pkgJson.title %> - v<%= pkgJson.version %>
 * <%= pkgJson.author.email %>
 * Copyright ©<%= year %> <%= pkgJson.author.name %>
 * <%= fullDate %>
 */
`;

function banners(done) {
	const year = new Date().getFullYear();
	const fullDate = new Date().toLocaleDateString('en-US');

	const opts = {pkgJson, year, fullDate};
	if (isProdBuild() && generateBanners) {
		return merge(
			gulp.src(settings.destinations.prod.app + '**/*.js')
				.pipe(gulpBanner(banner, opts))
				.pipe(gulp.dest(settings.destinations.prod.app)),
		gulp.src(settings.destinations.prod.styles + '**/*.css')
			.pipe(gulpBanner(banner, opts))
			.pipe(gulp.dest(settings.destinations.prod.styles)),
		gulp.src(settings.destinations.prod.libs + '*.js')
			.pipe(gulpBanner(banner, opts))
			.pipe(gulp.dest(settings.destinations.prod.libs)),
		gulp.src(settings.destinations.prod.libs + '*.css')
			.pipe(gulpBanner(banner, opts))
			.pipe(gulp.dest(settings.destinations.prod.libs))
		);
	}
	done();
}

export default banners;
