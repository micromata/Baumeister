'use strict';

var getTasks = require('load-grunt-tasks');
var displayTime = require('time-grunt');
var templateHelpers = require('./templates/helpers/helpers.js');

// Define dependencies and it's files with a simple api.
var dependencyConfiguration = require('./dependencyConfiguration.js');
dependencyConfiguration.addDependency('jquery', [
	'dist/jquery.js'
]);
dependencyConfiguration.addDependency('bootstrap', [
	'js/affix.js',
	'js/alert.js',
	'js/button.js',
	'js/carousel.js',
	'js/carousel.js',
	'js/collapse.js',
	'js/dropdown.js',
	'js/modal.js',
	'js/tooltip.js',
	'js/popover.js',
	'js/scrollspy.js',
	'js/tab.js',
	'js/transition.js'
]);

dependencyConfiguration.addDependency('jquery-placeholder', [
	'jquery.placeholder.js'
]);

module.exports = function (grunt) {

	// Get devDependencies
	getTasks(grunt, {
		scope: 'devDependencies'
	});

	// Displays the execution time of grunt tasks
	displayTime(grunt);

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Need a copy to handle release tasks
		pkpCopy: grunt.file.readJSON('package.json'),

		// Configurable paths
		config: {
			dist: 'dist',
			reports: 'reports',
			docs: 'docs',
			server: 'server'
		},

		// List available tasks
		availabletasks: {
			tasks: {
				options: {
					filter: 'include',
					tasks: [
						'default',
						'dev',
						'serve',
						'watch',
						'build',
						'checkBuild',
						'plato',
						'jsdoc',
						'sync',
						'releasePatch',
						'releaseMinor',
						'releaseMajor',
						'lint'
					],
					descriptions: {
						watch:
							'`grunt watch` run dev tasks whenever watched files change and ' +
							'Reloads the browser with »LiveReload« plugin.',
						jsdoc:
							'`grunt jsdoc` generates source documentation using jsdoc.',
						plato:
							'`grunt plato` generates static code analysis charts with plato.'
					},
					groups: {
						Dev: ['default', 'dev', 'sync', 'serve', 'watch', 'plato', 'jsdoc', 'lint'],
						Production: ['build', 'checkBuild', 'releasePatch', 'releaseMinor', 'releaseMajor']
					},
					sort: [
						'default',
						'dev',
						'sync',
						'plato',
						'jsdoc',
						'serve',
						'watch',
						'build',
						'checkBuild',
						'releasePatch',
						'releaseMinor',
						'releaseMajor'
					]
				}
			}
		},

		// ESLint
		eslint: {
			target: [
				'.postinstall.js',
				'templates/helpers/helpers.js',
				'Gruntfile.js',
				'assets/js/*.js'
			]
		},

		// uglify
		uglify: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.author.email %>\n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */',
				sourceMap: true,
				sourceMapIncludeSources: true,
				compress: {
					drop_console: true, // eslint-disable-line camelcase
					drop_debugger: true // eslint-disable-line camelcase
				}
			},
			browserifyOutput: {
				options: {
					sourceMap: false
				},
				files: {
					'<%= config.dist %>/assets/js/built.min.js': [
						'server/assets/js/vendor.js',
						// same as client.js but without sourceMaps
						'server/assets/js/client.min.js'
					]
				}
			},
			npm: {
				options: {
					sourceMap: false,
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.author.email %>\n' +
						' * – Concatenated libs –  \n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */\n'
				},
				files: {
					'<%= config.dist %>/node_modules/libs.min.js': dependencyConfiguration.getDependenciesFileList()
				}
			}
		},

		// less
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'assets/css/index_raw.css.map',
					sourceMapURL: 'index_raw.css.map',
					sourceMapRootpath: '../../'
				},
				files: {
					'assets/css/index_raw.css': 'assets/less/index.less'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'> 1%',
					'last 3 version',
					'ie 8',
					'ie 9',
					'Firefox ESR',
					'Opera 12.1'
				],
				// diff: true, // or 'custom/path/to/file.css.patch',
				map: true
			},
			dev: {
				src: 'assets/css/index_raw.css',
				dest: 'assets/css/index.css'
			}
		},

		clean: {
			less: ['assets/css/index_raw.*'],
			js: ['assets/js/**/*min.js*'],
			dist: ['<%= config.dist %>'],
			server: ['<%= config.server %>'],
			temp: ['temp']
		},

		// Local dev server
		connect: {
			dev: {
				options: {
					port: 9001,
					hostname: 'localhost',
					base: '<%= config.server %>',
					open: {
						target: 'http://<%= connect.dev.options.hostname %>:' +
						'<%= connect.dev.options.port %>'
					}
				}
			},
			sync: {
				options: {
					port: 9001,
					hostname: 'localhost',
					base: '<%= config.server %>'
				}
			},
			dist: {
				options: {
					port: 9002,
					hostname: 'localhost',
					base: '<%= config.dist %>',
					keepalive: true,
					open: {
						target: 'http://<%= connect.dev.options.hostname %>:' +
						'<%= connect.dist.options.port %>'
					}
				}
			}
		},

		uncss: {
			options: {
				ignoreSheets: [/fonts.googleapis/],
				timeout: 2000,
				ignore: [
					/\w\.in/,
					/(#|\.)navbar(\-[a-zA-Z]+)?/,
					/(#|\.)modal(\-[a-zA-Z]+)?/,
					/(#|\.)dropdown(\-[a-zA-Z]+)?/,
					/(#|\.)carousel(\-[a-zA-Z]+)?/,
					/(#|\.)tooltip(\-[a-zA-Z]+)?/,
					/(#|\.)(open)/,
					'.fade',
					'.collapse',
					'.collapsing',
					'.in'
				]
			},
			dist: {
				src: '<%= config.server %>/*.html',
				dest: 'temp/index.css'
			}
		},

		cssmin: {
			assets: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'<%= config.dist %>/assets/css/index.uncss.min.css': ['temp/index.css'],
					'<%= config.dist %>/assets/css/index.min.css': ['assets/css/index.css']
				}
			},
			npm: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'<%= config.dist %>/node_modules/libs.min.css': dependencyConfiguration.getDependenciesFileList('.css')
				}
			}
		},

		usebanner: {
			assets: {
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.author.email %>\n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */'
				},
				files: {
					src: [
						'<%= config.dist %>/assets/css/index.uncss.min.css',
						'<%= config.dist %>/assets/css/index.min.css'
					]
				}
			}
		},

		imagemin: {
			dist: {
				options: {},
				files: [{
					expand: true,
					cwd: 'assets/img',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: '<%= config.dist %>/assets/img'
				}]
			}
		},

		processhtml: {
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'<%= config.server %>/*.html'
						],
						dest: '<%= config.dist %>/'
					}
				]
			}
		},

		copy: {
			dist: {
				expand: true,
				src: [
					'assets/css/*.min.css',
					'assets/fonts/**/*',
					'node_modules/bootstrap/fonts/**/*'
				],
				dest: '<%= config.dist %>/'
			},
			server: {
				expand: true,
				src: [
					'assets/css/**/*',
					// 'assets/js/**/*',
					'assets/fonts/**/*',
					'assets/img/**/*',
					'node_modules/bootstrap/fonts/**/*'
				].concat(dependencyConfiguration.getDependenciesFileList()),
				dest: '<%= config.server %>/'
			},
			handlebars: {
				expand: true,
				src: [
					'*.hbs',
					'templates/*.hbs',
					'partials/**/*.hbs',
					'templates/helpers/helpers.js'
				],
				dest: '<%= config.dist %>/handlebarsSources'
			}
		},
		jsdoc: {
			dist: {
				src: [
					'assets/js/**/*.js',
					'!assets/js/**/*.min.js',
					'test/**/*.js'
				],
				options: {
					destination: '<%= config.docs %>'
				}
			}
		},

		plato: {
			options: {
				jshint: grunt.file.readJSON('.jshintrc')
			},
			dist: {
				files: {
					'<%= config.reports %>': [
						'assets/js/**/*.js',
						'!assets/js/**/*.min.js',
						'test/**/*.js'
					]
				}
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'<%= config.server %>/assets/css/*.css',
						'<%= config.server %>/assets/img/**/*.jpg',
						'<%= config.server %>/assets/img/**/*.png',
						'<%= config.server %>/assets/img/**/*.gif',
						'<%= config.server %>/assets/js/**/*.js',
						'<%= config.server %>/*.html'
					]
				},
				options: {
					proxy:	'<%= connect.dev.options.hostname %>:' +
							'<%= connect.dev.options.port %>',
					watchTask: true
				}
			}
		},

		compress: {
			dist: {
				options: {
					archive: 'dist-v<%= pkg.version %>.zip'
				},
				files: [{
					src: ['<%= config.dist %>/**'],
					dest: './'
				}]
			},
			src: {
				options: {
					archive: 'src-v<%= pkg.version %>.zip'
				},
				files: [
					// includes files in path
					{src: ['./*', '!./*.zip', '!./*.sublime*'], dest: './', filter: 'isFile'},
					// includes files in path and its subdirs
					{src: ['assets/**', '!assets/css/**'], dest: './'}
				]
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['-a'],
				tagName: '%VERSION%',
				tagMessage: 'Release v%VERSION%',
				push: false
			}
		},

		gitadd: {
			task: {
				files: {
					// The following is only needed when your dist directory is under
					// version control. In that case it’s useful to add unknown files to
					// Git when running one of the release tasks.
					// src: ['<%= config.dist %>/**']
				}
			}
		},

		changelog: {
			release: {
				options: {
					fileHeader: '# Changelog',
					logArguments: [
						'--pretty=%h - %ad: %s',
						'--no-merges',
						'--date=short'
					],
					after: '<%= pkpCopy.version %>',
					dest: 'CHANGELOG.md',
					insertType: 'prepend',
					template: '## Version <%= pkg.version %> ({{date}})\n\n{{> features}}',
					featureRegex: /^(.*)$/gim,
					partials: {
						features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
						feature: '- {{{this}}} {{this.date}}\n'
					}
				}
			}
		},

		htmllint: {
			options: {
				ignore: ['Bad value “X-UA-Compatible” for attribute “http-equiv” on XHTML element “meta”.']
			},
			all: ['<%= config.server %>/*.html']
		},

		bootlint: {
			options: {
				stoponerror: true
			},
			files: ['<%= config.server %>/*.html']
		},

		githooks: {
			options: {
				hashbang: '#!/bin/sh',
				template: 'node_modules/grunt-githooks/templates/shell.hb',
				startMarker: '## GRUNT-GITHOOKS START',
				endMarker: '## GRUNT-GITHOOKS END',
				command: 'PATH=' + process.env.PATH + ' grunt',
				args: '--no-color'
			},
			install: {
				'post-merge': 'shell:bowerinstall'
			}
		},

		shell: {
			bowerinstall: {
				command: 'bower install'
			}
		},

		generator: {
			dev: {
				files: [{
					cwd: '.',
					src: ['*.hbs'],
					dest: '<%= config.server %>'
				}],
				options: {
					helpers: templateHelpers,
					partialsGlob: 'partials/**/*.hbs',
					templates: 'templates',
					templateExt: 'hbs',
					defaultTemplate: 'default',
					frontmatterType: 'yaml'
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: ['*.html'],
					dest: '<%= config.dist %>'
				}]
			}
		},

		// watch
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['newer:eslint', 'newer:copy:server', 'newer:browserify:clientDevelopment'],
				options: {
					spawn: false
				}
			},
			otherJsFiles: {
				files: ['Gruntfile.js', '.postinstall.js', 'templates/helpers/helpers.js'],
				tasks: ['eslint'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['assets/less/**/*.less'],
				tasks: ['less:dev', 'autoprefixer', 'clean:less', 'newer:copy:server'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['*.hbs', 'templates/*.hbs', 'partials/*.hbs', 'templates/helpers/helpers.js'],
				tasks: ['generator', 'newer:htmllint', 'newer:bootlint'],
				options: {
					spawn: false
				}
			}
		},

		nsp: {
			package: grunt.file.readJSON('package.json')
		},

		david: {
			all: {
				ignore: ['grunt']
			}
		},

		browserify: {
			vendor: {
				src: [],
				dest: 'server/assets/js/vendor.js',
				options: {
					// maybe we could automize this by using dependencies from package.json
					require: ['react', 'react-dom']
				}
			},
			clientDevelopment: {
				src: ['assets/js/**/*.js'],
				dest: 'server/assets/js/client.js',
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: [
						['babelify', {
							sourceMaps: true,
							presets: ['es2015', 'react']
						}]
					],
					// maybe we could automize this by using dependencies from package.json
					external: ['react', 'react-dom']
				}
			},
			clientProduction: {
				src: ['assets/js/**/*.js'],
				dest: 'server/assets/js/client.min.js',
				options: {
					browserifyOptions: {
						debug: false
					},
					transform: [
						['babelify', {
							sourceMaps: false,
							presets: ['es2015', 'react']
						}]
					],
					// maybe we could automize this by using dependencies from package.json
					external: ['react', 'react-dom']
				}
			}
		}

	});

	// List available Tasks
	grunt.registerTask('tasks',
		'`grunt tasks` shows all tasks which are registered for use.',
		['availabletasks']
	);

	// Lint files
	grunt.registerTask('lint',
		'`grunt lint` lints JavaScript (ESLint) and HTML files (validate and Bootlint)',
		[
			'htmllint',
			'bootlint',
			'eslint'
		]
	);

	/**
	 * A task for development
	 */
	grunt.registerTask('dev',
		'`grunt dev` will lint your files, build sources within the ' +
		'assets directory and generating docs / reports.',
		[
			'clean:server',
			'less:dev',
			'autoprefixer',
			'clean:less',
			'copy:server',
			'browserify:vendor',
			'browserify:clientDevelopment',
			'generator',
			'lint'
		]
	);

	// Start dev server and watching files
	grunt.registerTask('serve',
		'`grunt serve` starts a local dev server and runs `grunt watch`',
		[
			'connect:dev',
			'watch'
		]
	);

	// Alias `grunt server` to `grunt serve` for »backward compatability«.
	grunt.registerTask('server', ['serve']);

	// Start browser sync and watching files
	grunt.registerTask('sync',
		'`grunt sync` starts a local dev server, sync browsers and runs `grunt watch`',
		[
			'dev',
			'connect:sync',
			'browserSync',
			'watch'
		]
	);

	// Default task
	grunt.registerTask(
		'default',
		'Default Task. Just type `grunt` for this one. Calls `grunt dev` first ' +
		'and `grunt server` afterwards.',
		[
			'dev',
			'server'
		]
	);

	/**
	 * A task for your production ready build
	 */
	grunt.registerTask('build',
		'`grunt build` builds production ready sources to dist directory.', [
			'clean:dist',
			'lint',
			// 'uglify:concatenate',
			'less:dev',
			'autoprefixer',
			'clean:less',
			'uncss',
			'cssmin:assets',
			'imagemin',
			'generator',
			'processhtml',
			'htmlmin',
			'browserify:vendor',
			'browserify:clientProduction',
			'copy',
			'uglify:npm',
			'uglify:browserifyOutput',
			'cssmin:npm',
			'usebanner',
			'clean:temp',
			// 'plato',  Doesn't work with es6 per default. Transpile all files to a separate directory or use another plugin!?
			'jsdoc',
			'security'
		]
	);

	// Start server to check production build
	grunt.registerTask('checkBuild',
		'`grunt checkBuild` starts a local server to make it possible to check ' +
		'the build in the browser.',
		['connect:dist']
	);
	// Relase tasks
	grunt.registerTask('releasePatch',
		'`grunt releasePatch` builds the current sources, bumps version number (0.0.1) and creates zip.files.',
		['bump-only:patch', 'build', 'clean:js', 'changelog', 'gitadd', 'bump-commit', 'compress']
	);
	grunt.registerTask('releaseMinor',
		'`grunt releaseMinor` builds the current sources, bumps version number (0.1.0) and creates zip.files.',
		['bump-only:minor', 'build', 'clean:js', 'changelog', 'gitadd', 'bump-commit', 'compress']
	);
	grunt.registerTask('releaseMajor',
		'`grunt releaseMajor` builds the current sources, bumps version number (1.0.0) and creates zip.files.',
		['bump-only:major', 'build', 'clean:js', 'changelog', 'gitadd', 'bump-commit', 'compress']
	);

	// Security checks
	grunt.registerTask('security',
		'`grunt security` checks the node dependencies for known vulnerabilities.',
		['nsp', 'david']
	);
};
