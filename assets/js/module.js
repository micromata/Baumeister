/**
 * @file Manages the extended funtionality of the main tabs of the application.
 * @author Michael Kühnel m.kuehnel@micromata.de>
 */


/**
 * Make sure our global object is available.
 * @namespace yourAppName
 * @ignore
 */
var yourAppName = window.yourAppName || {};

/**
 * Namespace of our module.
 * Aliasing the jQuery Namespace via Self Invoking Anonymous Function.
 * @namespace modulName
 * @memberof yourAppName
 * @param 	{jQuery} $	passing the jQuery object to make $ available even when
 *                    	using jQuery.noConflict()
 */
yourAppName.modulName = (function($) {
	'use strict';

	/**
	 * Just an example public method that you could call from the global scope.
	 * @memberof yourAppName.modulName
	 * @public
	 * @param {string} message Message to write into the console.
	 */
	var yourPublicMethod = function(message) {
		console.info(message);
	};

	/**
	 * Just an example private method that you only can call from within this
	 * module.
	 * @memberof yourAppName.modulName
	 * @private
	 * @param {string} message Message to write into the console.
	 */
	var _yourPrivateMethod = function(message) {
		console.info(message);
	};

	/**
	 * Executed on DOM ready within the scope of this module.
	 * @event
	 */
	$(function() {
		_yourPrivateMethod('Hi Private.');
	});

	// Return functions to make them accessible from outside.
	return {
		yourPublicMethod: yourPublicMethod
	};

}(jQuery));

/**
 * Executed on DOM ready within the global scope.
 * @event
 */
$(function() {
	yourAppName.modulName.yourPublicMethod('Hi Public.');
});


