/**
 * Boolean flag to set when using handlebars instead of plain HTML files in `src`.
 */
export const useHandlebars = true;

/**
 * Flag for generating banners on on top of dist files (CSS & JS).
 */
export const generateBanners = false;

export const pkgJson = require('../package.json');

export const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

export const settings = {
	sources: {
		html: ['./src/*.html'],
		handlebars: ['./src/*.hbs'],
		styles: ['./src/assets/scss/**/*.scss'],
		stylesEntryPoint: './src/assets/scss/index.scss',
		scripts: ['./src/app/**/*.js'],
		appTemplates: ['./src/app/**/*.html'],
		images: ['./src/assets/img/**/*.{png,jpg,gif,svg}'],
		fonts: ['./src/assets/fonts/**/*'],
		externalCss: pkgJson.baumeister.bundleCSS,
		externalJs: pkgJson.baumeister.bundleExternalJS,
		staticFiles: pkgJson.baumeister.includeStaticFiles
	},
	destinations: {
		handlebars: './.metalsmith-build',
		dev: {
			html: `${mainDirectories.dev}`,
			styles: `${mainDirectories.dev}assets/css/`,
			app: `${mainDirectories.dev}app/`,
			fonts: `${mainDirectories.dev}assets/fonts/`,
			images: `${mainDirectories.dev}assets/img/`,
			libs: `${mainDirectories.dev}libs/`
		},
		prod: {
			html: `${mainDirectories.dist}`,
			styles: `${mainDirectories.dist}assets/css/`,
			app: `${mainDirectories.dist}app/`,
			fonts: `${mainDirectories.dist}assets/fonts/`,
			images: `${mainDirectories.dist}assets/img/`,
			libs: `${mainDirectories.dist}libs/`
		}
	}
};
