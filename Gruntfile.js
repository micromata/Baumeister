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
						'jsdoc'
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
						'Dev': ['default', 'dev', 'server', 'watch','plato', 'jsdoc'],
						'Production': ['build', 'checkBuild'],
					},
					sort: [
						'default',
						'dev',
						'plato',
						'jsdoc',
						'server',
						'watch',
						'build',
						'checkBuild',
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
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>' +
						' - <%= pkg.license %> License - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
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
			build : {
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
			less: ["assets/css/index_raw.*"],
			dist: ["dist"],
			temp: ["temp"],
		},

		// Local dev server
		connect: {
			dev: {
				options: {
					port: 9000,
					hostname: 'localhost',
					open: {
						 target: 'http://<%= connect.dev.options.hostname %>:' +
						 '<%= connect.dev.options.port %>/assets',
					},
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
						 '<%= connect.dist.options.port %>/assets',
					},
				}
			}
		},

		uncss: {
			options: {
				ignoreSheets: [/fonts.googleapis/],
			},
			dist: {
				src: 'assets/*.html',
				dest: 'temp/index.css'
			}
		},

		cssmin: {
			dist: {
				options: {
					keepSpecialComments: 0,
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>' +
						' - <%= pkg.license %> License - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
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
				// files: {
				// 	'dist/assets/index.html': ['assets/index.html'],
				// }
				files: [
					{
						expand: true,
						src: [
							'assets/*.html'
						],
						dest: 'dist/'
					},
				]
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						src: [
							'assets/css/*.css',
							'assets/fonts/**',
							'libs/bootstrap/dist/js/*.js',
							'libs/bootstrap/js/*.js',
							'libs/jquery/dist/*'
						],
						dest: 'dist/'
					},
				]
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
			options: {
				ignorePatterns: ['libs']
			},
			files: {
				src: ['assets/*.html']
			}
		},

		// watch
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['jshint', 'uglify:dev'/*, 'plato'*//*, 'jsdoc'*/],
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
				files: ['assets/**/*.html'],
				options: {
					spawn: false,
				}
			},
			images: {
				files: ['assets/img/**/*.{png,jpg,gif}'],
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
			'cacheBust',
			'jsdoc',
		]
	);

	// Start dev server and watching files
	grunt.registerTask('server',
		'`grunt server` starts a local dev server and fires `grunt watch`',
		[
			'connect:dev',
			'watch'
		]
	);

	// Default task
	grunt.registerTask(
		'default',
		'Default Task. Just type `grunt` for this one. Calls `grunt dev` first '+
		'and `grunt server` afterwards. Bascically the only task you need while ' +
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
		'uglify:build',
		'less:dev',
		'autoprefixer',
		'clean:less',
		'uncss',
		'cssmin',
		'imagemin',
		'processhtml',
		'copy',
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


};
