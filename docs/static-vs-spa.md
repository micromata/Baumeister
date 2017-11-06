# Writing Markup (static sites vs. single page apps)
Baumeister acts like a static sites generator by default. Using handlebars we can simplify our templates and avoid markup duplications by using a combination of `pages`, `layouts` and `partials`.

## This is optional
Using Handlebars instead of plain HTML is fully optional and will probably suit your needs if you use Baumeister for creating a static site. If you are developing a single page application instead you might turn off handlebars compiling and place just an `index.html` file in the `/src` directory and store additional templates in `/src/app`.

In this case you have to switch off Handlebars compiling in `gulp/config.js`:

```javascript
/**
 * Boolean flag to set when using handlebars instead of plain HTML files in `src`.
 */
export const useHandlebars = false;
```

## Using handlebars

It’s super easy to use even if you never used Handlebars before.
Because every valid HTML page is a valid Handlebars template. But handlebars gives you some extra power. So you can:

- write plain HTML
- use [built-In helpers](http://handlebarsjs.com/builtin_helpers.html) provided by Handlebars
- go crazy with [custom helpers](http://handlebarsjs.com/block_helpers.html) :heart_eyes:

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

### Custom helper

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

### Partial

Content of `src/handlebars/partials/footer.hbs`:

```handlebars
<footer>
	{{addYear '©'}} MyCompany
</footer>
```

### Page

Content of `src/index.hbs`:

```handlebars
---
title: My page title
---
<h1>My page</h1>

<p>My content</p>

{{> footer }}
```

###Layout file

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

### Rendered Result

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

TODO: Add SPA example
