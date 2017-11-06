# Gulp Workflow and tasks

When completed the setup, you'll be able to run the various Gulp tasks provided from the command line.

Just type the following to get an overview about the available Tasks:

	gulp --tasks

This will give you the main Gulp tasks which are ready for you to be fired from the terminal.:

````
Tasks for ~/Documents/Projects/baumeister/gulpfile.babel.js
├── build                 `gulp build` is the main build task
│   --production          … builds for production to `dist` directory.
│   -P                    … Alias for --production
├── default               `gulp` will build, serve, watch for changes and reload server
├── lint                  `gulp lint` lints JavaScript via ESLint
├── release               `gulp release` builds the current sources and bumps version number
│   --bump major          … major release (1.0.0). See http://semver.org
│   --bump minor          … minor release (0.1.0). See http://semver.org
│   --bump patch          … patch release (0.0.1). See http://semver.org
│   -B major|minor|patch  … alias to --bump
├── serve                 `gulp serve` serves the build (`server` directory)
│   --production          … serves production build (`dist` directory)
│   -P                    … Alias for --production
├── test                  `gulp test` runs unit test via Jest CLI
│   --production          … exits with exit code 1 when tests are failing (CI)
│   --watch               … runs unit test with Jests native watch option
│   -P                    … Alias for --production
│   -W                    … Alias for --watch
└── watch                 `gulp watch` watches for changes and runs tasks automatically
````
Running those tasks will create a bunch of directories and files which aren’t under version control. So don’t wonder when the following resources are created after setting up and working with the project:

````
myProject
├──.browserify-cache-client.json    → Browserify cache file
├──.browserify-cache-vendor.json    → Browserify cache file
├──.metalsmith-build                → Compiled handlebars sources
├── dist                            → Contains the files ready for production
│   ├── app
│   ├── assets
│   └── libs                        → Relevant files copied from /node_modules
├── coverage                        → Test coverage reports
├── node_modules/                   → Dependencies installed by npm
├── server                          → Contains the files for the development server
│   ├── app
│   ├── assets
│   └── libs                        → Relevant files copied from /node_modules
└── src
    └── assets
        └── css                     → Transpiled and autoprefixed from Sass files
````

See `/gulpfile.babel.js` to see what happens in Details.
