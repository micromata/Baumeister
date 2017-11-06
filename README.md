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
- [Using external libraries](#using-external-libraries)
- [Adding polyfills](#adding-polyfills)
- [Unit tests](#unit-tests)
- [Configuring linters](#configuring-linters)
- [Release Workflow](#release-workflow)
- [Contributing to this project](#contributing-to-this-project)
- [License](#license)

## Using external libraries

Let’s assume you like to add some fanciness to your form select fields. This could be accomplished with [Select2](https://github.com/select2/select2).

This is how you get the files into your `/node_modules` directory and define the dependency in the `package.json` file.

	cd path/to/your/checkout/of/baumeister
	npm search select2

This leads to something like:

```
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
select2                   | Select2 is a jQuery… | =chrisjbaik…    | 2016-05-27 |          | select autocomplete typeahead dropdown multiselect tag tagging
Select2                   | Select2 is a jQuery… | =syastrebov     | 2016-08-05 |          | select autocomplete typeahead dropdown multiselect tag tagging
ember-power-select        | The extensible…      | =cibernox       | 2017-03-17 |          | ember-addon select select2 selectize dropdown
select2-bootstrap-css     | Simple CSS to make…  | =fk             | 2015-02-03 |          | bootstrap select2 css
vue-select                | A native Vue.js…     | =sagalbot       | 2017-03-12 |          |
```

where the Name is your key for installation. In our use case you would the do:

	npm install --save select2

which will:

- download the latest and greatest version to your `node_modules` directory
- add `"select2": "~4.0.3"` to your `package.json`

### Using and bundling JavaScript dependencies

You have to decide whether to use ES6 imports or `require` your dependency in the commonJS way depending on the module format your dependency provides.

Example:

```javascript
import $ from 'jquery';
// this is necessary because bootstrap itself checks the existence of jQuery with window.jQuery.
window.jQuery = $;

// Because of bootstrap and select2 aren’t UMD modules, we can’t import them using ES6 syntax.
require('bootstrap');
require('select2');
```

Finally add the library to the `bundleExternalJS` section of `package.json` to add the sources the `vendor.js` bundle.

```
bundleExternalJS": ["jquery", "bootstrap", "select2"]
```
The bundled JavaScript is stored in the `libs` directory during the build process:

```
myProject
├── server
│   └── libs
│       └── vendor.js
└── dist
    └── libs
        └── vendor.min.js
```

### Bundling CSS from dependencies

If a used library ships its own CSS you have to include the path to the files you like to bundle in the `bundleCSS` section of your `package.json`. Please note that glob pattern matching is supported over here.

```
"bundleCSS": [
	"select2/dist/css/select2.css",
	"select2-bootstrap-css/select2-bootstrap.css"
]
```

The bundled CSS is stored in the `libs` directory during the build process:

```
myProject
├── server
│   └── libs
│       └── libs.css
└── dist
    └── libs
        └── libs.min.css
```

### Including static files from dependencies

Sometimes you need to copy static files from an npm package to your project. This may be fonts or JavaScript files you need to include via a separate `<script>` tag.
To handle that you just have to include the files in the `includeStaticFiles` section of your `package.json`. Please note that glob pattern matching is supported over here.

```
"includeStaticFiles": [
    "bootstrap/fonts/**/*",
    "html5shiv/dist/html5shiv-printshiv.min.js",
    "respond.js/dest/respond.min.js"
]
```

These files are stored in the `libs` directory during the build process:

```
myProject
├── server
│   └── libs
│       ├── bootstrap
│       │   └── fonts
│       │       ├── glyphicons-halflings-regular.eot
│       │       ├── glyphicons-halflings-regular.svg
│       │       ├── glyphicons-halflings-regular.ttf
│       │       ├── glyphicons-halflings-regular.woff
│       │       └── glyphicons-halflings-regular.woff2
│       ├── html5shiv
│       │   └── dist
│       │       └── html5shiv-printshiv.min.js
│       └── respond.js
│           └── dest
│               └── respond.min.js
└── dist
    └── libs
        ├── bootstrap
        │   └── fonts
        │       ├── glyphicons-halflings-regular.eot
        │       ├── glyphicons-halflings-regular.svg
        │       ├── glyphicons-halflings-regular.ttf
        │       ├── glyphicons-halflings-regular.woff
        │       └── glyphicons-halflings-regular.woff2
        ├── html5shiv
        │   └── dist
        │       └── html5shiv-printshiv.min.js
        └── respond.js
            └── dest
                └── respond.min.js
```

### Changing versions of dependencies

You can change the version of the dependencies by editing the `package.json` file within the root directory of the project by hand.

	"dependencies": {
	  "bootstrap": "~3.2.0",
	  "jquery": "^1.11.1",
	  "html5shiv": "^3.7.2",
	  "respondJs": "~1.4.2",
	  "jquery-placeholder": "2.0.8"
	}

The tilde `~` means: Install the latest version including patch-releases.
The caret `^` means: Install the latest version including minor-releases.

So `~3.2.0` installed the latest 3.2.x release which is version v3.2.0 in case of Bootstrap right now. So  Bootstrap 3.2.1 will be fetched as soon as it is released when you call `npm update` or `npm install`. But npm won’t install Bootstrap 3.3.x or later.

Where `^1.11.1` installed the latest 1.x.x release which is version 1.11.1 in case of jQuery right now. So jQuery 1.11.2 as well as jQuery 1.12.0 will be fetched as soon as it is released when you call `npm update` or `npm install`. But npm won’t install jQuery 2.x.x or later.

Check <http://semver.org/> for more information about »Semantic Versioning«.

#### Updating beyond defined semver ranges

There are multiple ways to get newer versions than defined via the semver ranges in your `package.json`

##### Updating single dependencies via CLI

You can use npm to update single dependencies and persist changes to your `package.json`

For example:

```
npm install --save bootstrap@latest
```

##### Updating multiple dependencies at once

We recommend using a command line tool like »[npm-check-update](https://github.com/tjunnone/npm-check-updates)« to update multiple dependencies at once.

## Adding polyfills

The file `src/app/polyfills.js` is prepared to import polyfills you might need depending on your use of modern JavaScript language features and your target browsers.

Just import the ones you need for the browsers you are targeting.

The only polyfill activated by default is a Promises polyfill which is needed if you use Promises and targeting Internet Explorers.

## Unit tests

We use [Jest](https://facebook.github.io/jest/), for running unit test and generating test coverage reports.
See config in property `jest` in `package.json`.

Just type the following to run all test once:

```
npm test
```

You can watch changes and run tests automatically with:

```
npm run test:watch
```
This comes in handy since it’s blazingly fast. It runs only tests related to changed files per default but has an interactive mode which enables you to run all if needed.

### For those who are new to Jest

Writing test with Jest feels pretty much the same like writing tests with Mocha/Chai|Jasmine.
Just have a look at our small dummy test in `src/app/__tests__`.

Placing tests in `__tests__` directories is a default from Jest.
You can adjust the name of your tests-directory with the `testDirectoryName` configuration option.

The most important things to know:
- [API docs](https://facebook.github.io/jest/docs/api.html)
- [Assertions](https://facebook.github.io/jest/docs/expect.html)

*Your are not forced to use Jests assertions. You can alternatively use `assert` by just requiring it or install and use Chai.*

We strongly recommend to check the [docs](https://facebook.github.io/jest/docs/getting-started.html) to dive deeper and read for instance how Jest can help you with mocking.

## Configuring linters

Below you’ll find information how to adapt the rules in case they don’t fit your preferences.

### ESLint (JavaScript)

We are using [eslint-config-xo](https://github.com/sindresorhus/eslint-config-xo) as presets but adapted a few rules within:

```
.eslintrc.json
```

See [ESLint rules](http://eslint.org/docs/rules/) in case you like get details to these rules.

In addition we extend the settings for client code in:

```
src/app/.eslintrc.json
```

See [Configuring ESLint](http://eslint.org/docs/user-guide/configuring) if you need to know more.


### stylelint (Sass)

We are using [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as presets but adapted a few rules within:

```
.stylelintrc.json
```

See [stylelint rules](https://stylelint.io/user-guide/rules/) in case you like get details to these rules and the [stylelint user guide](https://stylelint.io/user-guide/configuration/) to see how to configure stylelint (e.g. how to turn of rules).

### Bootlint (Markup)

We are using [Bootlint](https://github.com/twbs/bootlint) to check for potential markup errors when using Bootstrap.
You can disable certain [rules](https://github.com/twbs/bootlint/wiki) within:

```
gulp/tasks/lint-bootstrap.js
```

## Release Workflow

We provide a task to automate releases with the following options:

```
gulp release --bump (major|minor|patch|prerelease|premajor|preminor|prepatch) [--prerelease-identifier <yourIdentifier>]
```

*Hint: With `-B` there is a shorter alias available for `--bump`.*

See <http://semver.org> for details when to choose which release type.

The release task will:

- bump the version number in `package.json`
- generate a changelog
- commit changes
- create a Git tag

**Examples**

```
# Bump version from 3.1.2 to 4.0.0
gulp release -B major

# Bump version from 3.1.2 to 3.2.0
gulp release -B minor

# Bump version from 3.1.2 to 3.1.3
gulp release -B patch

# Bump version from 3.1.2 to 4.0.0-beta.0
gulp release -B premajor --prerelease-identifier beta

# Bump prerelease version eg. from 4.0.0-beta.0 to 4.0.0-beta.1
gulp release -B prerelease
```

### Changelog creation

The changelog is stored in the file `CHANGELOG.MD` in the project root. Every release updates this file.

We are using »conventional changelog« to get relevant changes out of the git commit history and group them nicely.

You should write your commit messages with this [conventions](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/convention.md) in mind.

See the last [commits](https://github.com/micromata/baumeister/commits) of Baumeister for some real life commit messages.

#### Short summary of the conventions

Example commit message:
```
fix(uglify): Remove console output and debugger statements
```
Consists of:
```
type(scope): subject
```
##### Types

Types are used to group commits in the changelog.
Possible types which are rendered in the changelog are: `feat`, `fix` and `perf`.

There are additional ones which you can use. But these are only rendered if they introduce a breaking change:
`docs`, `chore`, `style`, `refactor`, and `test`.

##### Scope

The scope is optional and you can choose from whatever you want.
The scope is used as another grouping element below the type.

You can skip the parentheses if you don’t want to use Scope:
```
style: Fix linting errors
```

##### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* capitalize first letter
* no dot (.) at the end

##### Additional Info,  Breaking changes and issue references

Are defined in the body of the commit message.

Example:
```
feat(build): Replace Grunt with Gulp
<BLANK LINE>
Closes #28
BREAKING CHANGE: Grunt Tasks aren’t available any longer.
But there are equivalent Gulp tasks.
List the available tasks with `gulp --tasks`
```
The body can include the motivation for the change and contrast this with previous behavior.

Plus it should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Generated Changelog

This is how a changelog based on this conventions is rendered:
https://github.com/angular/angular/blob/master/CHANGELOG.md

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review our [Code of Conduct](CODE_OF_CONDUCT.md) as well as our [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
