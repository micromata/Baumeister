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
