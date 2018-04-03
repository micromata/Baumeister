import chalk from 'chalk';
import minimist from 'minimist';
import {stripIndents} from 'common-tags';

import {isDevMode} from './webpack/helpers';
import {devServer} from './webpack/config.dev-server';
import {entry} from './webpack/config.entry';
import {rules} from './webpack/config.module.rules';
import {output} from './webpack/config.output';
import {plugins} from './webpack/config.plugins';
import {optimization} from './webpack/config.optimization';
import {stats} from './webpack/config.stats';

const cliFlags = minimist(process.argv.slice(2));
const buildTarget = isDevMode() ? ' Development ' : ' Production ';

if (!cliFlags.json) {
	console.log(chalk.yellow(stripIndents`Build target: ${chalk.bold.inverse(buildTarget)}
	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
}

module.exports = {
	devServer,
	entry,
	module: {rules},
	output,
	plugins,
	optimization,
	mode: isDevMode() ? 'development' : 'production',
	stats
};
