import del from 'del';

import {mainDirectories} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Delete output directories
 */
function clean() {
	if (isProdBuild()) {
		return del(mainDirectories.dist);
	}
	return del(mainDirectories.dev);
}

export default clean;
