/**
 * @file  JavaScript entry point of the project
 */

// Import the whole Bootstrap JS bundle
import 'bootstrap';

// Or import only what you need to keep your vendor bundle small
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

// Import polyfills
import { applyPolyfills } from './base/polyfills';

// Import methods from the base module
import { consoleErrorFix, ieViewportFix } from './base/base';

// Import our Sass entrypoint to create the CSS app bundle
import '../assets/scss/index.scss';

$(async () => {
  // Wait with further execution until needed polyfills are loaded.
  await applyPolyfills();

  consoleErrorFix();
  ieViewportFix();

  console.log('YaY, my first ES6-Module !!!!');
});
