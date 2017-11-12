import jest from 'jest-cli';

import {args, isProdBuild} from '../command-line-args';
const pkgJson = require('../../package.json');

/**
 * Test task:
 * Run `gulp test`, `gulp test --watch` or `gulp test --production` in CI to
 * make exit with a correct exit code when tests are failing
 */
function test(done) {
	if (args.watch) {
		jest.runCLI({watch: true, config: pkgJson.jest}, '.').then(() => {});
		done();
	}

	jest.runCLI({config: pkgJson.jest}, '.').then(result => {
		if (isProdBuild() && !result.success) {
			return done() && process.exit(1);
		}
		return done();
	});
}
test.description = '`gulp test` runs unit test via Jest CLI';
test.flags = {
	'--production': ' exits with exit code 1 when tests are failing (CI)',
	'-P': ' Alias for --production',
	'--watch': ' runs unit test with Jests native watch option',
	'-W': ' Alias for --watch'
};

export default test;
