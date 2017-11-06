# File and folder structure of Sass files

This is s short version of our conventions when it comes to create bootstrap themes. Below you’ll find the folder and file structure we are using:

```bash
src/assets/scss
├── _print.scss
├── _theme.scss
├── _variables.scss
├── index.scss
└── theme
    ├── _alerts.scss
    ├── _demoElements.scss
    ├── _footer.scss
    ├── _mixins.scss
    ├── _scaffolding.scss
    └── _testResponsiveHelpers.scss
```


Seems to be a pretty huge amount of files for such a little project. So here we go with an explanation.

## index.scss
Our main Sass file is the one which is creating our index.css file. This file is just about a few imports.

```scss
// Import our variables to override Bootstraps default ones
@import "./variables";

// Bootstrap Core
// --------------------------------------------------
@import "../../../node_modules/bootstrap-sass/assets/stylesheets/bootstrap";

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

## \_theme.scss

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
@import "theme/demoElements";
@import "theme/footer";

// Important note //
// You could also use this file to insert theme related style definitions
// directly within this file. But we recommend to exclude your LESS code to
// separate files like the examples above when you exceed a few hundred lines
// of code. Otherwise it will definitely have a negative impact on
// maintainability.
```

## Theme folder

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
