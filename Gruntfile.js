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

		// jsHint
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				jshintrc: '.jshintrc',
				ignores: ['assets/js/*.min.js']
			},
			files: [
				'Gruntfile.js',
				'assets/js/*.js'
			]
		},

		// uglify
		uglify: {
			options: {
				sourceMap: true,
				compress: {
					// drop_console: true
				},
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %>' +
						' - MIT License - ' +
						'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			modules : {
				files: [{
					expand: true,
					cwd: 'assets/js',
					src: ['**/*.js', '!**/*min.js'],
					dest: 'assets/js',
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
			},
			production: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {
					"dist/css/main.min.css": "src/less/main.less"
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 3 version', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1'],
				// diff: true, // or 'custom/path/to/file.css.patch',
				map: true
			},

			index: {
				src: 'assets/css/index_raw.css',
				dest: 'assets/css/index.css'
			}
		},

		clean: {
			js: ["assets/css/index_raw.*"]
		},

		// watch
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['jshint', 'uglify:modules'],
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
				tasks: ['less:dev', 'autoprefixer', 'clean'],
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



	// Define tasks.
	// grunt.registerTask('default', ['copy', 'less', 'uglify', 'imagemin', 'jshint']);

	grunt.registerTask('dev', [
		'jshint',
		'uglify:modules',
		'less:dev',
		'autoprefixer',
		'clean'
	]);

	// Default task
	grunt.registerTask('default', ['dev']);

};
