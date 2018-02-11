import gulp from 'gulp';
import frontmatter from 'gulp-front-matter';
import gulpsmith from 'gulpsmith';

const layouts = require('metalsmith-layouts');
const inPlace = require('metalsmith-in-place');
const registerHelpers = require('metalsmith-register-helpers');
const registerPartials = require('metalsmith-discover-partials');

import {settings, useHandlebars} from '../config';

/**
 * HTML validation using the Nu HTML Checker
 */
function handlebars(done) {

	if (!useHandlebars) return done();

	return gulp.src(settings.sources.handlebars)
		.pipe(frontmatter()).on('data', (file) => {
			Object.assign(file, file.frontMatter);
			delete file.frontMatter;
		})

		.pipe(gulpsmith()
			.use(registerHelpers({
				directory: 'src/handlebars/helpers'
			}))
			.use(registerPartials({
				directory: 'src/handlebars/partials',
				pattern: /\.hbs$/
			}))
			.use(layouts({ // Wrap layouts around content pages
				directory: 'src/handlebars/layouts',
				default: 'default.hbs',
				pattern: '*.hbs'
			}))
			.use(inPlace({ // Render handlebars content pages
				engineOptions: {
					pattern: '*.hbs',
					partials: 'src/handlebars/partials'
				}
			})))
		.pipe(gulp.dest(settings.destinations.handlebars));
}

export default handlebars;
