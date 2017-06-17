import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'gulp-uncss';
import vendorPrefix from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';

import {settings, useHandlebars} from '../config';
import {isProdBuild} from '../commandLineArgs';
import onError from '../onError';

const htmlSources = useHandlebars ? './.metalsmith-build/*.html' : settings.sources.html;

const autoPrefixOptions = {
	browsers: [
		'> 1%',
		'last 3 version',
		'ie 8',
		'ie 9',
		'Firefox ESR',
		'Opera 12.1'
	]
};

/**
 * Handles Sass transpiling, auto prefixing, minifying and UnCSS.
 */
function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.stylesEntryPoint)
			.pipe(sass())
			.pipe(vendorPrefix(autoPrefixOptions))
			.pipe(cleanCss({level: {1: {specialComments: 0}}}))
			.pipe(rename('index.min.css'))
			.pipe(gulp.dest(settings.destinations.prod.styles))
			.pipe(rename('index.uncss.min.css'))
			.pipe(uncss({
				html: htmlSources
			}))
			.pipe(gulp.dest(settings.destinations.prod.styles));
	}
	return gulp.src(settings.sources.stylesEntryPoint)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(vendorPrefix(autoPrefixOptions))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(settings.destinations.dev.styles));
}

export default styles;
