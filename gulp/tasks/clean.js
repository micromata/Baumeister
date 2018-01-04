import del from 'del';

import {mainDirectories, settings} from '../config';
import {isProdBuild} from '../command-line-args';

/**
 * Delete output directories
 */
function clean() {
	if (isProdBuild()) {
		return del([
			mainDirectories.dist,
			settings.destinations.handlebars
		]);
	}
	return del([
		mainDirectories.dev,
		settings.destinations.handlebars
	]);
}

export default clean;
