/**
 * This file includes polyfills which you may need.
 * Please only add those you are actually using. Otherwise you’ll unnecessarily
 * blow up the size of your JS bundle.
 *
 * You can add your own extra polyfills to this file:
 * Check https://github.com/zloirock/core-js to see whats available.
 *
 */

/**
  * ----------------------------------------------------------------------------
  * Import each and every polyfill provided by core-js
  * -----------------------------------------------------------------------------
  * This is for the lazy ones and absolultely not recommended because it will
  * increase your JS bundle by more than 120 kb (minified). Better check what
  * your target browsers need (https://kangax.github.io/compat-table/es6/)
  * and use partial imports like in the examples below.
  */
// import 'core-js';

/**
 * ----------------------------------------------------------------------------
 * Promises. Needed for Internet Explorer  up to IE11
 * -----------------------------------------------------------------------------
 * This polyfill alone will blow up your bundle size with more than 20 kb
 * (minified). So please  don’t use that if your are targeting only browsers
 * which have Promises build in. See https://kangax.github.io/compat-table/es6/
 */
import 'core-js/es6/promise';

/**
 * ----------------------------------------------------------------------------
 * Additional ES6 polyfills
 * -----------------------------------------------------------------------------
 */

/**
 * Import all object methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-object how to import
 * just the ones you need.
 */
// import 'core-js/es6/object';

/**
 * Import all function methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-function how to import
 * just the ones you need.
 */
// import 'core-js/es6/function';

/**
 * Import all array methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-array how to import
 * just the ones you need.
 */
// import 'core-js/es6/array';

/**
 * Import all string methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-string how to import
 * just the ones you need.
 */
// import 'core-js/es6/string';

/**
 * Import all regexp methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-regexp how to import
 * just the ones you need.
 */
// import 'core-js/es6/regexp';

/**
 * Import all number methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-number how to import
 * just the ones you need.
 */
// import 'core-js/es6/number';

/**
 * Import all math methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-math how to import
 * just the ones you need.
 */
// import 'core-js/es6/math';

/**
 * Import all date methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-date how to import
 * just the ones you need.
 */
// import 'core-js/es6/date';

/**
 * Import all collection types.
 * See https://github.com/zloirock/core-js#ecmascript-6-collections.
 */
// import 'core-js/es6/map';
// import 'core-js/es6/set';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/weak-set';

/**
 * Import all typed-array methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-typed-arrays how to import
 * just the ones you need.
 */
// import 'core-js/es6/typed';

/**
 * Import all reflect methods.
 * See https://github.com/zloirock/core-js#ecmascript-6-reflect how to import
 * just the ones you need.
 */
// import 'core-js/es6/reflect';

/**
 * ----------------------------------------------------------------------------
 * Additional ES7+ polyfills
 * -----------------------------------------------------------------------------
 */

/**
 * Import all ES7 polyfills,
 * See https://github.com/zloirock/core-js#ecmascript-7-proposals how to import
 * just the ones you need.
 */
// import 'core-js/es7';

/**
 * Import all polyfills of stage 4 proposals
 */
// import 'core-js/stage/4';

/**
 * Import all polyfills of stage 3 proposals
 * See https://github.com/zloirock/core-js#ecmascript-7-proposals how to import
 * pre stage 3 polyfills.
 */
// import 'core-js/stage/3';

/**
 * ----------------------------------------------------------------------------
 * Examples for method based imports
 * -----------------------------------------------------------------------------
 */

/**
 * Import a single string method
 */
// import 'core-js/fn/string/trim-start';

/**
 * Import a single array method
 */
// import 'core-js/fn/array/includes';
