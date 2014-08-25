# TODO

## Structure of Assets
* HTML standard templates from http://getbootstrap.com/getting-started/#examples

## Inline documentation ##
* Add example to LESS modules
*	// Variables
	// Mixins
	// Styles

## Grunt
* Increase maintainability of Gruntfile
	* https://github.com/firstandthird/load-grunt-config#example
* Improve Release task
	* Bump version
	* Generate Changelog
	* Tag release in Git
	* Merge to master?
	* Push to origin?
		* https://github.com/rubenv/grunt-git
		* https://github.com/vojtajina/grunt-bump
		* https://github.com/ericmatthys/grunt-changelog
* Production Build
	* Delete JavaScript Sources and Sourcemaps from Production build
	* Delete non minified CSS from Production build
	* Merge JavaScript
	* Define Bootstrap Modules for Production build
	* Add version to »dist« directory
* Check LESS Styleguide Task
