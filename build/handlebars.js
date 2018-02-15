import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import metalsmith from 'metalsmith';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import registerHelpers from 'metalsmith-register-helpers';
import registerPartials from 'metalsmith-discover-partials';
import filter from 'metalsmith-filter';
import globby from 'globby';
import perfy from 'perfy';
import {stripIndents} from 'common-tags';

import {settings, useHandlebars} from './config';

perfy.start('build', false);

if (!useHandlebars) {
	process.exit(0);
}

metalsmith(__dirname)
	// Source directory
	.source('../src')

	// Destination directory
	.destination(path.join(__dirname, '../', settings.destinations.handlebars))

	// Clean destination before
	.clean(true)

	// Register Handlebars helpers
	.use(registerHelpers({
		directory: path.join(__dirname, '../', settings.sources.handlebars, 'helpers')
	}))

	// Register Handlebars partials
	.use(registerPartials({
		directory: path.join(__dirname, '../', settings.sources.handlebars, 'partials'),
		pattern: /\.hbs$/
	}))

	// Wrap layouts around content pages
	.use(layouts({
		directory: path.join(__dirname, '../', settings.sources.handlebars, 'layouts'),
		default: 'default.hbs',
		pattern: '*.hbs'
	}))

	// Render handlebars content pages
	.use(inPlace({
		engineOptions: {
			pattern: '*.hbs',
			partials: path.join(__dirname, '../', settings.sources.handlebars, 'partials')
		}
	}))

	// Only build HTML files
	.use(filter('*.html'))

	// Finally build files
	.build(err => {

		// Handle build errors
		if (err) {
			console.log(stripIndents`
				${logSymbols.error} Handlebars build failed:
				${chalk.red.bold(err.message)}
			`);
			process.exit(1);

		// Handle successful build
		} else {
			/**
			 * NOTE:
			 * We need to backdate the generated files by ten seconds until
			 * https://github.com/webpack/watchpack/issues/25 is fixed.
			 * Otherwise we would have some uneeded rebuilds when starting webpack in
			 * watch mode or starting the webpack dev server.
			 */
			const f = path.resolve(__dirname, '../', settings.destinations.handlebars);
			const now = Date.now() / 1000;
			const then = now - 10;
				globby(f + '/**/*.html')
					.then(files => {
							files.forEach(file => {
								fs.utimes(file, then, then, (err) => {
									if (err) {
										console.error(err);
									}
									console.log(
										logSymbols.success,
										` Finished ${chalk.blue.bold('Handlebars build')} after`,
										chalk.yellow.bold(perfy.end('build').time >= 1 ? `${Math.round(perfy.end('build').time * 100) / 100} s` : `${Math.round(perfy.end('build').milliseconds)} ms`),
										'\n'
									);
									process.exit(0);
								});
							});
					});
		}
	});
