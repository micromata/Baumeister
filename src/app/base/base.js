/**
 * @file  Base JavaScript needed independent of the project
 */

/**
 * Fix viewport issues with IE 10.
 * @see {@link http://getbootstrap.com/getting-started/#support-ie10-width}
 */
export function ieViewportFix() {
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		const msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
		document.querySelector('head').appendChild(msViewportStyle);
	}
}

/**
 * Avoid `console` errors in browsers that lack a console.
 * @see {@link https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js}
 */
export function consoleErrorFix() {
	let method;
	const noOp = function () {
	};
	const methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	let length = methods.length;
	const console = window.console || {};

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noOp;
		}
	}
}

/**
 * Needed to perform a dummy import until this webpack 4 error with dynamic imports is fixed:
 * https://github.com/webpack/webpack/issues/6587
 */
import(/* webpackChunkName: "noop" */ './dummy').then(() => {});

/**
 * Thanks to tree shaking this won’t land in the production build 🌳
 */
export function testTreeshaking() {
	window.theTreeIsShaked = 'shakedy-shake';
}
