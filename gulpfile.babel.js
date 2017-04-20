import gulp from 'gulp';
// Style processing
import less from 'gulp-less';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import Autoprefix from 'less-plugin-autoprefix';
// Util
import rename from 'gulp-rename';
import del from 'del';

const isProdBuild = () => process.argv.filter(val => val.toLowerCase().indexOf('-prod') !== -1).length > 0;

const sources = {
	styles: './src/assets/less/index.less',
	scripts: '',
	images: ''
};

const destinations = {
	dev: {
		styles: './server/assets/css/',
		scripts: '',
		images: ''
	},
	prod: {
		styles: './dist/assets/css',
		scripts: '',
		images: ''
	}
};

export function clean() {
	if (isProdBuild()) {
		return del(['dist']);
	} else {
		return del(['server']);
	}
}

export function styles() {
	if (isProdBuild()) {
		return gulp.src(sources.styles)
			.pipe(less({
				plugins: [new Autoprefix()]
			}))
			.pipe(cleanCss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(destinations.prod.styles));
	}
	return gulp.src(sources.styles)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [new Autoprefix()]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destinations.dev.styles));
}
