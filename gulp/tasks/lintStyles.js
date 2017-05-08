import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';

/**
 * Lint LESS using StyleLint extending the stylelint-config-standard rule set.
 */
function lintStyles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.styles)
			.pipe(stylelint({
				failAfterError: true,
				reporters: [
					{formatter: 'string', console: true}
				],
				syntax: 'less'
			}));
	}
	return gulp.src(settings.sources.styles)
		.pipe(stylelint({
			reporters: [
				{formatter: 'string', console: true}
			],
			syntax: 'less'
		}));
}

export default lintStyles;
