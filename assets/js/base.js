// Fix viewport issues with IE 10.
// See http://getbootstrap.com/getting-started/#support-ie10-width
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(
		document.createTextNode(
			'@-ms-viewport{width:auto!important}'
		)
	);
	document.querySelector('head').appendChild(msViewportStyle);
}
