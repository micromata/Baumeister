import browserSync from 'browser-sync';

import {mainDirectories} from '../config';
import {isProdBuild} from '../command-line-args';

const server = browserSync.create();

/**
 * Serve task:
 * Run `gulp serve` respectively `gulp serve --production`
 */
function serve(done) {
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

export {serve, reload};
