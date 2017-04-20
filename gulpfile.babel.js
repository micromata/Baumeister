import gulp from 'gulp';
// Style processing
import less from 'gulp-less';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import Autoprefix from 'less-plugin-autoprefix';
// JS processing
import eslint from 'gulp-eslint';
// Image processing
import imagemin from 'gulp-imagemin';
// JS Bundling
import rollup from 'gulp-rollup';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
// Util
import rename from 'gulp-rename';
import del from 'del';

const isProdBuild = () => process.argv.filter(val => val.toLowerCase().indexOf('-prod') !== -1).length > 0;

const sources = {
	styles: './src/assets/less/index.less',
	scripts: './src/app/**/*.js',
	images: './src/assets/img/**/*.{png,jpg,gif,svg}'
};

const destinations = {
	dev: {
		styles: './server/assets/css/',
		scripts: './server/app/',
		images: './server/assets/img/'
	},
	prod: {
		styles: './dist/assets/css/',
		scripts: './dist/app/',
		images: './dist/assets/img/'
	}
};

export function clean() {
	if (isProdBuild()) {
		return del(['dist']);
	}
	return del(['server']);
}

export function styles() {
	if (isProdBuild()) {
		return gulp.src(sources.styles)
			.pipe(less({
				plugins: [new Autoprefix({
					browsers: [
						'> 1%',
						'last 3 version',
						'ie 8',
						'ie 9',
						'Firefox ESR',
						'Opera 12.1'
					]
				})]
			}))
			.pipe(cleanCss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(destinations.prod.styles));
	}
	return gulp.src(sources.styles)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [new Autoprefix({
				browsers: [
					'> 1%',
					'last 3 version',
					'ie 8',
					'ie 9',
					'Firefox ESR',
					'Opera 12.1'
				]
			})]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destinations.dev.styles));
}

export function images() {
	if (isProdBuild()) {
		return gulp.src(sources.images)
			.pipe(imagemin())
			.pipe(gulp.dest(destinations.prod.images));
	}
	return gulp.src(sources.images)
		.pipe(gulp.dest(destinations.dev.images));
}

export function clientScripts() {
	if (isProdBuild()) {
		return gulp.src(sources.scripts)
			.pipe(rollup({
				entry: './src/app/index.js'
			}))
			.pipe(babel())
			.pipe(uglify())
			.pipe(rename({
				baseName: 'client',
				suffix: '.min'
			}))
			.pipe(gulp.dest(destinations.prod.scripts));
	}
	return gulp.src(sources.scripts)
		.pipe(rollup({
			entry: './src/app/index.js'
		}))
		.pipe(babel())
		.pipe(gulp.dest(destinations.dev.scripts));
}

export function lint() {
	if (isProdBuild()) {
		return gulp.src([sources.scripts, './*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
	return gulp.src([sources.scripts, './*.js'])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format());
}

export const build = gulp.series(clean, gulp.parallel(lint, images, clientScripts, styles));
