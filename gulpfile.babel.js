import gulp from 'gulp';
import less from 'gulp-less';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import Autoprefix from 'less-plugin-autoprefix';
import eslint from 'gulp-eslint';
import imagemin from 'gulp-imagemin';
import rollup from 'gulp-rollup';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import del from 'del';
import nsp from 'gulp-nsp';
import * as path from 'path';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const isProdBuild = () => process.argv.filter(val => val.toLowerCase().indexOf('-prod') !== -1).length > 0;

const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

const settings = {
	sources: {
		styles: './src/assets/less/index.less',
		scripts: './src/app/**/*.js',
		images: './src/assets/img/**/*.{png,jpg,gif,svg}'
	},
	destinations: {
		dev: {
			styles: `${mainDirectories.dev}assets/css/`,
			scripts: `${mainDirectories.dev}app/`,
			images: `${mainDirectories.dev}assets/img/`,
			libs: `${mainDirectories.dev}libs/`
		},
		prod: {
			styles: `${mainDirectories.dist}assets/css/`,
			scripts: `${mainDirectories.dist}app/`,
			images: `${mainDirectories.dist}assets/img/`,
			libs: `${mainDirectories.dist}libs/`
		}
	},
	autoPrefix: [
		'> 1%',
		'last 3 version',
		'ie 8',
		'ie 9',
		'Firefox ESR',
		'Opera 12.1'
	]
};

export function clean() {
	if (isProdBuild()) {
		return del(['dist']);
	}
	return del(['server']);
}

export function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.styles)
			.pipe(less({
				plugins: [new Autoprefix({
					browsers: settings.autoPrefix
				})]
			}))
			.pipe(cleanCss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(settings.destinations.prod.styles));
	}
	return gulp.src(settings.sources.styles)
		.pipe(changed(settings.destinations.dev.styles, {extension: '.css'}))
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [new Autoprefix({
				browsers: settings.autoPrefix
			})]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(settings.destinations.dev.styles));
}

export function images() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.images)
			.pipe(imagemin())
			.pipe(gulp.dest(settings.destinations.prod.images));
	}
	return gulp.src(settings.sources.images)
		.pipe(gulp.dest(settings.destinations.dev.images));
}

export function clientScripts() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.scripts)
			.pipe(rollup({
				entry: './src/app/index.js'
			}))
			.pipe(babel())
			.pipe(uglify())
			.pipe(rename({
				baseName: 'client',
				suffix: '.min'
			}))
			.pipe(gulp.dest(settings.destinations.prod.scripts));
	}
	return gulp.src(settings.sources.scripts)
		.pipe(rollup({
			entry: './src/app/index.js'
		}))
		.pipe(babel())
		.pipe(gulp.dest(settings.destinations.dev.scripts));
}

export function vendorScripts() {
	const b = browserify();
	require('./package.json').bootstrapKickstart.bundleExternalJS.forEach(dep => b.require(dep));
	if (isProdBuild()) {
		return b.bundle()
			.pipe(source('vendor.min.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(settings.destinations.prod.libs));
	}
	return b.bundle()
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(gulp.dest(settings.destinations.dev.libs));
}

export function lint() {
	if (isProdBuild()) {
		return gulp.src([settings.sources.scripts, './*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
	return gulp.src([settings.sources.scripts, './*.js'])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format());
}

export function security(cb) {
	if (isProdBuild()) {
		nsp({package: path.join(__dirname, '/package.json')}, cb);
	} else {
		cb();
	}
}

export function serve() {
	let baseDir = mainDirectories.dev;
	if (isProdBuild()) {
		baseDir = mainDirectories.dist;
	}
	browserSync.init({
		server: {
			baseDir
		}
	});
}

export const build = gulp.series(clean, gulp.parallel(lint, images, clientScripts, vendorScripts, styles, security));
