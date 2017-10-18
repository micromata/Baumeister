import nsp from 'gulp-nsp';
import path from 'path';

import {isProdBuild} from '../command-line-args';

/**
 * Check dependencies with help of the node security platform
 */
function security(done) {
	if (isProdBuild()) {
		nsp({package: path.join(__dirname, '../../package.json')}, done);
	} else {
		done();
	}
}

export default security;
