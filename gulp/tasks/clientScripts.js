import gulp from 'gulp';
import browserify from 'browserify';
import browserifyInc from 'browserify-incremental';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

import {settings} from '../config';
import onError from '../onError';
import {isProdBuild} from '../commandLineArgs';

export const clientCacheFile = '.browserify-cache-client.json';

/**
 * Bundle own JavaScript excluding libs defined in package.json → baumeister.bundleExternalJS
 */
function clientScripts() {
	const b = browserify('./src/app/index.js', {...browserifyInc.args, debug: true})
		.transform(babelify, {sourceMaps: true})
		.external(settings.sources.externalJs);
	browserifyInc(b, {cacheFile: clientCacheFile});

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
			.pipe(gulp.dest(settings.destinations.prod.app));
	}
	return b.bundle()
		.on('error', onError)
		.pipe(source('client.js'))
		.pipe(buffer())
		.pipe(gulp.dest(settings.destinations.dev.app));
}

export default clientScripts;
