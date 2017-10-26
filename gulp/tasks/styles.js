import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'uncss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';

import {settings} from '../config';
import {isProdBuild} from '../command-line-args';
import onError from '../on-error';

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

const uncssOptions = {
	ignoreSheets: [/fonts.googleapis/],
	timeout: 2000,
	html: `${settings.destinations.prod.html}/**/*.html`,
	ignore: [
		/\w\.in/,
		/(#|\.)navbar(-[a-zA-Z]+)?/,
		/(#|\.)modal(-[a-zA-Z]+)?/,
		/(#|\.)dropdown(-[a-zA-Z]+)?/,
		/(#|\.)carousel(-[a-zA-Z]+)?/,
		/(#|\.)tooltip(-[a-zA-Z]+)?/,
		/(#|\.)(open)/,
		'.fade',
		'.collapse',
		'.collapsing',
		'.in'
	]
};

/**
 * Handles Sass transpiling, auto prefixing, minifying and UnCSS.
 */
function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.stylesEntryPoint)
			.pipe(sass())
			.pipe(postcss([
				autoprefixer(autoPrefixOptions),
				cssnano({
					discardComments: {
						removeAll: true
					}
				})
			]))
			.pipe(rename('index.min.css'))
			.pipe(gulp.dest(settings.destinations.prod.styles))
			.pipe(rename('index.uncss.min.css'))
			.pipe(postcss([uncss.postcssPlugin(uncssOptions)]))
			.pipe(gulp.dest(settings.destinations.prod.styles));
	}
	return gulp.src(settings.sources.stylesEntryPoint)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer(autoPrefixOptions)]))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(settings.destinations.dev.styles));
}

export default styles;
