/**
 * @file Just an example module which could be used to extend the functionality
 * of a Bootstrap module or as an own module which has nothing to do with
 * Bootstraps JavaScript code.
 * @author Michael Kühnel <m.kuehnel@micromata.de>
 */

/**
 * Make sure our global object is available.
 * @namespace kickstarter
 * @todo Rename the global variable throughout the whole file according to your needs.
 * @example
 * yourAppName = window.yourAppName || {};
 * @todo Update documentation after renaming.
 * @ignore
 */
var kickstarter = window.kickstarter || {};

/**
 * Namespace of the module.
 * Aliasing the jQuery Namespace via Self Invoking Anonymous Function.
 * @namespace modulName
 * @memberof kickstarter
 * @param 	{jQuery} $	passing the jQuery object to make $ available even when
 *                    	using jQuery.noConflict()
 */
kickstarter.modulName = (function ($) {
	'use strict';

	/**
	 * Just an example public method that you could call from the global scope.
	 * @memberof kickstarter.modulName
	 * @public
	 * @param {string} message Message to write into the console.
	 * @example
	 * kickstarter.modulName.yourPublicMethod('Hi Public.');
	 */
	var yourPublicMethod = function (message) {
		console.info(message);
	};

	/**
	 * Just an example private method that you only can call from within this
	 * module.
	 * @memberof kickstarter.modulName
	 * @private
	 * @param {string} message Message to write into the console.
	 */
	var _yourPrivateMethod = function (message) {
		console.info(message);
	};

	/**
	 * Executed on DOM ready within the scope of this module.
	 * @event
	 */
	$(function () {
		_yourPrivateMethod('Hi Private.');
	});

	// Return functions to make them accessible from outside.
	return {
		yourPublicMethod: yourPublicMethod
	};

})(jQuery);

/**
 * Executed on DOM ready within the global scope.
 * @event
 */
$(function () {
	'use strict';

	kickstarter.modulName.yourPublicMethod('Hi public.');
});
