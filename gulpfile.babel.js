import path from 'path';
import del from 'del';
import chalk from 'chalk';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import browserifyInc from 'browserify-incremental';
import babelify from 'babelify';
import Autoprefix from 'less-plugin-autoprefix';
import jest from 'jest-cli';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import touch from 'gulp-touch';
import gulp from 'gulp';
import bootlint from 'gulp-bootlint';
import changed from 'gulp-changed';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import less from 'gulp-less';
import notify from 'gulp-notify';
import nsp from 'gulp-nsp';
import plumber from 'gulp-plumber';
import processhtml from 'gulp-processhtml';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import uncss from 'gulp-uncss';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import bump from 'gulp-bump';
import changelog from 'gulp-conventional-changelog';
import git from 'gulp-git';
import minimist from 'minimist';
import semver from 'semver';
import {settings, mainDirectories, pkgJson} from './gulp.config';

const server = browserSync.create();
const args = minimist(process.argv.slice(2), {
	boolean: ['production', 'watch'],
	string: 'bump',
	alias: {P: 'production', B: 'bump', W: 'watch'}
});

function hasBumpType() {
	return args.bump === 'major' ||
					args.bump === 'minor' ||
					args.bump === 'patch';
}

function isProdBuild() {
	return args.production || hasBumpType();
}

/**
 * Configure notify error reporting.
 * Can be used in tasks.
 */
function onError(err) {
	notify({
		title: 'Gulp Task Error',
		subtitle: 'Plugin: <%= error.plugin %>',
		message: 'Check the console.'
	}).write(err);

	console.error(err.toString());

	this.emit('end');
}

/**
 * Delete output directories
 */
function clean() {
	if (isProdBuild()) {
		return del(mainDirectories.dist);
	}
	return del(mainDirectories.dev);
}

/**
 * Handles LESS transpiling, auto prefixing, minifying and UnCSS.
 */
function styles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.stylesEntryPoint)
			.pipe(plumber({errorHandler: onError}))
			.pipe(less({
				plugins: [new Autoprefix(settings.autoPrefix)]
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
			plugins: [new Autoprefix(settings.autoPrefix)]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(settings.destinations.dev.styles));
}

/**
 * Minify PNG, JPEG, GIF and SVG images with imagemin
 */
function images() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.images)
			.pipe(imagemin())
			.pipe(gulp.dest(settings.destinations.prod.images));
	}
	return gulp.src(settings.sources.images)
		.pipe(gulp.dest(settings.destinations.dev.images));
}

/**
 * Bundle own JavaScript excluding libs defined in package.json → bootstrapKickstart.bundleExternalJS
 */
function clientScripts() {
	const b = browserify('./src/app/index.js', {...browserifyInc.args, debug: true})
		.transform(babelify, {sourceMaps: true})
		.external(settings.sources.externalJs);
	browserifyInc(b, {cacheFile: './.browserify-cache-client.json'});

	if (isProdBuild()) {
		return b.bundle()
			.pipe(source('client.js'))
			.pipe(buffer())
			.pipe(rename('client.min.js'))
			.pipe(uglify({
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			}))
			.pipe(gulp.dest(settings.destinations.prod.scripts));
	}
	return b.bundle()
		.on('error', onError)
		.pipe(source('client.js'))
		.pipe(buffer())
		.pipe(gulp.dest(settings.destinations.dev.scripts));
}

/**
 * Bundle JavaScript libs defined in package.json → bootstrapKickstart.bundleExternalJS
 */
function vendorScripts() {
	const b = browserify({...browserifyInc.args});
	settings.sources.externalJs.forEach(dep => b.require(dep));
	browserifyInc(b, {cacheFile: './.browserify-cache-vendor.json'});

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

/**
 * Bundle CSS files defined in package.json → bootstrapKickstart.bundleCSS
 */
function bundleExternalCSS(done) {
	const files = pkgJson.bootstrapKickstart.bundleCSS.map(sourcePath => path.join('node_modules/', sourcePath));
	if (!files.length) return done();
	if (isProdBuild()) {

		return gulp.src(files)
			.pipe(cleanCss())
			.pipe(concat('libs.min.css'))
			.pipe(gulp.dest(settings.destinations.prod.libs));
	}
	return gulp.src(files)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(settings.destinations.dev.libs));
}

/**
 * Copy files defined in package.json → bootstrapKickstart.includeStaticFiles
 */
function copyStaticFiles() {
	return gulp.src(settings.sources.staticFiles.map(sourcePath => path.join('node_modules/', sourcePath)), {base: 'node_modules/'})
		.pipe(gulp.dest(isProdBuild() ? settings.destinations.prod.libs : settings.destinations.dev.libs));
}

/**
 * ESLint task:
 * Run `gulp lint` respectively `gulp lint --production`
 */
export function lint() {
	if (isProdBuild()) {
		return gulp.src([...settings.sources.scripts, './*.js'])
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
	/**
	 * TODO: Run ESLint with --fix for dev build
	 * Seems that isn’t possible to fix files in place with multiple inputs. See example.
	 * Looks like we would need to use https://github.com/robrich/gulp-exec to execute ESLint (or xo) with the fix option.
	 */
	return gulp.src([...settings.sources.scripts, './*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.on('error', onError);
}
lint.description = '`gulp lint` lints JavaScript via ESLint';

/**
 * Check dependencies with help of the node security platform
 */
function security(done) {
	if (isProdBuild()) {
		nsp({package: path.join(__dirname, '/package.json')}, done);
	} else {
		done();
	}
}

/**
 * Process HTML:
 * - Replaces references to JS and CSS for production build
 * - Remove comments for production build
 * - Simply copy HTML for dev build
 */
function processHtml() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.markup)
			.pipe(processhtml())
			.pipe(htmlmin({removeComments: true, preserveLineBreaks: true, collapseWhitespace: true}))
			.pipe(gulp.dest(settings.destinations.prod.markup));
	}
	return gulp.src(settings.sources.markup)
		.pipe(changed(settings.destinations.dev.markup))
		.pipe(gulp.dest(settings.destinations.dev.markup));
}

/**
 * Lint HTML with Bootlint
 */
function lintBootstrap() {
	return gulp.src(settings.sources.markup)
		.pipe(bootlint({
			stoponerror: isProdBuild(),
			disabledIds: ['W005']
		}));
}

/**
 * Test task:
 * Run `gulp test`, `gulp test --watch` or `gulp test --production` in CI to
 * make exit with a correct exit code when tests are failing
 */
export function test(done) {
	if (args.watch) {
		jest.runCLI({watch: true, config: pkgJson.jest}, '.', () => {});
		done();
	}

	jest.runCLI({config: pkgJson.jest}, '.', result => {
		if (isProdBuild() && !result.success) {
			done();
			process.exit(1);
		}
		done();
	});
}
test.description = '`gulp test` runs unit test via Jest CLI';
test.flags = {
	'--production': ' exits with exit code 1 when tests are failing (CI)',
	'-P': ' Alias for --production',
	'--watch': ' runs unit test with Jests native watch option',
	'-W': ' Alias for --watch'
};

/**
 * Serve task:
 * Run `gulp serve` respectively `gulp serve --production`
 */
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
serve.description = '`gulp serve` serves the build (`server` directory)';
serve.flags = {
	'--production': ' serves production build (`dist` directory)',
	'-P': ' Alias for --production'
};

//  Helper function to reload server
function reload(done) {
	server.reload();
	done();
}

/**
 * Watch task:
 * Run `gulp watch` respectively `gulp watch --production`
 */
export function watch() {
	gulp.watch(settings.sources.scripts, gulp.series(clientScripts, gulp.parallel(lint, reload))).on('change', informOnChange);
	gulp.watch(settings.sources.styles, gulp.series(styles, reload)).on('change', informOnChange);
	gulp.watch(settings.sources.markup, gulp.parallel(lintBootstrap, gulp.series(processHtml, reload))).on('change', informOnChange);

	function informOnChange(path) {
		gutil.log(`File ${chalk.yellow(path)} has changed`);
	}
}
watch.description = '`gulp watch` watches for changes and runs tasks automatically';

/**
 * Main buildtask:
 * Run `gulp build` respectively `gulp build --production`
 */
export const build = gulp.series(
	clean,
	gulp.parallel(processHtml, lint, images, clientScripts, vendorScripts, styles, bundleExternalCSS, copyStaticFiles, lintBootstrap, security, test)
);
build.description = '`gulp build` is the main build task';
build.flags = {
	'--production': ' builds for production to `dist` directory.',
	'-P': ' Alias for --production'
};

/**
 * Bumps version in package.json.
 * Used in release task.
 */
function bumpVersion() {
	if (!hasBumpType()) {
		onError(new Error(chalk.red('Please specify release type: gulp release --bump (major|minor|patch)')));
	}

	return gulp.src('./package.json')
		.pipe(bump({type: args.bump}))
		.on('error', onError)
		.pipe(gulp.dest('./'))
		.pipe(touch());
}

/**
 * Creates changelog.
 * Used in release task.
 */
function createChangelog() {
	return gulp.src('./CHANGELOG.md', {buffer: false})
		.pipe(changelog({preset: 'angular'}))
		.pipe(gulp.dest('./'));
}

/**
 * Commits changes.
 * Used in release task.
 */
function commitChanges() {
	return gulp.src('.')
		.pipe(git.add())
		.pipe(git.commit(`Release ${semver.inc(pkgJson.version, args.bump)}`));
}

/**
 * Creates Git tag.
 * Used in release task.
 */
function createTag(done) {
	const version = semver.inc(pkgJson.version, args.bump);
	git.tag(version, `Created tag for version: ${version}`, error => {
		if (error) return onError(error);
		done();
	});
}

/**
 * Release task:
 * Run `gulp release --bump major|minor|patch`
 */
export const release = gulp.series(build, bumpVersion, createChangelog, commitChanges, createTag);
release.description = '`gulp release` builds the current sources and bumps version number';
release.flags = {
	'--bump major': ' major release (1.0.0). See http://semver.org',
	'--bump minor': ' minor release (0.1.0). See http://semver.org',
	'--bump patch': ' patch release (0.0.1). See http://semver.org',
	'-B major|minor|patch': ' alias to --bump'
};

/**
 * Default task:
 * Run `gulp` respectively `gulp --production`
 */
const dev = gulp.series(build, serve, watch);
dev.description = '`gulp` will build, serve, watch for changes and reload server';
export default dev;
