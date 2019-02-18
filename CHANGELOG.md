# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.0.0"></a>
# [4.0.0](https://github.com/micromata/baumeister/compare/3.1.0...4.0.0) (2019-02-18)


### Bug Fixes

* Add missing dev dependency ([f8b022a](https://github.com/micromata/baumeister/commit/f8b022a))
* Fix linting errors introduced by updating ESLint, plugins and configs ([6af486a](https://github.com/micromata/baumeister/commit/6af486a))
* Initially lint files with npm start ([57d1374](https://github.com/micromata/baumeister/commit/57d1374))
* Loading images via webpack ([44eb628](https://github.com/micromata/baumeister/commit/44eb628))
* Resolve error running tests on Node 6 ([16b9114](https://github.com/micromata/baumeister/commit/16b9114))
* Update webpack and webpack-cli to fix build errors ([023afe7](https://github.com/micromata/baumeister/commit/023afe7)), closes [#264](https://github.com/micromata/baumeister/issues/264)


### Features

* Auto format code using prettier as pre-commit hook ([1557458](https://github.com/micromata/baumeister/commit/1557458))
* Enable to define baumeister config in package.json ([#270](https://github.com/micromata/baumeister/issues/270)) ([217bdd2](https://github.com/micromata/baumeister/commit/217bdd2)), closes [#246](https://github.com/micromata/baumeister/issues/246)
* Move tooling configs to package.json ([ab6594c](https://github.com/micromata/baumeister/commit/ab6594c)), closes [#270](https://github.com/micromata/baumeister/issues/270)
* Update ESLint, plugins and shared configs to their latest versions ([bee2cba](https://github.com/micromata/baumeister/commit/bee2cba))
* Update husky to v1.x.x ([63238ad](https://github.com/micromata/baumeister/commit/63238ad))
* Update Jest to v24.x.x and Babel to v7.x.x ([6e1122c](https://github.com/micromata/baumeister/commit/6e1122c))
* Update production dependencies ([1384a3a](https://github.com/micromata/baumeister/commit/1384a3a))


### BREAKING CHANGES

* feat: Auto format code using prettier as pre-commit hook

  This commit introduces a new dev dependency which requires Node.JS `>= 8.6`

  We are using [prettier](https://prettier.io) to format JavaScript, JSON and SCSS files automatically before you commit your files to Git via a pre-commit hook.

  The prettier settings are defined in `.prettierrc` in the project root. In case prettier is to opinated for you or you don’t want Prettier to change your files without the chance to review the changes you just have to delete the pre-commit hook with in the `package.json`:

  ```json
  "husky": {
    "hooks": {
      "post-merge": "npm install",
      "pre-commit": "lint-staged"
    }
  }
  ```

  But we totally recommend you to give this workflow a chance, because it’s just one more thing you don’t have to care about.
* feat: Update husky to v1.x.x

  You need to update the husky config which can be autmated by running `./node_modules/.bin/husky-upgrade`. See <https://github.com/typicode/husky#upgrading-from-014> for details.
* feat: Update ESLint, plugins and shared configs to their latest versions

  This might break your build since new versions have introduced new rules which might introduce linting errors in your code base.

  Tip: Run `npm run eslint:fix` to see which errors are autofixable. And remenber to turn off rules in /.eslintrc.json in case you find them too opinionated.



<a name="3.1.0"></a>
# [3.1.0](https://github.com/micromata/baumeister/compare/3.0.1...3.1.0) (2018-05-03)


### Bug Fixes

* bring back object-rest-spread babel plugin for client code ([4b0ca35](https://github.com/micromata/baumeister/commit/4b0ca35))


### Features

* Add interactive menu to list and run the most important scripts ([37c36e9](https://github.com/micromata/baumeister/commit/37c36e9))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/micromata/baumeister/compare/3.0.0...3.0.1) (2018-04-26)


### Bug Fixes

* Improve quality of source maps ([e6d22dd](https://github.com/micromata/baumeister/commit/e6d22dd))
* Make it possible to use nested pages ([5e533ba](https://github.com/micromata/baumeister/commit/5e533ba))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/micromata/baumeister/compare/3.0.0-beta.1...3.0.0) (2018-04-04)


### Code Refactoring

* **scripts:** serve build via `npm run build:serve` ([ce2cc70](https://github.com/micromata/baumeister/commit/ce2cc70))


### Features

* add PRODUCTION constant to ESLint config ([bb0c954](https://github.com/micromata/baumeister/commit/bb0c954))
* improve the cacheability of the vendor bundle ([735f2e6](https://github.com/micromata/baumeister/commit/735f2e6))
* reduce noise in terminal (especially in watch mode) ([90a84bd](https://github.com/micromata/baumeister/commit/90a84bd))
* setup Babel plugin transform-imports ([da517ed](https://github.com/micromata/baumeister/commit/da517ed))
* setup tree shaking ([90561f9](https://github.com/micromata/baumeister/commit/90561f9))


### BREAKING CHANGES

* **scripts:** Change the npm script name fpr serving the dist directory from `npm run build:check ` to `npm run build:serve`
* The webpack runtime has moved into a separate file. Therefore you need to add a reference to that file into your HTML / Handlebars file(s) before the vendor bundle:

  ```html
  <!-- webpack runtime JS -->
  @@runtime.js
  
  <!-- Vendor JS -->
  @@vendor.js
  
  <!-- Own JS -->
  @@app.js
  ```
  
  See <https://developers.google.com/web/fundamentals/performance/webpack/use-long-term-caching#webpack_runtime_code> for details about the why.



<a name="3.0.0-beta.1"></a>
# [3.0.0-beta.1](https://github.com/micromata/baumeister/compare/3.0.0-beta.0...3.0.0-beta.1) (2018-03-21)


### Bug Fixes

* Open webpack dev server with --host flag ([8ffcc18](https://github.com/micromata/baumeister/commit/8ffcc18))
* Referencing fonts from within Sass files ([cefe987](https://github.com/micromata/baumeister/commit/cefe987)), closes [#236](https://github.com/micromata/baumeister/issues/236)


### Features

* Dynamically import and lazy load polyfills ([00aa0de](https://github.com/micromata/baumeister/commit/00aa0de)), closes [#235](https://github.com/micromata/baumeister/issues/235)



<a name="3.0.0-beta.0"></a>
# [3.0.0-beta.0](https://github.com/micromata/baumeister/compare/2.0.2...3.0.0-beta.0) (2018-02-15)


### Code Refactoring

* **baumeister.json:** Rename properties related to vendor files ([7ac3de1](https://github.com/micromata/baumeister/commit/7ac3de1))


### Features

* remove Yarn lockfile 👋🏻 ([0d4cd1b](https://github.com/micromata/baumeister/commit/0d4cd1b))
* **eslint:** Simplify setup and include two additional plugins ([57219c3](https://github.com/micromata/baumeister/commit/57219c3))
* **build:** Replace Gulp with webpack (and npm scripts) ([b91adea](https://github.com/micromata/baumeister/commit/b91adea))
* **bootstrap:** Upgrade to Bootstrap 4 ([e4680b5](https://github.com/micromata/baumeister/commit/e4680b5))


### BREAKING CHANGES

* **build:** Gulp and all the tasks are gone. But most of the npm scripts still do what they did before. Here are the main scripts needed for developing and building your project.

  | Command                 | Description |
  | ----------------------- | --- |
  | `npm start`             | *Builds for development, starts a webserver, watches files for changes, rebuilds incremental and reloads your browser.* |
  | `npm test`              | *Lints your JavaScript files and runs unit test via the Jest CLI.* |
  | `npm run test:watch`    | *Runs unit test with Jests watch option.* |
  | `npm run build`         | *Builds for production to `dist` directory.* |
  | `npm run build:check`   | *Starts a static fileserver serving the `dist` directory.* |
  | `npm run build:analyze` | *Starts »webpack bundle analyzer« to visualize size of webpack output files* |

  See `package.json` `scripts` section for all available scripts.

* **build:** The polyfills bundle is gone and the references to the bundles in `default.hbs` has changed to:
  ```html
  <!-- Bundled vendor CSS files -->
  @@vendor.css

  <!-- Our compiled and merged Sass files -->
  @@app.css

  […]

  <!-- Vendor JS -->
  @@vendor.js

  <!-- Own JS -->
  @@app.js
	```

* **eslint:** This adds [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) and the [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) which might introduce new linting errors. You might want to turn off rules in `/.eslintrc.json` in case you find them too opinionated.

* **baumeister.json:** The properties `bundleCSS` and `includeStaticFiles` in baumeister.json are moved to `vendor.bundleCSS` and `vendor.includeStaticFiles`. You have to adapt these changes in case you have added dependencies via these properties.

* **bootstrap:** See [Bootstrap v4 migration guide](https://getbootstrap.com/docs/4.0/migration/) to read about the most notable as well as breaking changes.

<a name="2.0.2"></a>
## [2.0.2](https://github.com/micromata/baumeister/compare/2.0.1...2.0.2) (2018-02-11)


### Bug Fixes

* adapt breaking changes of updated dev dependencies ([9c2ff57](https://github.com/micromata/baumeister/commit/9c2ff57))
* copy additional directories in src/assets to build directories ([376d729](https://github.com/micromata/baumeister/commit/376d729))
* update dependencies ([d60d3e1](https://github.com/micromata/baumeister/commit/d60d3e1))

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

* **bundling:** Replace Browserify with webpack ([eb96f75](https://github.com/micromata/baumeister/commit/eb96f75)), closes [#209](https://github.com/micromata/baumeister/issues/209) [#211](https://github.com/micromata/baumeister/issues/211)


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
