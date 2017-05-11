const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');

metalsmith(__dirname)
.source('../src')
.destination('../build')
.clean(true) // Clean destination before build
.ignore(['app', 'assets', 'handlebars']) // Ignore other files than handlebars template
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
		partials: '../src/handlebars/partials',
		outputFormat: 'hbs'
	}
}))
.build((error) => { // Build process
	if (error) {
		console.error(error); // Error handling is required
	}
});
