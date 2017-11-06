# Adding polyfills

The file `src/app/polyfills.js` is prepared to import polyfills you might need depending on your use of modern JavaScript language features and your target browsers.

Just import the ones you need for the browsers you are targeting.

The only polyfill activated by default is a Promises polyfill which is needed if you use Promises and targeting Internet Explorers.
