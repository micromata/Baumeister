// JSHint settings
/* jshint camelcase: false, es3: false */

'use strict';

module.exports = function(grunt) {

	// Get devDependencies
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	// Displays the execution time of grunt tasks
	require('time-grunt')(grunt);

	// Config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Need a copy to handle release tasks
		pkpCopy: grunt.file.readJSON('package.json'),

		// Configurable paths
		config: {
			dist: 'dist',
			reports: 'reports',
			docs: 'docs'
		},

		// List available tasks
		availabletasks: {
			tasks: {
				options: {
					filter: 'include',
					tasks: [
						'default',
						'dev',
						'server',
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
						'watch':
							'`grunt watch` run dev tasks whenever watched files change and ' +
							'Reloads the browser with »LiveReload« plugin.',
						'jsdoc':
							'`grunt jsdoc` generates source documentation using jsdoc.',
						'plato':
							'`grunt plato` generates static code analysis charts with plato.'
					},
					groups: {
						'Dev': ['default', 'dev', 'sync', 'server', 'watch','plato', 'jsdoc', 'lint'],
						'Production': ['build', 'checkBuild', 'releasePatch', 'releaseMinor', 'releaseMajor'],
					},
					sort: [
						'default',
						'dev',
						'sync',
						'plato',
						'jsdoc',
						'server',
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

		// jsHint
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				jshintrc: '.jshintrc',
				ignores: ['assets/js/*.min.js']
			},
			all: [
				'Gruntfile.js',
				'assets/js/*.js'
			]
		},

		// uglify
		uglify: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * m.kuehnel@micromata.de\n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */',
				sourceMap: true,
				sourceMapIncludeSources: true,
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			},
			minify: {
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: ['**/*.js'],
					dest: '<%= config.dist %>/assets/js',
					ext: '.min.js',
					extDot: 'last'
				}]
			},
			concatenate: {
				files: {
					'<%= config.dist %>/assets/js/built.min.js': ['assets/js/**/*.js']
				}
			},
			bower: {
				options: {
					sourceMap: false,
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * m.kuehnel@micromata.de\n' +
						' * – Contatenated libs –  \n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */\n',
				},
				files: {
					'<%= config.dist %>/libs/libs.js': ['<%= config.dist %>/libs/libs.js']
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
			temp: ['temp'],
		},

		// Local dev server
		connect: {
			dev: {
				options: {
					port: 9001,
					hostname: 'localhost',
					open: {
						 target: 'http://<%= connect.dev.options.hostname %>:' +
						 '<%= connect.dev.options.port %>',
					},
				}
			},
			sync: {
				options: {
					port: 9001,
					hostname: 'localhost',
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
						 '<%= connect.dist.options.port %>',
					},
				}
			}
		},

		uncss: {
			options: {
				ignoreSheets: [/fonts.googleapis/],
			},
			dist: {
				src: '*.html',
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
					'<%= config.dist %>/assets/css/index.min.css': ['assets/css/index.css'],
				}
			},
			bower: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'<%= config.dist %>/libs/libs.css': ['<%= config.dist %>/libs/libs.css']
				}
			}
		},

		usebanner: {
			assets: {
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * m.kuehnel@micromata.de\n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */'
				},
				files: {
					src: [
						'<%= config.dist %>/assets/css/index.uncss.min.css',
						'<%= config.dist %>/assets/css/index.min.css'
					]
				}
			},
			bower: {
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * m.kuehnel@micromata.de\n' +
						' * – Contatenated libs –  \n' +
						' * Copyright ©<%= grunt.template.today("yyyy") %> Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */'
				},
				files: {
					src: ['<%= config.dist %>/libs/libs.css']
				}
			}
		},

		imagemin: {
			dist: {
				options: {},
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'assets/img', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest: '<%= config.dist %>/assets/img' // Destination path prefix
				}]
			}
		},

		processhtml: {
			dist: {
				files: [
					{
						expand: true,
						src: [
							'*.html'
						],
						dest: '<%= config.dist %>/'
					},
				]
			}
		},

		copy: {
			assets: {
				expand: true,
				src: [
					'assets/css/*.min.css',
					'assets/fonts/**/*',
					'assets/img/**/*',
					// Bower libs needed for oldIEs. The rest is concatenated via the bower_concat task.
					'libs/html5shiv/dist/html5shiv-printshiv.min.js',
					'libs/respondJs/dest/respond.min.js',
				],
				dest: '<%= config.dist %>/'
			},
		},

		bower_concat: {
			dist: {
				// These are minified afterwards with `cssmin:bower` and `uglify:bower`.
				// Because Chrome Dev Tools will throw an 404 regarding the missing sourcemaps if
				// we use the already minified versions. Yep, that’s ugly.
				dest: '<%= config.dist %>/libs/libs.js',
				cssDest: '<%= config.dist %>/libs/libs.css',
				include: [
					'jquery',
					'bootstrap',
					'jquery-placeholder'
				],
				mainFiles: {
					'jquery': ['dist/jquery.js'],
					'bootstrap': ['dist/js/bootstrap.js']
				}
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
						'assets/css/*.css',
						'assets/img/**/*.jpg',
						'assets/img/**/*.png',
						'assets/img/**/*.gif',
						'assets/js/**/*.js',
						'*.html'
					]
				},
				options: {
					proxy:	'<%= connect.dev.options.hostname %>:' +
							'<%= connect.dev.options.port %>',
					watchTask: true,
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
					{src: ['./*', '!./*.zip', '!./*.sublime*',], dest: './', filter: 'isFile'}, // includes files in path
					{src: ['assets/**', '!assets/css/**'], dest: './'}, // includes files in path and its subdirs
				]
			}
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ['pkg'],
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json', 'bower.json', 'CHANGELOG.md'],
				tagName: '%VERSION%',
				tagMessage: 'Release v%VERSION%',
				push: false,
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
					dest : 'CHANGELOG.md',
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
			all: ['*.html']
		},

		bootlint: {
			options: {
				stoponerror: true
			},
			files: ['*.html']
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

		// watch
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['newer:jshint'],
				options: {
					spawn: false
				}
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['assets/less/**/*.less'],
				tasks: ['less:dev', 'autoprefixer', 'clean:less'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['*.html'],
				tasks: ['newer:htmllint', 'newer:bootlint'],
				options: {
					spawn: false,
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
		'`grunt lint` lints JavasScript (JSHint) and HTML files (validate and Bootlint)',
		[
			'htmllint',
			'bootlint',
			'jshint'
		]
	);

	/**
	 * A task for development
	 */
	grunt.registerTask('dev',
		'`grunt dev` will hint your files, build sources within the ' +
		'assets directory and generating docs / reports.',
		[
			'lint',
			'less:dev',
			'autoprefixer',
			'clean:less',
			'plato',
			'jsdoc',
		]
	);

	// Start dev server and watching files
	grunt.registerTask('server',
		'`grunt server` starts a local dev server and runs `grunt watch`',
		[
			'connect:dev',
			'watch'
		]
	);

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
		'Default Task. Just type `grunt` for this one. Calls `grunt dev` first '+
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
		'uglify:minify',
		'uglify:concatenate',
		'less:dev',
		'autoprefixer',
		'clean:less',
		'uncss',
		'cssmin:assets',
		'imagemin',
		'processhtml',
		'copy',
		'bower_concat',
		'uglify:bower',
		'cssmin:bower',
		'usebanner',
		'clean:temp',
		'plato',
		'jsdoc'
	]);

	// Start server to check production build
	grunt.registerTask('checkBuild',
		'`grunt checkBuild` starts a local server to make it possible to check '+
		'the build in the browser.',
		['connect:dist']
	);

	// Relase tasks
	grunt.registerTask('releasePatch',
		'`grunt releasePatch` builds the current sources, bumps version number (0.0.1) and creates zip.files.',
		['bump-only:patch', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
	);
	grunt.registerTask('releaseMinor',
		'`grunt releaseMinor` builds the current sources, bumps version number (0.1.0) and creates zip.files.',
		['bump-only:minor', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
	);
	grunt.registerTask('releaseMajor',
		'`grunt releaseMajor` builds the current sources, bumps version number (1.0.0) and creates zip.files.',
		['bump-only:major', 'build', 'clean:js', 'changelog', 'bump-commit', 'compress']
	);

};
