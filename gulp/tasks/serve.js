import browserSync from 'browser-sync';

import {mainDirectories} from '../config';
import {isProdBuild} from '../commandLineArgs';

const server = browserSync.create();

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
export function reload(done) {
	server.reload();
	done();
}
