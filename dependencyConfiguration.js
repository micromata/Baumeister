var _dependencyBasePath = 'node_modules/'
var _dependencies = [];

var _flattenArray = function(arr) {
	return arr.reduce(function (left, right) {
		return left.concat(right);
	}, []);
};

var _stringEndsWith = function(text, suffix) {
	return text.indexOf(suffix, this.length - suffix.length) !== -1;
};

var _addDependency = function(name, files) {
	_dependencies.push({
		name: name,
		files: files
	});
};

var _getFullDependencyPath = function(name, file) {
	return _dependencyBasePath + name + '/' + file;
};

var _getAllDependenciesWithAbsolutPath = function () {
	return _dependencies.map(function(dependency) {
		return {
			name: dependency.name,
			files: dependency.files.map(function(file) {
				return _getFullDependencyPath(dependency.name, file);
			})
		}
	});
};

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
