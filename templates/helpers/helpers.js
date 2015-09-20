/**
 * @file Custom Handlebars helpers to use in templates, partials and pages.
 * @author Michael Kühnel <m.kuehnel@micromata.de>
 */

var addYear = function (s) {
	return s + ' ' + new Date().getFullYear();
};

module.exports = {
	addYear: addYear
};
