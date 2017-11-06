[![GitHub version](https://badge.fury.io/gh/micromata%2Fbaumeister.svg)](https://badge.fury.io/gh/micromata%2Fbaumeister)
[![Build Status](https://travis-ci.org/micromata/Baumeister.svg?branch=master)](https://travis-ci.org/micromata/Baumeister)
[![Dependency Status](https://david-dm.org/micromata/baumeister.svg)](https://david-dm.org/micromata/baumeister)
[![devDependency Status](https://david-dm.org/micromata/baumeister/dev-status.svg)](https://david-dm.org/micromata/baumeister#info=devDependencies)
[![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-orange.svg?style=flat)](CODE_OF_CONDUCT.md)
[![Join the chat at https://gitter.im/micromata/baumeister](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/micromata/baumeister?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Twitter](https://img.shields.io/badge/Twitter-%40baumeister__io%20-blue.svg?style=flat)](https://twitter.com/baumeister_io)

# Baumeister – The frontend build workflow for your needs

<p align="center">
	<img width="50%" src="https://cdn.rawgit.com/micromata/baumeister-media/master/dist/Baumeister-Logo-Default.svg" alt="Baumeister Logo">
</p>

The aim of this project is to help you to build your things. From Bootstrap themes over static websites to single page applications. Baumeister provides:

- a file structure with focus on maintainability and upgradability
- a Gulp workflow with the following »features«
	- generate static sites with ease using handlebars templates
		- optional – see [details](#writing-markup-static-sites-vs-single-page-apps)
	- transpile, bundle and minify your code
		- ES6 as well as Sass
	- remove `console` output and `debugger` statements in production files
	- add vendor prefixes
	- lint JavaScript, Sass and HTML
	- optimize images (lossless)
	- start a local server
	- keep browsers in sync for testing
	- delete unused CSS (optional)
	- check for know vulnerabilities in dependencies
	- release new versions
	- run unit tests and create coverage reports
	- and more.

## Table of Contents

- [Quickstart](./docs/quickstart.md)
- [Gulp workflow and tasks](./docs/gulp-workflow.md)
- [Setting up your editor (optional)](./docs/editorconfig.md)
- [Writing markup (static sites vs. single page apps)](./docs/static-vs-spa.md)
- [File and folder structure of Sass files](./docs/sass-file-structure.md)
- [Using external libraries](./docs/using-ext-libs.md)
- [Adding polyfills](./docs/adding-polyfills.md)
- [Unit tests](./docs/unit-tests.md)
- [Configuring linters](./docs/lint-config.md)
- [Release Workflow](./docs/release-workflow.md)
- [Contributing to this project](./docs/contributions.md)
- [License](#license)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
