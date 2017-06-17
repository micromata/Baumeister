import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import {settings} from '../config';
import {isProdBuild} from '../commandLineArgs';
import onError from '../onError';

const stylelintOptions = {
	reporters: [{
		failAfterError: false,
		formatter: 'string',
		console: true
	}],
	syntax: 'scss'
};

/**
 * Lint Sass using StyleLint extending the stylelint-config-standard rule set.
 */
function lintStyles() {
	if (isProdBuild()) {
		return gulp.src(settings.sources.styles)
			.pipe(stylelint({
				...stylelintOptions,
				failAfterError: true
			}));
	}
	return gulp.src(settings.sources.styles)
		.pipe(stylelint(stylelintOptions))
		.on('error', onError);
}

export default lintStyles;
