// const configFile = require('../baumeister.json');

/**
 * Boolean flag to set when using handlebars instead of plain HTML files in `src`.
 */
// export const useHandlebars = configFile.useHandlebars;

/**
 * Flag for generating banners on on top of dist files (CSS & JS).
 */
// export const generateBanners = configFile.generateBanners;

export const mainDirectories = {
	dev: '../server/',
	prod: '../dist/',
	src: '../src'
};

export const settings = {
	sources: {
		// html: ['./src/*.html'],
		handlebars: './src/handlebars/',
		// styles: ['./src/assets/scss/**/*.scss'],
		// stylesEntryPoint: './src/assets/scss/index.scss',
		app: './src/app/',
		// scripts: ['./src/app/**/*.js'],
		// appTemplates: ['./src/app/**/*.html'],
		images: './src/assets/img',
		fonts: './src/assets/fonts'
		// externalCss: configFile.bundleCSS,
		// staticFiles: configFile.includeStaticFiles
	},
	destinations: {
		handlebars: './.metalsmith-build',
		fonts: 'assets/fonts',
		images: 'assets/img',
		dev: {
			// html: `${mainDirectories.dev}`,
			// styles: `${mainDirectories.dev}assets/css/`,
			// app: `${mainDirectories.dev}app/`,
			// libs: `${mainDirectories.dev}libs/`
		},
		prod: {
			// html: `${mainDirectories.prod}`,
			// styles: `${mainDirectories.prod}assets/css/`,
			// app: `${mainDirectories.prod}app/`,
			// libs: `${mainDirectories.prod}libs/`
		}
	}
};
