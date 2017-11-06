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
- [Configuring linters](#configuring-linters)
- [Release Workflow](#release-workflow)
- [Contributing to this project](#contributing-to-this-project)
- [License](#license)

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
