import git from 'gulp-git';

import {pkgJson} from '../config';
import onError from '../onError';

/**
 * Creates Git tag.
 * Used in release task.
 */
function createTag(done) {
	git.tag(pkgJson.version, `Created tag for version: ${pkgJson.version}`, error => {
		if (error) return onError(error);
		done();
	});
}

export default createTag;
