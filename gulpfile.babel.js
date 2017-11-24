/* eslint filenames/match-exported: 0 */
// Import npm modules
import chalk from 'chalk';
import gulp from 'gulp';
import gutil from 'gulp-util';

// Import settings
import {settings, useHandlebars} from './gulp/config';
import {isProdBuild} from './gulp/command-line-args';

// Import tasks
import clean from './gulp/tasks/clean';
import styles from './gulp/tasks/styles';
import fonts from './gulp/tasks/fonts';
import images from './gulp/tasks/images';
import appTemplates from './gulp/tasks/app-templates';
import {webpack, webpackWatch} from './gulp/tasks/webpack';
import bundleExternalCSS from './gulp/tasks/bundle-external-css';
import copyStaticFiles from './gulp/tasks/copy-static-files';
import lint from './gulp/tasks/lint';
import security from './gulp/tasks/security';
import processHtml from './gulp/tasks/process-html';
import lintBootstrap from './gulp/tasks/lint-bootstrap';
import test from './gulp/tasks/test';
import {serve, reload} from './gulp/tasks/serve';
import bumpVersion from './gulp/tasks/bump-version';
import createChangelog from './gulp/tasks/create-changelog';
import commitChanges from './gulp/tasks/commit-changes';
import createTag from './gulp/tasks/create-tag';
import validateHtml from './gulp/tasks/validate-html';
import cacheBust from './gulp/tasks/cache-bust';
import lintStyles from './gulp/tasks/lint-styles';
import handlebars from './gulp/tasks/handlebars';
import banners from './gulp/tasks/banners';

/**
 * Print build target
 */
const buildTarget = isProdBuild() ? ' Production ' : ' Development ';
console.log(chalk.yellow(`Build target: ${chalk.bold.inverse(buildTarget)}`));

/**
 * Export imported tasks.
 * ----------------------------------------------------------------------------
 * Test task:
 * Run `gulp test`, `gulp test --watch` or `gulp test --production` in CI to
 * make exit with a correct exit code when tests are failing
 * ----------------------------------------------------------------------------
 * ESLint task:
 * Run `gulp lint` respectively `gulp lint --production`
 * ----------------------------------------------------------------------------
 * Serve task:
 * Run `gulp serve` respectively `gulp serve --production`
 */
export {test, lint, serve};

/**
 * Define and export watch task:
 * Run `gulp watch` respectively `gulp watch --production`
 */
export function watch() {
	gulp.watch(settings.sources.scripts, gulp.series(gulp.parallel(lint, reload))).on('change', informOnChange);
	gulp.watch(settings.sources.styles, gulp.series(styles, gulp.parallel(lintStyles, reload))).on('change', informOnChange);

	if (useHandlebars) {
		gulp.watch([
			...settings.sources.handlebars,
			'./src/handlebars/layouts/*.hbs',
			'./src/handlebars/partials/**/*.hbs',
			'./src/handlebars/helpers/*.js'
		], gulp.series(handlebars, gulp.parallel(lintBootstrap, validateHtml, gulp.series(processHtml, reload)))).on('change', informOnChange);
		gulp.watch(['./src/handlebars/helpers/*.js'], gulp.parallel(lint)).on('change', informOnChange);
	} else {
		gulp.watch(settings.sources.html, gulp.parallel(lintBootstrap, validateHtml, gulp.series(processHtml, reload))).on('change', informOnChange);
	}

	gulp.watch(settings.sources.images, gulp.series(images, reload)).on('change', informOnChange);
	gulp.watch(settings.sources.fonts, gulp.series(fonts, reload)).on('change', informOnChange);
	gulp.watch(settings.sources.appTemplates, gulp.series(appTemplates, reload)).on('change', informOnChange);

	function informOnChange(path) {
		gutil.log(`File ${chalk.yellow(path)} has changed`);
	}
}
watch.description = '`gulp watch` watches for changes and runs tasks automatically';

/**
 * Define and export main build task:
 * Run `gulp build` respectively `gulp build --production`
 */
export const build = gulp.series(
	clean,
	handlebars,
	gulp.parallel(processHtml, appTemplates, lint, fonts, images, webpack, bundleExternalCSS, copyStaticFiles, validateHtml, lintBootstrap, lintStyles, security, test),
	styles,
	banners,
	cacheBust
);
build.description = '`gulp build` is the main build task';
build.flags = {
	'--production': ' builds for production to `dist` directory.',
	'-P': ' Alias for --production'
};

/**
 * Define and export default task:
 * Run `gulp` respectively `gulp --production`
 */
const dev = gulp.series(
	build,
	serve,
	gulp.parallel(webpackWatch, watch)
);
dev.description = '`gulp` will build, serve, watch for changes and reload server';
export default dev;

/**
 * Define and export release task:
 * Run `gulp release --bump major|minor|patch`
 */
export const release = gulp.series(build, bumpVersion, createChangelog, commitChanges, createTag);
release.description = '`gulp release` builds the current sources and bumps version number';
release.flags = {
	'--bump major': ' major release (1.0.0). See http://semver.org',
	'--bump minor': ' minor release (0.1.0). See http://semver.org',
	'--bump patch': ' patch release (0.0.1). See http://semver.org',
	'--bump prelease': ' prerelease (0.0.1-0). See http://semver.org',
	'--bump premajor': ' pre major release (1.0.0-0). See http://semver.org',
	'--bump preminor': ' pre minor release (0.1.0-0). See http://semver.org',
	'--bump prepath': ' pre path release (0.0.1-0). See http://semver.org',
	'-B (major|minor|patch)': ' alias to --bump',
	'--prerelease-identifier yourIdentifier': 'e.g. gulp release -B premajor --prerelease-identifier beta'
};
