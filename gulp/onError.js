import notify from 'gulp-notify';

/**
 * Configure notify error reporting.
 * Can be used in tasks.
 */
function onError(err) {
	notify({
		title: 'Gulp Task Error',
		subtitle: 'Plugin: <%= error.plugin %>',
		message: 'Check the console.'
	}).write(err);

	console.error(err.toString());

	this.emit('end');
}

export default onError;
