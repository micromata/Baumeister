import $ from 'jquery';
import * as Base from './base';

// this is necessary because bootstrap itself checks the existence of jQuery with window.jQuery.
window.jQuery = $;

// Because of bootstrap is not an UMD Module, we cannot import it with es6 syntax.
require('bootstrap');
require('select2');

$(() => {
	Base.consoleErrorFix();
	Base.ieViewportFix();
	console.log('YaY, my first ES6-Module !!!!');
	$('select').select2();
});
