/**
 * @file  JavaScript entry point of the project
 */

import '../assets/scss/index.scss';
import {consoleErrorFix, ieViewportFix} from './base';

$(() => {
	consoleErrorFix();
	ieViewportFix();
	console.log('YaY, my first ES6-Module !!!!');
});
