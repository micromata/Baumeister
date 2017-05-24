import gulp from 'gulp';
import browserify from 'browserify';
import browserifyInc from 'browserify-incremental';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import envify from 'gulp-envify';

import {settings} from '../config';
import onError from '../onError';
import {isProdBuild} from '../commandLineArgs';

export const vendorCacheFile = '.browserify-cache-vendor.json';

/**
 * Bundle JavaScript libs defined in package.json → baumeister.bundleExternalJS
 */
function vendorScripts() {
	const b = browserify({...browserifyInc.args});
	settings.sources.externalJs.forEach(dep => b.require(dep));
	browserifyInc(b, {cacheFile: vendorCacheFile});

	if (isProdBuild()) {
		return b.bundle()
			.pipe(source('vendor.min.js'))
			.pipe(buffer())
			.pipe(envify({NODE_ENV: 'production'}))
			.pipe(uglify())
			.pipe(gulp.dest(settings.destinations.prod.libs));
	}
	return b.bundle()
		.on('error', onError)
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(gulp.dest(settings.destinations.dev.libs));
}

export default vendorScripts;
