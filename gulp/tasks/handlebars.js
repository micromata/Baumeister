import gulp from 'gulp';
import frontmatter from 'gulp-front-matter';
import gulpsmith from 'gulpsmith';

const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');
const registerHelpers = require('metalsmith-register-helpers');

import {settings} from '../config';

/**
 * HTML validation using the Nu HTML Checker
 */
function handlebars() {

	return gulp.src(settings.sources.handlebars)
		.pipe(frontmatter()).on('data', (file) => {
			Object.assign(file, file.frontMatter);
			delete file.frontMatter;
		})

		.pipe(gulpsmith()
			.use(registerHelpers({
				directory: 'src/handlebars/helpers'
			}))
			.use(layouts({ // Wrap layouts around content pages
				engine: 'handlebars',
				rename: false,
				directory: 'src/handlebars/layouts',
				default: 'default.hbs',
				pattern: '*.hbs',
				partials: 'src/handlebars/partials',
				partialExtension: '.hbs'
			}))
			.use(inPlace({ // Render handlebars content pages
				engineOptions: {
					pattern: '*.hbs',
					partials: 'src/handlebars/partials'
				}
			}))
		)
		.pipe(gulp.dest('./_gulpsmith'));
}

export default handlebars;
