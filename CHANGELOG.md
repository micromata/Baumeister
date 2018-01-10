<a name="2.0.1"></a>
## [2.0.1](https://github.com/micromata/baumeister/compare/2.0.0...2.0.1) (2018-01-10)


### Bug Fixes

* **dependencies:** update dev dependencies ([3ffdd2e](https://github.com/micromata/baumeister/commit/3ffdd2e))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/micromata/baumeister/compare/1.1.0...2.0.0) (2018-01-05)


### Bug Fixes

* update dependencies ([2722663](https://github.com/micromata/baumeister/commit/2722663))
* update dependencies ([#199](https://github.com/micromata/baumeister/issues/199)) ([9d41b6d](https://github.com/micromata/baumeister/commit/9d41b6d))
* **config:** prevent error if `includeStaticFiles` is empty ([3ce7eb5](https://github.com/micromata/baumeister/commit/3ce7eb5)), closes [#215](https://github.com/micromata/baumeister/issues/215)
* **linting:** fix linting errors introduced with eslint-config-xo ([389e07b](https://github.com/micromata/baumeister/commit/389e07b))
* update dev dependencies ([d96c53e](https://github.com/micromata/baumeister/commit/d96c53e))
* update dev dependencies ([b072aa8](https://github.com/micromata/baumeister/commit/b072aa8))
* **linting:** fix stylelint errors ([62a4087](https://github.com/micromata/baumeister/commit/62a4087))
* **settings:** revert generateBanners setting to false ([68eebf5](https://github.com/micromata/baumeister/commit/68eebf5))


### Code Refactoring

* **bundling:** Replace Browserify with Webpack ([eb96f75](https://github.com/micromata/baumeister/commit/eb96f75)), closes [#209](https://github.com/micromata/baumeister/issues/209) [#211](https://github.com/micromata/baumeister/issues/211)


### Features

* **linting:** Add eslint rules to ensure consistent filenames ([#201](https://github.com/micromata/baumeister/issues/201)) ([82e24a8](https://github.com/micromata/baumeister/commit/82e24a8)), closes [#197](https://github.com/micromata/baumeister/issues/197)
* **settings:** Move settings to baumeister.json ([c4029a4](https://github.com/micromata/baumeister/commit/c4029a4)), closes [#212](https://github.com/micromata/baumeister/issues/212) [#213](https://github.com/micromata/baumeister/issues/213)
* **transpiling:** Transform `async/await` using regenerator ([91cd23c](https://github.com/micromata/baumeister/commit/91cd23c)), closes [#207](https://github.com/micromata/baumeister/issues/207)


### BREAKING CHANGES

* **linting:** The new major version of `stylelint-config-standard` introduces
some new rules which might break your build. Therefore you might
need to adapt your code or disable unwanted rules in `.stylelintrc.json`.
* **bundling:** The bundles are renamed (and partly removed) to: `app/polyfills.bundle.js`, `app/vendor.bundle.js` and `app/app.bundle.js` and must be included via script tags in that order. See [default.hbs](https://github.com/micromata/Baumeister/blob/e6346738f472ee57a204dbbf400f29924965abea/src/handlebars/layouts/default.hbs#L48-L61).
* **settings:** Settings moved from `package.json` to the new `baumeister.json` config file in the project root. In addition the two boolean settings `useHandlebars` and `generateBanners` from `gulp/config.js` are also exposed to the `baumeister.json`.
* **linting:** `eslint-plugin-filenames` will cause linting errors in case you already have JavaScript files with filenames written in camelCase. You have to rename those files or change/disable the rule `filenames/match-exported` in `.eslintrc.json` depending on your preference.

<a name="1.1.0"></a>
# [1.1.0](https://github.com/micromata/baumeister/compare/1.0.3...1.1.0) (2017-07-31)


### Bug Fixes

* **release:** Bump version number in package-lock.json as well ([78ab99a](https://github.com/micromata/baumeister/commit/78ab99a))


### Features

* Set polyfills via core-js ([#194](https://github.com/micromata/baumeister/issues/194)) ([05a8f90](https://github.com/micromata/baumeister/commit/05a8f90))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/micromata/baumeister/compare/1.0.2...1.0.3) (2017-07-29)


### Bug Fixes

* indentation in stylelintrc ([c5dbc1a](https://github.com/micromata/baumeister/commit/c5dbc1a))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/micromata/baumeister/compare/1.0.1...1.0.2) (2017-07-26)


### Bug Fixes

* **stylelint:** Ignore Sass @-rules and directives ([fecf229](https://github.com/micromata/baumeister/commit/fecf229))
* Update dependencies ([6d15031](https://github.com/micromata/baumeister/commit/6d15031))
* Update dependencies ([33a1de4](https://github.com/micromata/baumeister/commit/33a1de4))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/micromata/baumeister/compare/1.0.0...v1.0.1) (2017-06-25)


### Bug Fixes

* Fix installation with npm5 by installing htmlprocessor ([b2d626d](https://github.com/micromata/baumeister/commit/b2d626d))
* **gulp:** Consistent use of settings variables ([b9c723c](https://github.com/micromata/baumeister/commit/b9c723c))
* Follow conventional commits specs in release commits ([e682512](https://github.com/micromata/baumeister/commit/e682512))
