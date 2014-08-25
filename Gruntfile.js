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
						'releaseMajor'
					],
					descriptions: {
						'watch':
							'Run dev tasks whenever watched files change and ' +
							'Reloads the browser with »LiveReload« plugin.',
						'jsdoc':
							'Generates source documentation using jsdoc.',
						'plato':
							'Generate static code analysis charts with plato.'
					},
					groups: {
						'Dev': ['default', 'dev', 'sync', 'server', 'watch','plato', 'jsdoc'],
						'Production': ['build', 'checkBuild', 'release'],
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
						' * Copyright ©2014 Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */'
			},
			dev : {
				options: {
					sourceMap: true,
				},
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: ['**/*.js', '!**/*min.js'],
					dest: 'assets/js',
					ext: '.min.js',
					extDot: 'first'
				}]
			},
			dist : {
				options: {
					banner: '<%= uglify.options.banner %>\n',
					compress: { drop_console: true },
				},
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: ['**/*.js', '!**/*min.js'],
					dest: 'dist/assets/js',
					ext: '.min.js',
					extDot: 'first'
				}]
			}
		},

		// less
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapFilename: "assets/css/index_raw.css.map",
					sourceMapURL: "index_raw.css.map",
					sourceMapRootpath: "../../"
				},
				files: {
					"assets/css/index_raw.css": "assets/less/index.less"
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
			dist: ['dist', 'server'],
			server: ['server'],
			temp: ['temp'],
		},

		// Local dev server
		connect: {
			dev: {
				options: {
					port: 9000,
					hostname: 'localhost',
					base: 'server',
					open: {
						 target: 'http://<%= connect.dev.options.hostname %>:' +
						 '<%= connect.dev.options.port %>',
					},
				}
			},
			sync: {
				options: {
					port: 9000,
					hostname: 'localhost',
					base: 'server'
				}
			},
			dist: {
				options: {
					port: 9001,
					hostname: 'localhost',
					base: 'dist',
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
			dist: {
				options: {
					keepSpecialComments: 0,
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * m.kuehnel@micromata.de\n' +
						' * Copyright ©2014 Micromata GmbH\n' +
						' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' */'
				},
				files: {
					'dist/assets/css/index.uncss.min.css': ['temp/index.css'],
					'dist/assets/css/index.min.css': ['assets/css/index.css'],
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
					dest: 'dist/assets/img' // Destination path prefix
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
						dest: 'dist/'
					},
				]
			}
		},

		copy: {
			server: {
				expand: true,
				src: [
					'*.html',
					'assets/**/*',
					'libs/bootstrap/dist/js/**/*',
					'libs/bootstrap/js/**/*',
					'libs/bootstrap/fonts/**/*',
					'libs/html5shiv/dist/**/*',
					'libs/jquery/dist/**/*',
					'libs/jquery-placeholder/jquery.placeholder.js',
					'libs/respondJs/dest/**/*',
				],
				dest: 'server/'
			},
			dist: {
				expand: true,
				src: [
					'*.html',
					'assets/css/*.css',
					'assets/fonts/**/*',
					'assets/img/**/*',
					'libs/bootstrap/dist/js/**/*',
					'libs/bootstrap/js/**/*',
					'libs/bootstrap/fonts/**/*',
					'libs/html5shiv/dist/**/*',
					'libs/jquery/dist/**/*',
					'libs/jquery-placeholder/jquery.placeholder.js',
					'libs/respondJs/dest/**/*',
				],
				dest: 'dist/'
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
					destination: 'docs'
				}
			}
		},

		plato: {
			options: {
				 jshint: grunt.file.readJSON('.jshintrc')
			},
			dist: {
				files: {
					'reports/': [
						'assets/js/**/*.js',
						'!assets/js/**/*.min.js',
						'test/**/*.js'
					]
				}
			}
		},

		cacheBust: {
			files: {
				src: ['server/*.html']
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
					src: ['dist/**'],
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
				commit: false,
				commitMessage: 'Bump version number v%VERSION%',
				commitFiles: ['package.json', 'bower.json'],
				createTag: false,
				tagName: '%VERSION%',
				tagMessage: 'Release %VERSION%',
				push: false,
				// pushTo: 'origin',
				// gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},

		changelog: {
			release: {
				options: {
					after: '<%= pkg.version %>',
					dest : 'CHANGELOG.md',
					insertType: 'prepend',
					template: '## Version <%= pkg.version %> ({{date}})\n\n{{> features}}',
					featureRegex: /^(.*)$/gim,
					partials: {
						features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
						feature: '- {{{this}}}\n'
					}
				}
			}
		},

		// watch
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['newer:jshint', 'newer:uglify:dev', 'newer:copy:server'],
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
				tasks: ['newer:less:dev', 'newer:autoprefixer', 'clean:less', 'newer:copy:server'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['*.html'],
				tasks: ['newer:copy:server'],
				options: {
					spawn: false,
				}
			},
			images: {
				files: ['assets/img/**/*.{png,jpg,gif}'],
				tasks: ['newer:copy:server'],
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

	// grunt.registerTask('dev',

	/**
	 * A task for development
	 */
	grunt.registerTask('dev',
		'`grunt dev` will hint your JS, building sources within the ' +
		'assets directory and generating docs / reports.',
		[
			'jshint',
			'uglify:dev',
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
			'clean:server',
			'copy:server',
			'cacheBust',
			'connect:dev',
			'watch'
		]
	);

	// Start browser sync and watching files
	grunt.registerTask('sync',
		'`grunt sync` starts a local dev server, sync browsers and runs `grunt watch`',
		[
			'dev',
			'clean:server',
			'copy:server',
			'cacheBust',
			'connect:sync',
			'browserSync',
			'watch'
		]
	);

	// Default task
	grunt.registerTask(
		'default',
		'Default Task. Just type `grunt` for this one. Calls `grunt dev` first '+
		'and `grunt server` afterwards. Basically the only task you need while ' +
		'developing.',
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
		'jshint',
		'uglify:dist',
		'less:dev',
		'autoprefixer',
		'clean:less',
		'uncss',
		'cssmin',
		'imagemin',
		'processhtml',
		'copy:dist',
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
		['build', 'changelog', 'bump-only:patch', 'compress']
	);
	grunt.registerTask('releaseMinor',
		'`grunt releaseMinor` builds the current sources, bumps version number (0.1.0) and creates zip.files.',
		['build', 'changelog', 'bump-only:minor', 'compress']
	);
	grunt.registerTask('releaseMajor',
		'`grunt releaseMajor` builds the current sources, bumps version number (1.0.0) and creates zip.files.',
		['build', 'changelog', 'bump-only:minor', 'compress']
	);


};
