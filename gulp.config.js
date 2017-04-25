export const pkgJson = require('./package.json');

export const mainDirectories = {
	dev: './server/',
	dist: './dist/'
};

export const settings = {
	sources: {
		markup: ['./src/*.html'],
		styles: ['./src/assets/less/**/*.less'],
		stylesEntryPoint: './src/assets/less/index.less',
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
	},
	bootlint: {
		stoponerror: true,
		disabledIds: ['W005'],
		reportFn(file, lint, isError, errorLocation) {
			let message = (isError) ? 'ERROR! - ' : 'WARN! - ';
			if (errorLocation) {
				message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
			} else {
				message += file.path + ': ' + lint.id + ' ' + lint.message;
			}
			console.log(message);
		},
		summaryReportFn(file, errorCount, warningCount) {
			if (errorCount > 0 || warningCount > 0) {
				console.log(errorCount + ' errors and ' + warningCount + ' warnings found in ' + file.path);
			} else {
				console.log('No problems found in ' + file.path);
			}
		},
	  htmlmin: {
		  removeComments: true
	  }
};
