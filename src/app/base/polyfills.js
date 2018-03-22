/**
 * This file includes polyfills which you may need.
 * Please only add those you are actually using. Otherwise you’ll unnecessarily
 * blow up the size of your JS bundle.
 *
 * You can add your own additional polyfills to this file:
 * See https://github.com/zloirock/core-js to see whats available.
 *
 * Check what your target browsers need (https://kangax.github.io/compat-table/es6/)
 * and use dynamic imports like in the examples below. This way the polyfills
 * are lazy loaded only when a browser actually needs them.
 */

/**
 * ----------------------------------------------------------------------------
 * Promises. Mainly needed for Internet Explorer up to IE11
 * -----------------------------------------------------------------------------
 * Promises are needed to lazy load addtional polyfills in case they are
 * needed. We are using https://github.com/taylorhakes/promise-polyfill instead
 * of the polyfill provided by core-js to keep the vendor bundle as small as
 * possible. This one adds 3.19 kB minified and 1.23 kB minified and gzipped.
 *
 * But remember that you don’t have to use it if your are targeting only
 * browsers which have Promises build in.
 * See https://kangax.github.io/compat-table/es6/
 */
import 'promise-polyfill/src/polyfill';

/**
 * ----------------------------------------------------------------------------
 * Definition of dynamically imported polyfills
 * -----------------------------------------------------------------------------
 */

export const applyPolyfills = () => {

	const polyfills = [];

	/**
	 * Globals
	 */

	// if (typeof Object.assign !== 'function') {
	// 	polyfills.push(import(/* webpackChunkName: "Object.assign" */ 'core-js/fn/object/assign'));
	// }

	// if (!window.Set) {
	// 	polyfills.push(import(/* webpackChunkName: "set" */ 'core-js/es6/set'));
	// }

	// if (!window.Map) {
	// 	polyfills.push(import(/* webpackChunkName: "map" */ 'core-js/es6/map'));
	// }

	/**
	 * Array prototype methods
	 */

	// if (!Array.prototype.includes) {
	// 	polyfills.push(import(/* webpackChunkName: "Array.prototype.includes" */ 'core-js/fn/array/includes'));
	// }

	// if (!Array.prototype.find) {
	// 	polyfills.push(import(/* webpackChunkName: "Array.prototype.find" */ 'core-js/fn/array/find'));
	// }

	/**
	 * String prototype methods
	 */

	// if (!String.prototype.includes) {
	// 	polyfills.push(import(/* webpackChunkName: "String.prototype.includes" */ 'core-js/fn/string/includes'));
	// }

	// if (!String.prototype.startsWith) {
	// 	polyfills.push(import(/* webpackChunkName: "String.prototype.startsWith" */ 'core-js/fn/string/starts-with'));
	// }

	// if (!String.prototype.trimStart) {
	// 	polyfills.push(import(/* webpackChunkName: "String.prototype.trimStart" */ 'core-js/fn/string/trim-start'));
	// }

	// if (!String.prototype.trimEnd) {
	// 	polyfills.push(import(/* webpackChunkName: "String.prototype.trimEnd" */ 'core-js/fn/string/trim-end'));
	// }

	return Promise.all(polyfills);
};
