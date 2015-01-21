[![devDependency Status](https://david-dm.org/micromata/bootstrap-kickstart/dev-status.svg)](https://david-dm.org/micromata/bootstrap-kickstart#info=devDependencies) [![Twitter](https://img.shields.io/badge/Twitter-%40BootstrapKick%20-blue.svg?style=flat)](https://twitter.com/BootstrapKick) [![Unicorn](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=Sm368W0OsHo)

#Kickstarter for Bootstrap themes

![Logo](assets/img/bootstrap-kickstart-logo.png)

The aim of this repository is to help you with the creation of Bootstrap themes and sites by providing:

- a file structure with focus on maintainibilty and upgradability
- a Grunt workflow with the following »features«
  - compile and minify our code
  - add sourcemaps for JavaScript and CSS
  - get rid of `console` output in production files
  - add vendor prefixes
  - optimize images (lossless)
  - start a local server
  - keep browsers in sync
  - delete unused CSS (optional)
  - release new versions
  - and more.

## Quick install guide 

For those already using Node, Grunt, Bower and stuff.

### via Yeoman

	$ npm install -g yo
	$ npm install -g generator-bootstrap-kickstart
	$ yo bootstrap-kickstart
	
See: <https://github.com/micromata/generator-bootstrap-kickstart>

### via Git

	$ git clone https://github.com/micromata/bootstrap-kickstart.git
	$ cd bootstrap-kickstart
	$ npm install
	$ grunt tasks

### via Bower
	
	$ bower install bootstrap-kickstart
	$ mv bower_components/bootstrap-kickstart/* ./
	$ rm -rf bower_components
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

If that isn’t the case you have to install Node.js first. On OS X I strongly recommend installing Node via [Homebrew](http://brew.sh). Not just because it’s easier to switch versions with Homebrew but also because you prevent potential permission problems when running npm.


### Bower

Bootstrap, jQuery and other plugins are installed via [Bower](http://bower.io) (»a package manager for the web«). You can check the availability of bower with typing the following into your terminal:

	bower --version

Your terminal should response with the version number of Bower, if Bower is installed properly. Something like:

	1.3.9

Otherwise you have to install Bower first.

#### Installing Bower

Thanks to Node.js and npm installing Bower globally is just this simple one-liner:

	npm install -g bower

Also make sure that git is installed as some bower packages require it to be fetched and installed.

### Grunt

Like Bootstrap itself this project uses [Grunt](http://gruntjs.com/) for its build system, with convenient methods for working with the project. It's how we compile and minify our code, at vendor prefixes, optimize images, delete unused CSS, release new versions and more.

#### Installing Grunt

Thanks do Node.js and npm installing the Grunt command line tools globally is just this simple one-liner:

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

This will give you the main Grunt tasks which are ready for you to be fired from the terminal (grouped into »Dev« and »Production« Tasks):

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
Running those tasks will create a bunch of directories and files which aren’t under version control. So don’t wonder when the following ressources are created after setting up the project:

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

### Setting up your Editor (optionally)

I recommend setting up a project within in your editor if you don’t want to see these generated files cluttered all over your project. In case of Sublime Text it’s as easy as hitting »Project« → »Save Project As …« and adding the following to `projectName.sublime-project`.

```json
{
  "folders": [{
    "path": "path/to/your/checkout/of/bootstrap-kickstart",
    "folder_exclude_patterns": [
      "node_modules",
      "server",
      "dist",
      "reports",
      "docs",
      "assets/css",
      "libs"
    ],
    "file_exclude_patterns": [
      "assets/js/*.min.js",
      "assets/js/*.min.js.map",
      ".*rc",
      ".editorconfig",
      ".gitignore",
      "*.zip",
      "*.md",
      "LICENSE",
      "*.json",
      "Gruntfile.js"
    ]
  }]
}
``` 

<a name="using-bower"></a>
## Installing and updating external resources with Bower

The following isn’t needed after setting up the project because `bower install` is called with `npm install`. See [Setting up the project](#setup).

But it’s good to know that you can always install the dependencies needed for your theme by entering the following in the terminal:

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

This is s short version of our conventions when it comes to create bootstrap themes.  Below you’ll find a screenshot from `/assets/less`

![Screenshot](http://f.cl.ly/items/1e2B2v0P1Z0U2E2A3q2g/screenshot-less.png)

Seems to be a pretty huge amount of files for such a little project. So here we go with an explanation.

### index.less  
Our main LESS file which is the one which is creating our index.css file. This file is just about a few imports and setting the path to the icon fonts provided by bootstrap.
  
```css
// Bootstrap Core
// --------------------------------------------------
@import "../../libs/bootstrap/less/bootstrap.less";

// Set path to icon fonts
@icon-font-path: "../../libs/bootstrap/fonts/";

// Base styles
// --------------------------------------------------
// Independent of design (shared definitions).
// base.less is meant to be used for different themes for one customer.
@import "base.less";

// Corporate Design
// --------------------------------------------------
@import "customerName.less";

////////// Do NOT insert style-definitions here! //////////
```

### base.less
Is used for shared definitions which makes sense when dealing with different themes for one customer/project. The defaults consist only of a few lines.

```css
// Base styles
// --------------------------------------------------
// Independent of design (shared definitions)
// base.less is meant to be used for different themes for one customer.

// Fix viewport issues with IE 10.
// See http://getbootstrap.com/getting-started/#support-ie10-width
@-webkit-viewport   { width: device-width; }
@-moz-viewport      { width: device-width; }
@-ms-viewport       { width: device-width; }
@-o-viewport        { width: device-width; }
@viewport           { width: device-width; }
```

### customerName.less

We used this file to import the modules/files which defines the actual theme. You could also use this to write down your styles and omit the use of the seperate files laying around in the corresponding folder `customerName`. But that’s not a recommendation. See content of `customerName.less`:

```css
// Override and extend Bootstrap stuff
// --------------------------------------------------
// Files, classes, mixins etc.
@import "customerName/variables.less";
@import "customerName/mixins.less";
@import "customerName/scaffolding.less";
@import "customerName/alerts.less";

// Own modules
// --------------------------------------------------
@import "customerName/demoElements.less";
@import "customerName/footer.less";
@import "customerName/ribbon.less";

// Important note //
// You could also use this file to insert customer related style definitions
// directly within this file. But we recommend to exclude your Less code to
// seperate files like the examples above when you exceed a few hundred lines
// of code. Otherwise it will definitely have a negative impact on
// maintainabilty.

```

### customerName folder

This folder holds the modules needed by the theme. The skeleton of such a module looks like the comments within `ribbon.less`

```css
//
// Ribbon
// --------------------------------------------------
// The main ribbon navigation

// Local variables
//
// Which are meant to be used only in this module. »Global« variables are stored
// in /assets/less/customerName/variables.less

// Local mixins
//
// Which are meant to be used only in this module. »Global« variables are stored
// in /assets/less/customerName/mixins.less

// Styles
//
```

See [footer.less](assets/less/customerName/footer.less) for a »real life« example.

There are three files which differ from the regular modules. Please have a look at comments within the following files to get an idea how to handle them:

- [variables.less](assets/less/customerName/variables.less)  
  Used to override bootstrap variables. Make sure to read the comments which describe how to handle this file which can save you lots of time when it comes to a Bootstrap update.
- [mixins.less](assets/less/customerName/mixins.less)  
  Holds additional global mixins which are meant to be used accross modules.
- [scaffolding.less](assets/less/customerName/scaffolding.less)  
  Used to define the most generic html elements. 

## Browser support

It depends on you and the CSS you are writing. We still have to support IE8 in a few projects so the HTML templates used in this repository are containing the following snippet taken from the [HTML5 Boilerplate](http://html5boilerplate.com/):

````
<!--[if lt IE 8>
	<p class="browsehappy">
		You are using an <strong>outdated</strong> browser.
		Please <a href="http://browsehappy.com/">upgrade your browser</a>
		to improve your experience.
	</p>
<![endif]-->
````

Change this according to your needs. And make sure to visit the [Browser and device support](http://getbootstrap.com/getting-started/#support) information provided by Bootstrap.

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
