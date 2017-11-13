import git from 'gulp-git';

import onError from '../on-error';
const pkgJson = require('../../package.json');

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
