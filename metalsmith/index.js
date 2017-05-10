const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');

metalsmith(__dirname)
.source('../src') // Source directory
.destination('../build') // Destination directory
.clean(true) // Clean destination before
.ignore(['app', 'assets', 'layouts']) // Ignore other files than handlebars template
.use(layouts({ // Wrap layouts around html
	engine: 'handlebars', // Use the layout engine you like
	rename: true,
	directory: '../src/layouts',
	default: 'default.hbs',
	pattern: '**/*.hbs',
	partialExtension: '.hbs'
})).build((error) => { // Build process
	if (error) {
		console.error(error); // Error handling is required
	}
});
