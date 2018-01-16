import path from 'path';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import metalsmith from 'metalsmith';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import registerHelpers from 'metalsmith-register-helpers';
import filter from 'metalsmith-filter';

import {settings} from './config';

metalsmith(__dirname)
	.source('../src') // Source directory
	.destination(path.join(__dirname, '../', settings.destinations.handlebars)) // Destination directory
	.clean(true) // Clean destination before
	.use(registerHelpers({
		directory: path.join(__dirname, '../', settings.sources.handlebars, 'helpers')
	}))
	.use(layouts({ // Wrap layouts around content pages
		engine: 'handlebars',
		rename: false,
		directory: path.join(__dirname, '../', settings.sources.handlebars, 'layouts'),
		default: 'default.hbs',
		pattern: '*.hbs',
		partials: path.join(__dirname, '../', settings.sources.handlebars, 'partials'),
		partialExtension: '.hbs'
	}))
	.use(inPlace({ // Render handlebars content pages
		engineOptions: {
			pattern: '*.hbs',
			partials: path.join(__dirname, '../', settings.sources.handlebars, 'partials')
		}
	}))
	.use(filter('*.html'))
	.build(error => {
		// Build process
		if (error) {
			console.error(error);
		} else {
			console.log(logSymbols.success, chalk.green(' Handlebars build succeeded'));
		}
	});
