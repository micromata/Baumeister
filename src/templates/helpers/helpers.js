/**
 * @file Custom Handlebars helpers to use in templates, partials and pages.
 * @author Michael Kühnel <m.kuehnel@micromata.de>
 */

/**
 * Adds the current year to a string. Divides given string and year by a space.
 * @param {String} s The string which should be suffixed with the current year.
 * @returns {String} The given string suffixed with the current year.
 * @example:
 * {{addYear '©'}} --> © 2015
 *
 */
var addYear = function (s) {
	return s + ' ' + new Date().getFullYear();
};

module.exports = {
	addYear: addYear
};
