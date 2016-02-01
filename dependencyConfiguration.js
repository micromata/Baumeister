var _dependencyBasePath = 'node_modules/'
var _dependencies = [];

/**
 * Flatten an array. i.e. [['a'], ['b']] => ['a', 'b']
 * @param  {array} arr an array of arrays
 * @return {[type]}     returns an array with one dimension
 */
var _flattenArray = function(arr) {
	return arr.reduce(function (left, right) {
		return left.concat(right);
	}, []);
};

/**
 * Checks, if a string ends with a specific suffix
 * @param  {string} text   source string to check
 * @param  {string} suffix suffix, i.e. '.js'
 * @return {boolean}	Returns true, if the string ends with the suffix
 */
var _stringEndsWith = function(text, suffix) {
	return text.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**
 * Returns the absolute path for one file of a dependency
 * @param  {string} name dependency name
 * @param  {string} file file path relative to the dependency directory inside node_modules.
 * @return {string} The absolute filepath for one file of a dependency
 */
var _getAbsoluteDependencyPath = function(name, filePath) {
	return _dependencyBasePath + name + '/' + filePath;
};

/**
 * Returns all dependencies with name and associated files (absolute filepath starting with node_modules)
 * @return {array} List of all dependencies with associated files.
 */
var _getAllDependenciesWithAbsolutPath = function () {
	return _dependencies.map(function(dependency) {
		return {
			name: dependency.name,
			files: dependency.files.map(function(file) {
				return _getAbsoluteDependencyPath(dependency.name, file);
			})
		}
	});
};

/**
 * Adds a dependency to the list of known dependencies
 * @param {string} name Name of the dependency
 * @param {array} files which belong to the dependency.
 */
var _addDependency = function(name, files) {
	_dependencies.push({
		name: name,
		files: files
	});
};

/**
 * Returns a list of file paths of all dependencies
 * @param  {string} fileType It's optinal and the default fileType is '.js'. It's possible to filter the list of files by a specific fileType.
 * @return {array} A list of file paths of all dependencies
 */
var _getDependenciesFileList = function(fileType) {
	fileType = fileType || '.js';

	var dependenciesWithAbsolutePath = _getAllDependenciesWithAbsolutPath();
	var fileList = dependenciesWithAbsolutePath.map(function (dependency) {
		return dependency.files;
	});
	fileList = _flattenArray(fileList);

	fileList= fileList.filter(function(file) {
		return _stringEndsWith(file, fileType)
	});
	return fileList;
};

module.exports = {
	addDependency: _addDependency,
	getDependenciesFileList: _getDependenciesFileList
};
