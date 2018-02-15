const configFile = require('../baumeister.json');

/**
 * Boolean flag to set when using handlebars instead of plain HTML files in `src`.
 */
export const useHandlebars = configFile.useHandlebars;

/**
 * Flag for generating banners on on top of dist files (CSS & JS).
 */
export const generateBanners = configFile.generateBanners;

export const mainDirectories = {
	dev: '../server/',
	prod: '../dist/',
	src: '../src'
};

export const settings = {
	sources: {
		handlebars: './src/handlebars/',
		app: './src/app/',
		appTemplates: {
			directory: './src/app',
			files: '**/*.html'
		},
		assets: './src/assets'
	},
	destinations: {
		handlebars: './.metalsmith-build',
		assets: 'assets',
		appTemplates: 'app',
		vendorFiles: 'assets/vendor'
	}
};
