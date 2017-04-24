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
import browserifyInc from 'browserify-incremental';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import processhtml from 'gulp-processhtml';

const isProdBuild = () => process.argv.filter(val => val.toLowerCase().indexOf('-prod') !== -1).length > 0;
const server = browserSync.create();
const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

const settings = {
	sources: {
		markup: './src/*.html',
		styles: './src/assets/less/**/*.less',
		stylesEntryPoint: './src/assets/less/index.less',
		scripts: './src/app/**/*.js',
		images: './src/assets/img/**/*.{png,jpg,gif,svg}'
	},
	destinations: {
		dev: {
			markup: `${mainDirectories.dev}`,
			styles: `${mainDirectories.dev}assets/css/`,
			scripts: `${mainDirectories.dev}app/`,
			images: `${mainDirectories.dev}assets/img/`,
			libs: `${mainDirectories.dev}libs/`
		},
		prod: {
			markup: `${mainDirectories.dist}`,
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

function onError(err) {
	notify({
		title: 'Gulp Task Error',
		subtitle: 'Plugin: <%= error.plugin %>',
		message: 'Check the console.'
	}).write(err);

	console.log(err.toString());

	this.emit('end');
}

export function clean() {
	if (isProdBuild()) {
		return del(['dist']);
	}
	return del(['server']);
}

export function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.stylesEntryPoint)
			.pipe(plumber({errorHandler: onError}))
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
	return gulp.src(settings.sources.stylesEntryPoint)
		.pipe(plumber({errorHandler: onError}))
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
	const b = browserify(Object.assign({}, browserifyInc.args));
	require('./package.json').bootstrapKickstart.bundleExternalJS.forEach(dep => b.require(dep));
	browserifyInc(b, {cacheFile: './.browserify-cache.json'});

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

export function bundleExternalCSS(done) {
	const files = require('./package.json').bootstrapKickstart.bundleCSS;
	if (files.length < 1) {
		return done();
	}
	return gulp.src(files)
		.pipe(cleanCss())
		.pipe(rename({
			baseName: 'libs',
			suffix: '.min'
		}))
		.pipe(gulp.dest('./libs'));
}

export function copyStaticFiles() {
	const files = require('./package.json').bootstrapKickstart.includeStaticFiles
		.map(path => 'node_modules/' + path);
	return gulp.src(files, {base: 'node_modules/'})
		.pipe(gulp.dest('./libs'));
}

export function lint() {
	if (isProdBuild()) {
		return gulp.src([settings.sources.scripts, './*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
	return gulp.src([settings.sources.scripts, './*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.on('error', onError);
}

export function security(cb) {
	if (isProdBuild()) {
		nsp({package: path.join(__dirname, '/package.json')}, cb);
	} else {
		cb();
	}
}

export function html() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.markup)
			.pipe(processhtml())
			.pipe(gulp.dest(settings.destinations.prod.markup));
	}
	return gulp.src(settings.sources.markup)
		.pipe(changed(settings.destinations.dev.markup))
		.pipe(gulp.dest(settings.destinations.dev.markup));
}

export function serve(done) {
	let baseDir = mainDirectories.dev;
	if (isProdBuild()) {
		baseDir = mainDirectories.dist;
	}
	server.init({
		server: {
			baseDir
		}
	});
	done();
}

function reload(done) {
	server.reload();
	done();
}

export function watch() {
	gulp.watch(settings.sources.scripts,
		gulp.parallel(
			gulp.series(clientScripts, reload),
			lint
		)
	);
	gulp.watch('./*.js', lint);
	gulp.watch(settings.sources.styles, gulp.series(styles, reload));
	gulp.watch(settings.sources.markup, gulp.series(html, reload));
}

export const build = gulp.series(
	clean,
	gulp.parallel(html, lint, images, clientScripts, vendorScripts, styles, bundleExternalCSS, copyStaticFiles, security)
);

const dev = gulp.series(build, serve, watch);
export default dev;
