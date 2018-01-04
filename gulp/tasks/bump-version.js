import gulp from 'gulp';
import chalk from 'chalk';
import touch from 'gulp-touch';
import bump from 'gulp-bump';
import semver from 'semver';

import onError from '../on-error';
import {args, hasBumpType} from '../command-line-args';

const pkgJson = require('../../package.json');

/**
 * Bumps version in package.json.
 * Used in release task.
 */
function bumpVersion() {
	if (!hasBumpType()) {
		onError(new Error(chalk.red('Please specify release type: gulp release --bump (major|minor|patch)')));
	}

	pkgJson.version = semver.inc(pkgJson.version, args.bump, args['prerelease-identifier']);

	return gulp.src(['./package.json', './package-lock.json'])
		.pipe(bump({
			type: args.bump,
			preid: args['prerelease-identifier']
		}))
		.on('error', onError)
		.pipe(gulp.dest('./'))
		.pipe(touch());
}

export default bumpVersion;
