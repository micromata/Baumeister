import {templates} from './templates';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('bootstrap');

$(() => {
	console.log('Template strings', templates.render());
});
