#Kickstarter for Bootstrap themes

## Dependencies

### Node.js

The major dependency is [Node.js](http://nodejs.org/) including the Node.js package manager called »npm«. The other depencies can be installed with npm.

Please enter the following in your terminal if your aren’t sure about the availability of Node.js and npm on your machine:

	npm --version

This should return the something like the following in case Node.js and npm is already installed:

	1.4.24

If that isn’t the case you have to install Node.js first. On OS X I strongly recommend installing Node via [Homebrew](http://brew.sh). Not just because it’s easier to switch versions with Homebrew but also beacuse you prevent potential permission problems when running npm.


### Bower

Bootstrap and jQuery and other other plugiuns are installed via [Bower](http://bower.io) (»A package manager for the web«). You can check the availability of bower with typing the following into your terminal:

	bower --version

Your Terminal should response with the version number of Bower, if Bower is installed properly. Something like:

	1.3.9

Otherwise you have to install Bower first.

#### Installing Bower

Thnanks do Node.js and npm intsalling Bower is just this simple one liner:

	npm install -g bower

Also make sure that git is installed as some bower packages require it to be fetched and installed.

### Installing and updating external resources with Bower

Just fire the following in the terminal:

	cd path/to/your/checkout/of/kickstarter
	bower install

That should place a `lib` directory containing the dependencies defined in the `bower.json` in your root directory of the project.

### Changing versions of external resources

You can change the version of the external resources by editing the `bower.json` file within the root directory of the project.

    "dependencies": {
        "bootstrap": "~3.2.0",
        jquery": "^1.11.1",
    }

The tilde `~` means: Install the latest version including patch-releases.
The caret `^` means: Install the latest version including minor-releases.

So `~3.2.0` installed the latest 3.2.x release which is version v3.2.0 in case of Bootstrap right now. So  Bootstrap 3.2.1 will be fetched as soon as it is released when you fire `bower update` or `bower install`. But Bower won’t install Bootstrap 3.3.x or later.

Where `^1.11.1` installed the latest 1.x.x release which is version 1.11.1 in case of jQuery right now. So jQuery 1.11.2 as well as jQuery 1.12.0 will be fetched as soon as it is released when you fire `bower update` or `bower install`. But Bower won’t install jQuery 2.x.x or later.

Check <http://semver-ftw.org> for more information about »Semantic Versioning«.

## Setup 

**TODO!**  
Describe Grunt and npm setup. See <http://getbootstrap.com/getting-started/#grunt-installing>

## Grunt Workflow and tasks

**TODO!**  
Describe Grunt tasks. Basically:

    grunt tasks
    
See <http://getbootstrap.com/getting-started/#grunt-commands>

## File and folder structure

**TODO!**  
Add Description …

See <http://getbootstrap.com/getting-started/#whats-included-source>

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
