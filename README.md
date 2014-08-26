#Kickstarter for Bootstrap themes

## Quick guide 

For those already using Node, Grunt and stuff:
	
	$ git clone git@github.com:micromata/bootstrap-kickstart.git
	$ npm install
	$ grunt tasks

## Dependencies

- Node.js
- Bower
- Grunt

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

Thanks do Node.js and npm installing Bower globally is just this simple one liner:

	npm install -g bower

Also make sure that git is installed as some bower packages require it to be fetched and installed.

### Grunt

Like Bootstrap itself this project uses [Grunt](http://gruntjs.com/) for its build system, with convenient methods for working with the project. It's how we compile and minify our code, at vendor prefixes, optimize images, delete unused CSS, release new versions and more.

#### Installing Grunt

Thanks do Node.js and npm installing the Grunt command line tools globally is just this simple one liner:

    npm install -g grunt-cli
    
<a name="setup"></a>
## Setting up the project

Navigate to the root of your checkout:

    cd path/to/your/checkout/of/bootstrap-kickstart

and call:

    npm install
    
npm will look at the `package.json` file and automatically fetch and install the necessary local dependencies needed for our grunt workflow to `\node_modules`.

Afterwards it will call `bower install` which will look at `bower.json` and install the necessary frontend dependencies needed to build our Bootstrap theme to `\libs`.

See [Installing and updating external ressources with bower](#using-bower) if you’re new to Bower.

## Grunt Workflow and tasks

When completed the setup, you'll be able to run the various Grunt tasks provided from the command line.

Just type the following to get an overview about the available Tasks:
 
    grunt tasks

This will give you the main Grunt tasks which are ready for you te be fired from the terminal (grouped into »Dev« and »Production« Tasks):

````
Dev
default      => Default Task. Just type `grunt` for this one. Calls `grunt dev` first and `grunt server` afterwards.
dev          => `grunt dev` will hint your JS, building sources within the assets directory and generating docs / reports.
sync         => `grunt sync` starts a local dev server, sync browsers and runs `grunt watch`
plato        -> `grunt plato` generates static code analysis charts with plato.
jsdoc        -> `grunt jsdoc` generates source documentation using jsdoc.
server       => `grunt server` starts a local dev server and runs `grunt watch`
watch         > `grunt watch` run dev tasks whenever watched files change and Reloads the browser with »LiveReload« plugin.

Production
build        => `grunt build` builds production ready sources to dist directory.
checkBuild   => `grunt checkBuild` starts a local server to make it possible to check the build in the browser.
releasePatch => `grunt releasePatch` builds the current sources, bumps version number (0.0.1) and creates zip.files.
releaseMinor => `grunt releaseMinor` builds the current sources, bumps version number (0.1.0) and creates zip.files.
releaseMajor => `grunt releaseMajor` builds the current sources, bumps version number (1.0.0) and creates zip.files.
````
Running those tasks will create a bunch of bunch of directories and files which aren’t under version control. So don’t wonder when the following ressources are created after setting up the project:

````
bootstrap-kickstart/
├── assets/ 
│   ├── css/
│   │   ├── index.css          → Compiled and autoprefixed from LESS files
│   │   └── index.css.map      → Sourcemap which maps to LESS files
│   └── js/
│       ├── file.min.js        → Minified JavaScript file
│       └── file.min.js.map    → Sourcemap which maps to original js file
├── dist/                      → Contains the files ready for production 
│   ├── assets/
│   │   ├── css/
│   │   │   ├── index.css      → Compiled and autoprefixed from LESS files
│   │   │   └── index.css.map  → Sourcemap which maps to LESS files
│   │   ├── fonts/             → Fonts copied from /assets/fonts
│   │   ├── img/               → Optimized images from /assets/img
│   │   └── js/
│   │       └── file.min.js    → Minified JavaScript file (without console output)
│   └── libs/                  → Relevant files copied from /libs
├── docs/                      → JavaScript generated from DocBlock comments
├── libs/                      → External libraries and plugins installed by Bower
├── node_modules/              → Dev dependencies installed by npm
└── reports/                   → JavaScript Source Analysis 
````

See `/Gruntfile.js` to see what happens in Details.

<a name="using-bower"></a>
## Installing and updating external resources with Bower

The following isn’t needed after setting up the project because `bower install` is called with `npm install`. See [Setting up the project](#setup).

But it’s good to know that you always can always install the dependencies needed for your theme by entering the following in the terminal:

	cd path/to/your/checkout/of/bootstrap-kickstart
	bower install

This places a `/lib` directory (if not already existing) containing the dependencies defined in the `bower.json` in your root directory of the project as mentioned before.

**Important**  
It might be needed to call `bower install` after dependencies are added and used on a remote repository. Because when doing a `git pull` you won’t get the new dependencies since the `lib` directory is not under version control. This will be adressed with issue [#10](https://github.com/micromata/bootstrap-kickstart/issues/10).

### Changing versions of external resources

You can change the version of the external resources by editing the `bower.json` file within the root directory of the project.

    "dependencies": {
        "bootstrap": "~3.2.0",
        "jquery": "^1.11.1",
        "html5shiv": "^3.7.2",
        "respondJs": "~1.4.2",
        "jquery-placeholder": "2.0.8"
    }

The tilde `~` means: Install the latest version including patch-releases.
The caret `^` means: Install the latest version including minor-releases.

So `~3.2.0` installed the latest 3.2.x release which is version v3.2.0 in case of Bootstrap right now. So  Bootstrap 3.2.1 will be fetched as soon as it is released when you call `bower update` or `bower install`. But Bower won’t install Bootstrap 3.3.x or later.

Where `^1.11.1` installed the latest 1.x.x release which is version 1.11.1 in case of jQuery right now. So jQuery 1.11.2 as well as jQuery 1.12.0 will be fetched as soon as it is released when you call `bower update` or `bower install`. But Bower won’t install jQuery 2.x.x or later.

Check <http://semver-ftw.org> for more information about »Semantic Versioning«.

### Adding new dependencies

Let’s assume you like to add even more responsiveness to your tables as provided by bootstraps `table-responsive` class. This could be accomplished with the awesome [Tablesaw plugins](https://github.com/filamentgroup/tablesaw) by the Filament Group.

This is how you get the files into your `/libs` directory and define the dependency  in the `bower.json` file. 

    cd path/to/your/checkout/of/bootstrap-kickstart
    bower search tablesaw
    
This leads to omething like:

````
Search results:

    overthrow git://github.com/filamentgroup/Overthrow
    filament-fixed git://github.com/filamentgroup/fixed-fixed.git
    filament-sticky git://github.com/filamentgroup/fixed-sticky.git
    filament-dialog git://github.com/filamentgroup/dialog.git
    tablesaw git://github.com/filamentgroup/tablesaw.git
    social-count git://github.com/filamentgroup/SocialCount.git
````

where the string before the url (`tablesaw `) is your key for installation. In our use case you would the do:

    bower install tablesaw --save

which will:

- download the latest and greatest version to your `libs` directory
- Add `"tablesaw": "~0.1.6"` to your `bower.json` 

## File and folder structure of LESS files

**TODO!**  
Add Description …

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
