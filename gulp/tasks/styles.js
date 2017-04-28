import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import sourcemaps from 'gulp-sourcemaps';
import uncss from 'gulp-uncss';
import Autoprefix from 'less-plugin-autoprefix';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';

import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';
import onError from '../onError';

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
 * Handles LESS transpiling, auto prefixing, minifying and UnCSS.
 */
function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.stylesEntryPoint)
			.pipe(plumber({errorHandler: onError}))
			.pipe(less({
				plugins: [new Autoprefix(autoPrefixOptions)]
			}))
			.pipe(cleanCss())
			.pipe(rename({
				baseName: 'index',
				suffix: '.min'
			}))
			.pipe(gulp.dest(settings.destinations.prod.styles))
			.pipe(rename('index.uncss.min.css'))
			.pipe(uncss({
				html: settings.sources.markup
			}))
			.pipe(gulp.dest(settings.destinations.prod.styles));
	}
	return gulp.src(settings.sources.stylesEntryPoint)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [new Autoprefix(autoPrefixOptions)]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(settings.destinations.dev.styles));
}

export default styles;
