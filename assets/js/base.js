/**
 * @file  Base JavaScript needed independent of the project
 * @author Michael Kühnel <m.kuehnel@micromata.de>
 * @author Nicolai Süper <n.sueper@micromata.de>
 */

/**
 * Fix viewport issues with IE 10.
 * @see {@link http://getbootstrap.com/getting-started/#support-ie10-width}
 * @private
 */
function ieViewportFix() {
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		let msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
				'@-ms-viewport{width:auto!important}'
			)
		);
		document.querySelector('head').appendChild(msViewportStyle);
	}
}

/**
 * Avoid `console` errors in browsers that lack a console.
 * @see {@link https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js}
 * @private
 */
function consoleErrorFix() {
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
	const console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noOp;
		}
	}
}

export default function () {
	ieViewportFix();
	consoleErrorFix();
}
