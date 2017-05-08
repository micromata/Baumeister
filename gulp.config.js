export const pkgJson = require('./package.json');

export const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

export const settings = {
	sources: {
		markup: ['./src/*.html'],
		styles: ['./src/assets/scss/**/*.scss'],
		stylesEntryPoint: './src/assets/scss/index.scss',
		scripts: ['./src/app/**/*.js'],
		images: ['./src/assets/img/**/*.{png,jpg,gif,svg}'],
		externalCss: pkgJson.bootstrapKickstart.bundleCSS,
		externalJs: pkgJson.bootstrapKickstart.bundleExternalJS,
		staticFiles: pkgJson.bootstrapKickstart.includeStaticFiles
	},
	destinations: {
		dev: {
			markup: `${mainDirectories.dev}`,
			styles: `${mainDirectories.dev}assets/css/`,
			scripts: `${mainDirectories.dev}app/`,
			images: `${mainDirectories.dev}assets/img/`,
			libs: `${mainDirectories.dev}libs/`
		},
		prod: {
			markup: `${mainDirectories.dist}`,
			styles: `${mainDirectories.dist}assets/css/`,
			scripts: `${mainDirectories.dist}app/`,
			images: `${mainDirectories.dist}assets/img/`,
			libs: `${mainDirectories.dist}libs/`
		}
	},
	autoPrefix: {
		browsers: [
			'> 1%',
			'last 3 version',
			'ie 8',
			'ie 9',
			'Firefox ESR',
			'Opera 12.1'
		]
	}
};
