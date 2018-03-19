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

Baumeister is here to help you to build your things. From Bootstrap themes over static websites to single page applications. Baumeister provides:

- a file structure with focus on maintainability and upgradability
- a build setup based on Webpack and npm scripts with the following »features«
	- generate static sites with ease using handlebars templates
		- optional – see [details](#writing-markup-static-sites-vs-single-page-apps)
	- transpile, bundle and minify your code
		- ES6 as well as Sass
	- visualize size of bundled files with an interactive zoomable treemap
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

Baumeister mainly uses [Webpack](https://webpack.js.org) at its core for transpiling, bundling and minifying files and provides [npm scripts](#build-workflow-and-npm-scripts) for working with the project. Besides that we have defined a few npm scripts to handle things like our [release workflow](#release-workflow). All necessary dependencies are locally installed via npm.

## Table of Contents

- [Quick install guide](#quick-install-guide)
- [Dependencies](#dependencies)
- [Setting up the project](#setting-up-the-project)
- [Build Workflow and npm scripts](#build-workflow-and-npm-scripts)
- [Setting up your editor](#setting-up-your-editor)
- [Writing markup (static sites vs. single page apps)](#writing-markup-static-sites-vs-single-page-apps)
- [File and folder structure of Sass files](#file-and-folder-structure-of-sass-files)
- [Using external libraries](#using-external-libraries)
- [Adding polyfills](#adding-polyfills)
- [Unit tests](#unit-tests)
- [Configuring linters](#configuring-linters)
- [Deleting unused CSS](#deleting-unused-css)
- [Deactivate cache busting](#deactivate-cache-busting)
- [Adding banners](#adding-banners)
- [Release Workflow](#release-workflow)
- [Contributing to this project](#contributing-to-this-project)
- [License](#license)

## Quick install guide

For those already using Node.js.

### via Yeoman
*See: <https://github.com/micromata/generator-baumeister> for details.*

	$ npm i -g yo
	$ npm i -g generator-baumeister
	$ yo baumeister
	$ npm start

*See [Build Workflow and npm scripts](#build-workflow-and-npm-scripts) for the main scripts.*

### via Git

	$ git clone https://github.com/micromata/baumeister.git
	$ cd baumeister
	$ npm install
	$ npm start

*See [Build Workflow and npm scripts](#build-workflow-and-npm-scripts) for the main scripts.*

## Dependencies

- Node.js (>=6.0.0)

### Node.js

The major dependency is [Node.js](http://nodejs.org/) including the bundled package manager called »npm«. The projects dependencies are locally installed with npm.

Please enter the following in your terminal if your aren’t sure about the availability of Node.js and npm on your machine:

```
node --version
````

This should return something like the following in case Node.js and npm is already installed:

```
v8.9.4
```

If this isn’t the case you have to install Node.js first. On OS X we strongly recommend installing Node via [Homebrew](https://brew.sh/) or the [Node Version Manager](https://github.com/creationix/nvm). Not just because it’s easier to switch versions but also because you prevent potential permission problems when running npm. See [detailed instructions](http://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html).

<a name="setup"></a>

## Setting up the project

Navigate to the root of your installation:

```bash
cd path/to/your/installation/of/baumeister
```

and install the dependencies via:

```bash
npm install
```

npm will look at the `package.json` file and automatically fetch and install the necessary local dependencies needed for our build workflow as well as the needed frontend dependencies to a `node_modules` directory.

### Adjust settings via the Baumeister config file

In the root directory is a file named `baumeister.json` which you can be used to change the most important settings without touching any Webpack config:

```json
{
  "useHandlebars": true,
  "purifyCSS": {
    "usePurifyCSS": false,
    "whitelist": [
      "*navbar*",
      "*modal*",
      "*dropdown*",
      "*carousel*",
      "*tooltip*",
      "open",
      "fade",
      "collapse",
      "collapsing",
      "in"
    ]
  },
  "generateBanners": false,
  "cacheBusting": true,
  "vendor": {
    "bundleCSS": [],
    "includeStaticFiles": []
  },
  "webpack": {
    "DefinePlugin": {
      "development": {},
      "production": {}
    },
    "ProvidePlugin": {
      "$": "jquery",
      "jQuery": "jquery"
    }
  }
}
```

`vendor.bundleCSS` and `vendor.includeStaticFiles` makes it possible to include additional dependencies without touching any Webpack config. These settings are explained in depth in the section  [Using external libraries](#using-external-libraries) within this document.

The ramifications of changing the `useHandlebars` setting are explained in the section [Writing markup (static sites vs. single page apps)](#writing-markup-static-sites-vs-single-page-apps).

[Adding banners](#adding-banners) describes the effects of setting `generateBanners` to `true`.

### Define global constants at compile time

If you want to provide values for different types of builds (`NODE_ENV` is a popular example), you can define them inside the `dev` and `prod` properties of the `DefinePlugin` section.
The plugin does a direct text replacement, so the value given to it must include actual quotes inside of the string. You can use alternating quotes, like `"'production'"`, or  use `JSON.stringify('production')`.
You may take a look at the official [Webpack DefinePlugin docs](https://webpack.js.org/plugins/define-plugin/).

### Automatically load modules instead of requiring / importing them

The `ProvidePlugin` section is an object where the value equals to the module name and the key represents the property name of the window object the module gets mapped to.
See the official [Webpack ProvidePlugin docs](https://webpack.js.org/plugins/define-plugin/) for further information.

## Build Workflow and npm scripts

When completed the setup, you'll be able to run various npm scripts from the command line. Below are listed the main scripts needed for developing and building your project.

| Command                 | Description |
| ----------------------- | --- |
| `npm start`             | *Builds for development, starts a webserver, watches files for changes, rebuilds incremental and reloads your browser.* |
| `npm test`              | *Lints your JavaScript files and runs unit test via the Jest CLI.* |
| `npm run test:watch`    | *Runs unit test with Jests watch option.* |
| `npm run build`         | *Builds for production to `dist` directory.* |
| `npm run build:check`   | *Starts a static fileserver serving the `dist` directory.* |
| `npm run build:analyze` | *Starts »Webpack Bundle Analyzer« to visualize size of Webpack output files* |


There a lot more scripts defined in the `package.json` but most of the other ones are used to combine scripts. We recommend to to use a tool like [npm task list](https://github.com/ruyadorno/ntl) which provides a interactive CLI menu to list and select npm scripts.

Running those scripts will create a bunch of directories and files which aren’t under version control. So don’t wonder when the following resources are created after setting up and working with the project:

````
myProject
├──.metalsmith-build                → Compiled handlebars sources
├── coverage                        → Test coverage reports
├── dist                            → Contains the files ready for production
│   ├── app
│   └── assets
│   └── **.html
├── node_modules                    → Dependencies installed by npm
├── server                          → Contains the files for the development server
│   ├── app
│   └── assets
│   └── **.html
├── .eslintcache
├── .webpack-assets.json            → Containes bundled file names
└── .webpack-stats.json             → Containes bundle informations
````

## Setting up your Editor

We strongly advise to install an [EditorConfig plugin](http://editorconfig.org/#download) and take a look at the `.editorconfig` file in the root of this project.

## Writing Markup (static sites vs. single page apps)
Baumeister acts like a static sites generator by default. Using handlebars we can simplify our templates and avoid markup duplications by using a combination of `pages`, `layouts` and `partials`.

### This is optional
Using Handlebars instead of plain HTML is fully optional and will probably suit your needs if you use Baumeister for creating a static site. If you are developing a single page application instead you might turn off handlebars compiling and place just an `index.html` file in the `/src` directory and store additional templates in `/src/app`.

In this case you have to switch off Handlebars compiling in `baumeister.json`:

```javascript
/**
 * Boolean flag to set when using handlebars instead of plain HTML files in `src`.
 */
"useHandlebars": false
```

### Using handlebars

It’s super easy to use even if you never used Handlebars before.
Because every valid HTML page is a valid Handlebars template. But handlebars gives you some extra power. So you can:

- write plain HTML
- use [built-In helpers](http://handlebarsjs.com/builtin_helpers.html) provided by Handlebars
- go wild with [custom helpers](http://handlebarsjs.com/block_helpers.html) :heart_eyes:

Let’s dive into it by describing a minimal example. Imagine that we have a simplified file/folder structure like the following in our project:

```
src
├── index.hbs              → A page
├── anotherPage.hbs        → Another page
└── handlebars
    ├── helpers            → Place to store custom handlebars helpers (usage optional)
    │   └── add-year.js
    ├── layouts            → Place to store our layouts
    │   └── default.hbs    → Our default layout
    └── partials           → Place to store our partials (usage optional)
        └── footer.hbs
```

As you can see our pages are stored in the root of the project and are rendered as `html` pages with a little help of Handlebars.

Let’s take a look at the content of our files.

#### Custom helper

Content of `src/handlebars/helpers/add-year.js`:

```javascript
/**
 * Adds the current year to a string. Divides given string and year by a space.
 * @example:
 * {{addYear '©'}} --> © 2017
 *
 */
function addYear(s) {
	return s + ' ' + new Date().getFullYear();
}

module.exports = addYear;
```

#### Partial

Content of `src/handlebars/partials/footer.hbs`:

```handlebars
<footer>
	{{addYear '©'}} MyCompany
</footer>
```

#### Page

Content of `src/index.hbs`:

```handlebars
---
title: My page title
---
<h1>My page</h1>

<p>My content</p>

{{> footer }}
```

#### Layout file

content of `src/handlebars/layouts/default.hbs`:

```handlebars
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>My Project{{#if page.title}} - {{page.title}}{{/if}}</title>
	<link rel="stylesheet" href="">
</head>
<body>
 {{{contents}}}
</body>
</html>
```

#### Rendered Result

This combination will render to one html file.

Content of `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>My Project - My page title</title>
	<link rel="stylesheet" href="">
</head>
<body>
	<h1>My page</h1>

	<p>My content</p>

	<footer>
		© 2017 MyCompany
	</footer>
</body>
</html>
```

So the layout file is wrapped around the pages by replacing the `{{{contents}}}` placeholder with the pages content.

As you can see you can enrich your pages with data via so called frontmatters:

```
---
title: My page title
---
```

Frontmatters are basically a key/value storage you can access within your layouts, pages and partials via Handlebars.  This empowers you to do things like [handling active states](https://github.com/micromata/baumeister/blob/master/src/handlebars/partials/navbar.hbs#L16-L22) of your navigation and much more.

There is one predefined key which let you choose a different layout file in case you’re using more than one:

```
---
layout: myOtherTemplate.hbs
---
```

This would need the presence of a layout named `myOtherTemplate.hbs` in the `layouts` directory to work properly. You don’t need to define the layout within your frontmatter in case you would like to use the default layout.

## File and folder structure of Sass files

This is s short version of our conventions when it comes to create bootstrap themes. Below you’ll find the folder and file structure we are using:

```bash
src/assets/scss
├── _print.scss
├── _theme.scss
├── _variables.scss
├── index.scss
└── theme
    ├── _alerts.scss
    ├── _footer.scss
    ├── _mixins.scss
    ├── _scaffolding.scss
    └── _testResponsiveHelpers.scss
```


Seems to be a pretty huge amount of files for such a little project. So here we go with an explanation.

### index.scss
Our main Sass file is the one which is creating our index.css file. This file is just about a few imports.

```scss
// Import our variables to override Bootstraps default ones
@import "./variables";

// Bootstrap Core
// --------------------------------------------------
@import "../../../node_modules/bootstrap/scss/bootstrap";

/**
 * --------------------------------------------------
 * Here begins our own CSS in the rendered CSS file.
 */

// Theme
// --------------------------------------------------
@import "./theme";

// Print Styles
// --------------------------------------------------
// Use this file to reduce ink an optimize the readability and accessibility of the pages.
// @import "./print";

////////// Do NOT insert style-definitions here! //////////

```

### _theme.scss

We use this file to import the modules/files which defines the actual theme. You could also use this to write down your styles and omit using separate files in the corresponding folder `theme`. But that’s not a recommendation. See content of `_theme.scss`:

```scss
// Override and extend Bootstrap stuff
// --------------------------------------------------
// Files, classes, mixins etc.
@import "theme/mixins";
@import "theme/scaffolding";
@import "theme/alerts";

// Own modules
// --------------------------------------------------
// @import "theme/testResponsiveHelpers"; // debug
@import "theme/footer";

// Important note //
// You could also use this file to insert theme related style definitions
// directly within this file. But we recommend to exclude your LESS code to
// separate files like the examples above when you exceed a few hundred lines
// of code. Otherwise it will definitely have a negative impact on
// maintainability.
```

### Theme folder

This folder holds the modules needed by the theme. The skeleton of such a module looks like the following.

```scss
//
// Component name
// --------------------------------------------------
// Short component description

.component-name {
	// Local variables
	//
	// Which are meant to be used only in this module. »Global« variables are stored
	// in /src/assets/scss/_variables.scss

	// Local mixins
	//
	// Which are meant to be used only in this module. »Global« mixins are stored
	// in /src/assets/scss/theme/_mixins.scss

	// Styles
	//

}

```

See [_footer.sass](src/assets/scss/theme/_footer.scss) for a »real life« example.

There are three files which differ from regular components. Please have a look at comments within the following files to get an idea how to handle them:

- [_variables.scss](src/assets/scss/_variables.scss)
	Used to override bootstrap variables. Make sure to read the comments which describe how to handle this file which can save you lots of time when it comes to a Bootstrap update.
- [_mixins.scss](src/assets/scss/theme/_mixins.scss)
	Holds additional global mixins which are meant to be used across modules.
- [_scaffolding.scss](src/assets/scss/theme/_scaffolding.scss)
	Used to define the most generic html elements.

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
- add `"select2": "^4.0.6"` to your `package.json`

### Using and bundling JavaScript dependencies

```javascript
// Import select2
import 'select2';

$(() => {
  // Using select2
  $('.single-select').select2();
});
```

Importing the library into your JavaScript will automatically add the needed sources to the `vendor.bundle.js` file.

The bundled vendor JavaScript is stored in the `app` directory during the build process:

```
myProject
└── dist
    └── app
        └── vendor.694dbf332f7953c4041b.bundle.js
```

### Bundling CSS from dependencies

If a used library ships its own CSS you have to include the paths to the files you like to bundle in the `vendor.bundleCSS` section of your `baumeister.json` to add the CSS to the `vendor.bundle.css` file. Please note that glob pattern matching is supported over here.

```
"vendor": {
    "bundleCSS": [
      "select2/dist/css/select2.css",
      "select2-bootstrap-css/select2-bootstrap.css"
    ],
    "includeStaticFiles": []
  }
```

The bundled CSS is stored in the `css` directory during the build process:

```
myProject
└── dist
    └── assets
        └── css
            └──vendor.694dbf332f7953c4041b.bundle.css
```

### Including static files from dependencies

Sometimes you need to copy static files from an npm package to your project. This may be fonts or JavaScript files you need to include via a separate `<script>` tags.
To handle that you have to include the files in the `vendor.includeStaticFiles` section of your `baumeister.json`. Please note that glob pattern matching is supported over here.

```
"includeStaticFiles": [
  "font-awesome/fonts/**"
]
```

These files are stored in the `vendor` directory during the build process:

```
myProject
└── dist
    └── assets
        └── vendor
            └── font-awesome
                └── fonts
                    ├── fontawesome-webfont.eot
                    ├── fontawesome-webfont.svg
                    ├── fontawesome-webfont.ttf
                    ├── fontawesome-webfont.woff
                    └── fontawesome-webfont.woff2
```

### Changing versions of dependencies

You can change the version of the dependencies by editing the `package.json` file within the root directory of the project by hand.

```
"dependencies": {
  "bootstrap": "^4.0.0",
  "core-js": "^2.5.3",
  "jquery": "^3.2.1",
  "popper.js": "^1.12.9",
}
```

The version numbers describe semver ranges where the caret `^` means: Install the latest version including minor-releases.

So `^4.0.0` installes the latest 4.x.x release which is version v4.0.0 in case of Bootstrap right now. So Bootstrap 4.0.1 as well as jQuery 4.1.0 will be fetched as soon as it is released when you call `npm update` or `npm install`. But npm won’t install Bootstrap 5.x.x or later.

Check <http://semver.org/> for more information about »Semantic Versioning« or check the [npm semver calculator](https://semver.npmjs.com/) to explore with semver ranges.

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

The file `src/app/base/polyfills.js` is prepared to dynamic import polyfills you might need depending on your use of modern JavaScript language features and your target browsers. This way the polyfills are lazy loaded only in case the used browser actually needs them.

Just import the ones you need for the browsers you are targeting.

The only polyfill activated by default is a Promises polyfill which is needed for lazy loading polyfills in Internet Explorers.

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

We are using [eslint-config-baumeister](https://github.com/micromata/eslint-config-baumeister) as preset which is based on [eslint-config-xo](https://github.com/sindresorhus/eslint-config-xo), [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-filenames](https://github.com/selaux/eslint-plugin-filenames) with a few adaptions.

Feel free to decativate or change rules according to your needs in:

```
.eslintrc.json
```

See [Configuring ESLint](http://eslint.org/docs/user-guide/configuring) if you need to know more.


### stylelint (Sass)

We are using [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) as presets but adapted a few rules within:

```
.stylelintrc.json
```

See [stylelint rules](https://stylelint.io/user-guide/rules/) in case you like get details to these rules and the [stylelint user guide](https://stylelint.io/user-guide/configuration/) to see how to configure stylelint (e.g. how to turn of rules).

## Deleting unused CSS

We are using [PurifyCSS](https://github.com/purifycss/purifycss) to remove unused selectors from your CSS. This is fully optional and is turned off by default.

To activate PurifyCSS set the `usePurifyCSS` option in within `baumeister.json` to `true`.

In addition you can define a PurifyCSS `whitelist` defining an array of selectors that should not be removed.

For example. `["button-active", "*modal*"]` will leave any selector that includes `modal` in it and selectors that match `button-active`. The asterisks act like a wildcard, so wrapping a string with `*`, leaves all selectors that include it.

## Deactivate cache busting

You should set far-future `Cache-Control` and `Expires` headers (see [Apache settings](https://github.com/h5bp/server-configs-apache/blob/master/src/web_performance/expires_headers.conf) and settings for other [web servers](https://github.com/h5bp/server-configs)). This ensures resources are cached for a specified time period (usually a year or more). And this will remain as long as the user doesn’t erase their browser cache.

By default we are revisioning the bundled assets with adding a hash to the filenames for the production build. So for instance the file `app.bundle.js` will be renamed to something like `app.6c38e655f70a4f9e3d26.bundle.js`. The filename will change when the file content changes which will force the browser to re-download changed files instead of serving them from the cache.

You can disable hash based file name revving by setting the `cacheBusting` property within `baumeister.json` to `false`.

## Adding banners

Adding banners on top of the production bundles is fully optional and is turned off by default.

It can be enabled with setting the `generateBanners` property within `baumeister.json` to `true`.

```javascript
/**
 * Flag for generating banners on on top of dist files (CSS & JS).
 */
"generateBanners": true
```

If enabled it will place the following banners to the bundled CSS and JS files:

```javascript
/*!
 * <%= pkgJson.title %> - v<%= pkgJson.version %>
 * <%= pkgJson.author.email %>
 * Copyright ©<%= year %> <%= pkgJson.author.name %>
 * <%= fullDate %>
 */
```

## Release Workflow

We provide the following npm scripts to automate releases:

```
npm run release:patch
```
```
npm run release:minor
```
```
npm run release:major
```

See <http://semver.org> for details when to choose which release type.

As long as your git commit messages are [conventional](https://conventionalcommits.org)  and accurate, you no longer need to specify the semver type. You can just use the following instead:
```
npm run release
```

*This script can also be used to define pre-releases by adding the optional flags like `npm run release -- --prerelease beta`. See [Release as a pre-release](https://github.com/conventional-changelog/standard-version/blob/master/README.md#release-as-a-pre-release) for further information.*


All release scripts will:

- bump the version number in `package.json`
- generate a changelog
- commit changes
- create a Git tag

**Examples**

```
# Bump version from 3.1.2 to 4.0.0
npm run release:major

# Bump version from 3.1.2 to 3.2.0
npm run release:minor

# Bump version from 3.1.2 to 3.1.3
npm run release:patch

# Bump version from 3.1.2 to 4.0.0-beta.0
npm run release -- --prerelease beta --release-as major

# Bump prerelease version eg. from 4.0.0-beta.0 to 4.0.0-beta.1
npm run release -- --prerelease
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
feat(build): Replace Gulp with Webpack and npm scripts
<BLANK LINE>
Closes #225
BREAKING CHANGE: Gulp tasks aren’t available any longer.
But there are equivalent npm scripts.
List the available scripts with `npx nls`
```
The body can include the motivation for the change and contrast this with previous behavior.

Plus it should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Generated Changelog

This is how a changelog based on this conventions is rendered:
https://github.com/micromata/Baumeister/blob/master/CHANGELOG.md

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review our [Code of Conduct](CODE_OF_CONDUCT.md) as well as our [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
