export const pkgJson = require('../package.json');

export const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

export const settings = {
	sources: {
		html: ['./src/*.html'],
		handlebars: ['./src/*.hbs'],
		styles: ['./src/assets/less/**/*.less'],
		stylesEntryPoint: './src/assets/less/index.less',
		scripts: ['./src/app/**/*.js'],
		appTemplates: ['./src/app/**/*.html'],
		images: ['./src/assets/img/**/*.{png,jpg,gif,svg}'],
		fonts: ['./src/assets/fonts/**/*'],
		externalCss: pkgJson.bootstrapKickstart.bundleCSS,
		externalJs: pkgJson.bootstrapKickstart.bundleExternalJS,
		staticFiles: pkgJson.bootstrapKickstart.includeStaticFiles
	},
	destinations: {
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
