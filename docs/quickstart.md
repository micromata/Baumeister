# Quickstart

## Quick install guide

For those already using Node, Gulp and stuff.

### via Yeoman

	$ npm install -g yo
	$ npm install -g generator-baumeister
	$ yo baumeister
	$ gulp --tasks

See: <https://github.com/micromata/generator-baumeister>

### via Git

	$ git clone https://github.com/micromata/baumeister.git
	$ cd baumeister
	$ npm install
	$ gulp --tasks

## Dependencies

- Node.js (>=6.0.0)
- Gulp

### Node.js

The major dependency is [Node.js](http://nodejs.org/) including the Node.js package manager called »npm«. The other dependencies can be installed with npm.

Please enter the following in your terminal if your aren’t sure about the availability of Node.js and npm on your machine:

	node --version

This should return something like the following in case Node.js and npm is already installed:

	v8.1.0

If this isn’t the case you have to install Node.js first. On OS X we strongly recommend installing Node via [Homebrew](https://brew.sh/) or [Node Version Manager](https://github.com/creationix/nvm). Not just because it’s easier to switch versions but also because you prevent potential permission problems when running npm.

### Gulp

This project uses [Gulp](http://gulpjs.com/) for its build system, with convenient methods for working with the project. It's how we compile and minify our code, at vendor prefixes, optimize images, delete unused CSS, release new versions and more.

#### Installing Gulp

Thanks to Node.js and npm installing the Gulp command line tools globally is just this simple one-liner:

	npm install --global gulp-cli

<a name="setup"></a>
## Setting up the project

Navigate to the root of your checkout:

	cd path/to/your/checkout/of/baumeister

and call:

	npm install

npm will look at the `package.json` file and automatically fetch and install the necessary local dependencies needed for our Gulp workflow as well as the needed frontend dependencies to `\node_modules`.
