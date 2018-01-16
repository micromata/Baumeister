const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');
const registerHelpers = require('metalsmith-register-helpers');
const filter = require('metalsmith-filter');

metalsmith(__dirname)
	.source('../src') // Source directory
	.destination('../.metalsmith-build') // Destination directory
	.clean(true) // Clean destination before
	.use(registerHelpers({
		directory: '../src/handlebars/helpers'
	}))
	.use(layouts({ // Wrap layouts around content pages
		engine: 'handlebars',
		rename: false,
		directory: '../src/handlebars/layouts',
		default: 'default.hbs',
		pattern: '*.hbs',
		partials: '../src/handlebars/partials',
		partialExtension: '.hbs'
	}))
	.use(inPlace({ // Render handlebars content pages
		engineOptions: {
			pattern: '*.hbs',
			partials: '../src/handlebars/partials'
		}
	}))
	.use(filter('*.html'))
	.build(error => {
		// Build process
		if (error) console.error(error); // error handling is required
	});
