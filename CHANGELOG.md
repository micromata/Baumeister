# Changelog

## Version 3.0.1 (2017-04-14)

- 620c367 - 2017-04-14: Use jQuery placeholder plugin for oldIEs 
- 2077df4 - 2017-03-29: Fix path to logo in readme 


## Version 3.0.0 (2017-03-29)

- c644ffb - 2017-03-29: Last readme tweaks before 3.0.0 
- 2d3469c - 2017-03-28: Update docs regarding libs 
- 08d4283 - 2017-03-28: Fix path to Bootstraps fonts 
- 923492a - 2017-03-28: Store client.js and vendor.js in different directories 
- 6f6ea52 - 2017-03-28: Rename `node_modules` to `libs` for dev and production build 
- a104e08 - 2017-03-29: Add Yarn lock file 
- ddd9b9d - 2017-03-29: Replace `babel-preset-latest´ with `babel-preset-env 
- 211b350 - 2017-03-29: Add ESLint security plugin 
- b5eb3b3 - 2017-03-28: Add dependency status badge 
- 261cc2a - 2017-03-28: Cleanup README and remove .jshintrc 
- 275786e - 2017-03-28: Bump version to latest release from master branch 
- 8a855f0 - 2017-03-28: Remove rests of compress tasks 
- 09fca74 - 2017-03-28: Configure ESlint rule capitalized-comments as warning 
- 7c1071e - 2017-03-28: Remove client.min.js 
- 06629f7 - 2017-03-28: Remove handlebars sources from build 
- f6852f3 - 2017-03-28: Fix build task without running dev task previously (#123) 
- 75085ed - 2017-03-27: Fix delivering polyfills for oldIEs 
- 1e1afea - 2017-03-27: Move JS files from `src/assets/js` to `src/app` 
- f8e1f69 - 2017-03-27: Define static files to get copied in package.json 
- 6b303c2 - 2017-03-27: Use `src` directory to store source files 
- 0d031b4 - 2017-03-27: Alias most important Grunt tasks to npm run scripts (#120) 
- db17d5f - 2017-03-27: Reduce bundle file size (#118) 
- 7bcdaf9 - 2017-03-25: Fix output of `grunt tasks` 
- 8d8241f - 2017-03-25: Rename release tasks and checkBuild task 
- 6812a38 - 2017-03-22: Optimize font rendering on High resolution displays (#103) 
- aed841a - 2016-10-26: Edit the banner 
- bd70d20 - 2016-10-18: Add config to set the banner content of production files 
- 897b0a1 - 2016-09-17: Lint .postinstall.js 
- e07400c - 2017-03-24: Add cache bust plugin and config for dev and prod build (#104) 
- 7c79fbe - 2017-03-22: Optimize font rendering on High resolution displays (#103) 
- 3ab633a - 2017-03-22: Remove Grunt tasks: `plato` as well as `david` 
- 616ed53 - 2017-03-22: Fix linting error 
- 558c9f1 - 2017-03-22: Remove bower related files and contents (#109) 
- 934f2ff - 2017-03-22: Bring back base.js (#110) 
- 2b99b11 - 2017-03-22: Update travis config 
- e7a3757 - 2017-03-22: Fix linting errors introcuded by dependency updates 
- 0c97be1 - 2017-03-22: Update dev dependencies 
- 6a7cd59 - 2017-03-22: Update frontend dependencies 
- 015b25d - 2017-03-20: Remove temporary dependencies 
- f5e40ff - 2017-03-22: Update description of handling and bundling external libraries (#114) 
- da03b4a - 2016-04-17: Release v2.2.0 
- 552b192 - 2016-04-17: Add eslint:fix task and use it in watch tasks 
- 6c48a2e - 2016-04-17: Update bower dependencies 
- 3e216fb - 2016-04-17: Update dev dependencies 
- 0cf92d6 - 2016-04-15: Add tolerance option for grunt newer 
- 55a6938 - 2016-04-15: Fix broken travis node v0.12 and v4 builds 
- 7e504ee - 2016-04-15: Update dev dependencies 
- 71c8c1a - 2016-04-15: Update ESLint config (#90) 
- d87d54b - 2016-04-13: Save select2-bootstrap-css dependency inside package.json. 
- 29eb717 - 2016-04-13: Add select2 as example for additional frontend dependency css. 
- c2bf4f5 - 2016-04-13: Refactor the integration of additional css dependencies. 
- 138ece6 - 2016-04-08: Remove parcelify. 
- d8d66b6 - 2016-04-08: Add the ability to define css of frontend dependencies inside the package.json 
- a45288d - 2016-04-08: Remove unused modules for more clarity. 
- 0f0459b - 2016-04-06: Add parcelify as dev-dependency. 
- bb431f8 - 2016-03-20: Release v2.1.2 
- 20671b7 - 2016-03-20: Fix travis error regarding Java version 
- 3b2d8ca - 2016-03-20: Update jQuery to the latest 1.x 
- 32cacee - 2016-03-20: Run `.postinstall.js`explicitly with node 
- 9377ee1 - 2016-03-20: Upgrade dev dependencies 
- bd4f8eb - 2016-02-05: Add René Viering 
- d175fac - 2016-04-05: Stop on bootlint error. 
- 2649ed0 - 2016-04-05:  Relax bootlint error »Unable to locate jquery«. 
- 93d4c06 - 2016-04-05: Remove react, use minimal dependencies required by bootstrap. 
- e4c2629 - 2016-04-05: Require jquery and bootstrap inside the module. 
- 7382faf - 2016-04-05: Remove dependencyConfiguration, all frontend dependencies are loaded via browserify. 
- 287de0c - 2016-03-18: Watch client changes in development mode. 
- a4fa326 - 2016-02-05: Minify and concatenate all browserify outputs on »grunt build«. 
- 0e1255c - 2016-02-05: Add some test modules. 
- 190fd9a - 2016-02-05: rebundle all js in assets with browserify on change. 
- c849f2a - 2016-02-05: Add some npm modules for testing purpose. 
- 0947365 - 2016-02-05: Remove old js modules inside assets. 
- f1b7065 - 2016-02-05: Add browserify task configuration. 
- f1f6347 - 2016-02-05: Add dependencies grunt-browserify and babelify. 
- 5da708a - 2016-02-05: Use correct sourceMap property. 
- ee1723e - 2016-02-05: Run security task inside »grunt build«. 
- 15158a3 - 2016-02-01: Add some documentation. 
- 85d287a - 2016-02-01: Use npm instead of bower for frontend dependencies. 
- 25a3784 - 2016-02-01: Extract dependencyConfiguration, to easily add dependencies. 
- a0d1e67 - 2015-12-23: Load all »bower-dependencies« from npm. 
- 97a7162 - 2015-12-23: Add david-dm as grunt-task. 
- b2af335 - 2015-12-23: Integrate nsp to check node modules for vulnerabilities. 


## Version 2.3.1 (2016-10-26)

- 9b7051b - 2016-10-26: Edit the banner 


## Version 2.3.0 (2016-10-19)

- e1cd58b - 2016-10-19: Add config to make usage of sourcemaps in production files optional (#100) 
- ab5ee14 - 2016-10-18: Add config to set the banner content of production files 
- d11a614 - 2016-10-07: Fixed an internal Link (#96) 


## Version 2.2.1 (2016-09-17)

- ba01634 - 2016-09-17: Update bower dependencies 
- 588a6e4 - 2016-09-17: Remove node 0.12 from travis config 
- 783efe5 - 2016-09-17: Lint .postinstall.js 
- ee64d76 - 2016-09-17: Update dev dependenencies 
- c8723e8 - 2016-08-31: Update travis config 
- 4728a9e - 2016-08-31: Fix bundling vendor css 


## Version 2.2.0 (2016-04-17)

- 42291af - 2016-04-17: Add eslint:fix task and use it in watch tasks 
- de32903 - 2016-04-17: Update bower dependencies 
- 62093f7 - 2016-04-17: Update dev dependencies 
- 16c039b - 2016-04-15: Add tolerance option for grunt newer 
- 8a20487 - 2016-04-15: Fix broken travis node v0.12 and v4 builds 
- c74cfd5 - 2016-04-15: Update dev dependencies 
- 47bf5c6 - 2016-04-15: Update ESLint config (#90) 


## Version 2.1.2 (2016-03-20)

- c3be486 - 2016-03-20: Fix travis error regarding Java version 
- e1117ec - 2016-03-20: Update jQuery to the latest 1.x 
- e2ce134 - 2016-03-20: Run `.postinstall.js`explicitly with node 
- bfdbdfa - 2016-03-20: Upgrade dev dependencies 
- c2a45b3 - 2016-02-05: Add René Viering 
- 0ec2ae9 - 2016-01-09: Update dev dependencies 
- 32e6bcb - 2016-01-09: Update Bower dependencies 


## Version 2.1.1 (2015-12-20)

- 589bc61 - 2015-12-20: ignore tooltip css in uncss 


## Version 2.1.0 (2015-12-18)

- 654af98 - 2015-12-18: Remove comments from html files in dist directory 
- 85d14b4 - 2015-12-18: Fix imagemin task 
- 4a81787 - 2015-12-17: Add SVG files to imagemin task 
- 900f957 - 2015-12-11: Extend default options of uncss task 
- f79dbc7 - 2015-12-11: Add Gitter badge 
- d4755ed - 2015-12-11: Add gitter webhook to travis config 
- a906c60 - 2015-11-30: Prevent errors on travis build 


## Version 2.0.3 (2015-11-30)

- 5832c2a - 2015-11-30: Fix updating html files for browser sync 
- e49e6a2 - 2015-11-20: Another attempt to run grunt tasks on Travis 
- 469d1fe - 2015-11-20: Fix .travis.yml :neckbeard: 
- 78d857e - 2015-11-20: Install grunt cli for travis build 
- e7c42f5 - 2015-11-20: Fix .travis.yml and add travis badge 
- b97baa5 - 2015-11-20: Use Travis to check if grunt tasks run properly … 
- bd9e3fb - 2015-11-18: Update dev dependencies 


## Version 2.0.2 (2015-11-17)

- 78f8ed4 - 2015-11-17: Fix path to server for browser sync task 
- 730abcd - 2015-11-17: Fix linting errors 
- 926b120 - 2015-11-17: Update Bower dependencies 
- 0db322e - 2015-11-17: Pin Bower dependencies 
- 3c3b11c - 2015-11-17: Update dev dependencies 
- 1cd01b0 - 2015-11-17: Fix whitespace »issue« 
- a453b67 - 2015-11-02: fix typo 
- 67f275f - 2015-10-16: Fix whitespace »issue« 
- cbc65b4 - 2015-10-03: Remove JSHint leftovers :bowtie: 


## Version 2.0.1 (2015-10-03)

- 48adedb - 2015-10-03: Bump dev dependencies 
- 1a967a0 - 2015-10-02: chore(package): pin dependencies 
- 5eecf26 - 2015-09-30: Fixed typographical error, changed accross to across in README. 


## Version 2.0.0 (2015-09-22)

- e2552dc - 2015-09-22: Minor tweaks in README 
- a10729e - 2015-09-21: Make use of libs/libs.min.css in default template 
- e2502c3 - 2015-09-21: Rename libs.js/libs.css to libs.min.js/libs.min.css 
- da55de8 - 2015-09-21: Try to prevent horizontal scrollbar for markup example tree 
- 394631b - 2015-09-21: Add »Table of Contents« to README 
- 34c3a7c - 2015-09-21: Update section »Setting up your Editor« in README 
- b650811 - 2015-09-21: Move up »File and folder structure of LESS files« in README 
- 780ccf2 - 2015-09-21: Remove unneeded `template: default` from Frontmatters 
- 325e609 - 2015-09-21: Add info about pages, templates and partials to README 
- b199a20 - 2015-09-21: Make watching handlbars templates more performant 
- 11a74e6 - 2015-09-21: DocBlock comment for our example helper 
- 39150d3 - 2015-09-20: Remove plato and jsdoc tasks from dev task 
- 9a3ad3a - 2015-09-20: cleanup base.js 
- c5ba5cd - 2015-09-20: Highlight current page in navbar 
- 93e8428 - 2015-09-20: Add file for custom helpers 
- 13c1754 - 2015-09-18: Render handlebars template to the correct location 
- 16fb7bf - 2015-09-17: [WIP] Replace HTML files with handlebars templates, partials and pages 
- 644d395 - 2015-09-17: [WIP] Give grunt-generator a try for handling includes 
- 4ffe264 - 2015-09-15: Improve use of variables in footer example 
- b8d546a - 2015-09-13: Lint .postinstall.js and fix linting errors 
- 37ec1ca - 2015-09-13: Redisable »padded-blocks« rule :sunglasses: 
- 9569653 - 2015-09-13: Split up .eslintrc into two files to get more specific 
- c0d9f29 - 2015-09-13: Fix ESLint errors. 
- 44c4b93 - 2015-09-13: Replace JSHint wit ESLint 
- c9fe1aa - 2015-09-01: Add files to version control in release tasks 
- 6e5afc7 - 2015-09-01: Get rid separate minified JS files in `dist` 
- 96670bb - 2015-09-01: Rename `grunt server` to `grunt serve` 
- 8260bd8 - 2015-08-30: Update sublime settings example in readme 


## Version 1.3.6 (2015-08-30)

- 96b00d1 - 2015-08-30: Missed a few things in b2a6825f 


## Version 1.3.5 (2015-08-26)

- e1f404b - 2015-08-26: Update dev dependencies 


## Version 1.3.4 (2015-08-26)

- b2a6825 - 2015-08-26: Rename `customerName` with `theme` 
- a073b8c - 2015-08-26: Update variables from Bootstrap 3.3.5 
- e8f611b - 2015-08-26: Update bower components 
- 2d6088b - 2015-08-26: Make sure release tasks run properly via npm `postinstall` 
- f60e0d7 - 2015-08-20: Release tasks now commit all changed files 
- 56ef716 - 2015-08-20: Exclude moduleSkeleton.js from build 
- fc0303d - 2015-08-20: Give module.js a more appropriate name 
- fdf2dea - 2015-08-19: Copy Glyphicon fonts from Bootstrap to `dist` directory 
- 34401e5 - 2015-08-19: Fix copy paste error in LESS modules comment 
- a029ba9 - 2015-08-19: Add OS releated files to .gitignore 
- a4af926 - 2015-05-08: Fixed reduced test case link 


## Version 1.3.3 (2015-04-30)

- 03d2c76 - 2015-04-30: replaced static copyright notice with variables from package.json
- 8cfe136 - 2015-04-18: Release v1.3.2

## Version 1.3.2 (2015-04-18)

- fb3dd4b - 2015-04-18: Update dev dependencies
- dd26125 - 2015-01-26: Prevent minifying of minified sources :persevere:
- b41c075 - 2015-01-26: Fix typo
- abc8542 - 2015-01-22: Release v1.3.1

## Version 1.3.1 (2015-01-22)

- 87aaa8a - 2015-01-22: Update dependencies
- 965978e - 2015-01-21: Add Twitter badge
- ae03536 - 2015-01-20: Update Bootstrap from 3.3.1 to 3.3.2
- bb8755d - 2014-12-31: Release v1.3.0

## Version 1.3.0 (2014-12-31)

- Add missing linebreak between banner and code
- Make output paths configurable
- Update jquery-placeholder
- Get rid of hardcoded © year
- Release v1.2.0

## Version 1.2.0 (2014-12-29)

- Use `grunt-banner` to bring back CSS banners
- Concatenate and minify bower libs in production built.
- Fix git hook
- Grunt performance → Get rid of server directory and cachebusting
- Update dev dependencies.
- Use original Bootstrap JS modules in development …
- Change uglifiying tasks
- Prevent copying non minified CSS to dist directory
- Prevent copying of html files.
- Single quotes all over …
- Update Readme.
- Update Readme
- Added cd to the git install instructions
- Changed git-fork from ssh to https for non registered users
- Release v1.1.3

## Version 1.1.3 (2014-11-26)

- Fix cachebusting in conjunction with the dev server
- Change port numbers of dev servers
- Update dev dependencies
- Update homepage within package.json

## Version 1.1.2 (2014-11-13)

- Update Bootstrap from v3.3.0 to v3.3.1

## Version 1.1.1 (2014-11-10)

- Fix link to status of dev dependencies.
- Update grunt-bootlint to latest version (0.5.1)

## Version 1.1.0 (2014-11-09)

- Fire `bower install` via git post-merge hook. Closes #10
- Validate HTML and lint markup with via Bootlint
- Auto check status of dev dependencies via badge.
- Update dev dependencies.
- Update Bootstrap from 3.2.0 to 3.3.0
- Fix typo and add newline at end of file.
- Add own Print-CSS for better accessibility and readability.


## Version 1.0.3 (2014-09-22)

- Fix filename for minified JavaScript files
- Add logo
- Get rid of test images
- Copy the whole libs directory to server and dist directories
- Add »divider« comment which remains in compiled CSS
- Update release tasks
- Update README
- Add editor settings to README.md
- Update Readme
- Add keyword to bower.json
- Update bower.json


## Version 1.0.2 (2014-08-27)

- Improve Quick guide
- Fix Bower package


## Version 1.0.1 (2014-08-27)

- Get rid of `v` prefix in tags.
- Update README.md
- Fix typos in README.md


## Version 1.0.0 (2014-08-27)

- Delete headline in changelog
- Add zips to .git ignore
- Finished README for v1.0.0
- Update comments
- More logical order of importants
- Add new keyword
- Epic update of README.md
- Edit Gruntfile
- Update README
- Update bower.json
- Add reference to jquery.placeholder.js
- Remove CSS from version control
- Delete CSS from assets.
- Add more demo pages and related LESS files
- Delete TODO.md
- Update README
- Prefix tag name with »v«
- Relaxing versions of bower dependencies.
- Relaxing versions of dev dependencies.
- Add @necolas to humans.txt
- Rename LICENSE
- Update To Do


## Version 0.1.0 (2014-08-26)

- 91326b29fc3a3954fe610c948a60c510bd4d84d9 - @mischah, 2014-08-26: Release v0.1.0
- f18a8d64096d01d430a0532bd5bb92eb105a55b5 - @mischah, 2014-08-26: Add guidelines for contributing
- 8cc5ab6939985f982206a8b7a75728982e83bfe8 - @mischah, 2014-08-26: Change title
- 4d0e040c8f9363cf5e665a1cf75faaaeec623951 - @mischah, 2014-08-26: Update Release task.
- d59ea1fb508187e4fd58fcdbe7931b082ddb9cd7 - @mischah, 2014-08-26: Configure release tasks.
- 29a1a213d65d31142cd9e44206367ee81b756716 - @mischah, 2014-08-26: Add grunt-changelog
- 164d133641ecc1ad07644691993ede763f460c3a - @mischah, 2014-08-26: Fix build task.
- d35318eb6e6674821926f9a99a9b40647b9cf1d5 - @mischah, 2014-08-25: Revert "Bump version number v0.0.5"
- 6cebfc51d34374ef197d9a42568b1eb315089a3b - @mischah, 2014-08-25: Bump version number v0.0.5
- c01ca0e3c8c3d5ec1f90ef4506cc08c8f35d5404 - @mischah, 2014-08-25: Add grunt-newer
- e93823c6707d973b31d653b0c00e81375b4682d3 - @mischah, 2014-08-25: Make grunt watch work together with server
- dc72bbe8e7b4a0d0ad96e7ea65385cfb8a226734 - @mischah, 2014-08-24: Use a server directory for hosting the files.
- 6a3ebdfc4199dc6cda9e4d9bbc035537901f142b - @mischah, 2014-08-25: Update humans.txt
- 3ecbd18182c3b88a7b046c2d0e58fe284aaccbfd - @mischah, 2014-08-25: Update .editorconfig
- 42c3ce06417fb32f35dad54d69a567409aedadf0 - @mischah, 2014-08-25: Update humans.txt
- d393bd3686004d5b537389e734f5eab3f1ba345d - @mischah, 2014-08-25: Update humans.txt
- 248d5e40aaebd596c4856762d2b6834a6f9c0f46 - @mischah, 2014-08-25: Add humans.txt
- 7bc6d1d385a44e39482ab9fc91b5356e088f1fba - @mischah, 2014-08-25: Update License
- 41f6f954f1a8ac49d073c93217563e20cf26520d - @mischah, 2014-08-24: Delete Piwik code
- 91fb1553fdad00ba8a14aaee7f6afe3ae1e2234d - @mischah, 2014-08-24: Reformat HTML.
- cb2ea92c4fe9545f474f136fc79c11dcba9935c1 - @mischah, 2014-08-24: Update Comments
- 5ce1ed815b175a74093c46ee63e1680b5048ee5f - @mischah, 2014-08-24: Update To Do
- de94a8f3bf8e7b2a6ac624a52af934b6223db817 - @mischah, 2014-08-24: Update bower.json
- 2bb2b27347388aa64a600c2c79b1fc841f8df12d - @mischah, 2014-08-24: Update package.json
- a51974d27dece2680bb79dc217d0040edfc75443 - @mischah, 2014-08-24: Update To Do
- a6b03218889ed6fac772c2ccdbcd8dc0cf14dee2 - @mischah, 2014-08-22: Move html templates from assets to root
- 494b05137152a020771fb3b62362322c7e7e86be - @mischah, 2014-08-22: Add conditional classes.
- 743390bfd86f05a225e1cb59a33a47f2983b0837 - @mischah, 2014-08-22: Add placeholder polyfill to bower.json
- 45cd769eb391c1d2a0dedaecada74cfaec60420b - @mischah, 2014-08-22: »Freeze« version of bower dependencies.
- 72ec8105e887c0c3723a092d57a92dc7e9418ecd - @mischah, 2014-08-22: Update To Do
- dbf7b0a70386f68e3fdd2b9be3ec09a105ad3329 - @mischah, 2014-08-22: Update Grunt Tasks.
- 2fa3bbf4c758415ae10bb386069b3167531eac78 - @mischah, 2014-08-21: Configure bump and changelog tasks
- 83ab88fcfc90e809dd33a5bd86379be1bccaf052 - @mischah, 2014-08-21: Add grunt tasks:
- 119ecc3ec66c9e3bd15ad0340445b91954be753b - @mischah, 2014-08-21: Update To Do
- de4aee95c9cd15b51b83421ec0099042db160b96 - @mischah, 2014-08-20: Revert "Bump version number v0.0.5"
- d992b7651997c6a162341175245c2eaa9da9ed13 - @mischah, 2014-08-20: Bump version number v0.0.5
- d191801fcecb97d79894827cd4220e20fcc25a33 - @mischah, 2014-08-20: Add missing files for release task.
- 86027a750f093af55e5a92597789f1f0001e52c7 - @mischah, 2014-08-20: Update To Do.
- 537396d37fc47f1a9290bf5e2817a79dc510d4ab - @mischah, 2014-08-20: Add bootstrap fonts to dist directory.
- 16e2a9d161a5359a476545541f39fac3da2893d7 - @mischah, 2014-08-20: Enhance banners for CSS and JS files.
- 370486a02672b3eb750bf44078dfaa6396d77a57 - @mischah, 2014-08-20: Add release task to generate zip files.
- 370cb3f28cfa6d8bb447853da8ff5a54b9a1965a - @mischah, 2014-08-20: Update To Do.


##Version 0.0.4 (2014-07-14)

- b3dbc15fd5350643957b84e5dc0f86194ad0ad28 - @mischah, 2014-07-14: Update change log.
- 66fa08a8179fc52924c8b2bfb3656358c8a04f21 - @mischah, 2014-07-14: Bump version number to 0.0.4
- 9966a3a4e5deb862da4251b6e6f73b0744d48987 - @mischah, 2014-07-11: Update To Do.
- 9dc6a52f5fe1817806b38ecff0abea4423dccc30 - @mischah, 2014-07-04: Optimize browser sync setup.
- 8c28d6f7b633554590cfab6bbb6e29b7c5ed14ce - @mischah, 2014-07-04: Fix typo.
- 6c9f04a00a111d10215bb8acee746dce5767625f - @mischah, 2014-07-04: Make use of browser sync.
- 548466424cc187bde5827293cfb291d35ce59235 - @mischah, 2014-07-04: Make use of browser sync.
- e1974f8c2c601b74d6c89bf0d3b326f6406262d5 - @mischah, 2014-07-03: Update TODO.
- e37b7327b2918983fee63df5e177fe008764438e - @mischah, 2014-07-02: Run `grunt dev` before `grunt server` when using the default task.
- c80fbe4b36edefdaac06ff5699c8c2a52ac94d5f - @mischah, 2014-07-02: Busting caches.
- e940e9760a2e1cb398d1017eb197d35968ba5dd3 - @mischah, 2014-07-02: Update TODO
- d4aa8d05554d4faede08479007377ac993bff2f4 - @mischah, 2014-07-02: Set minified JS to .gitignore
- 637261d12900c1288795a8ed4797cd5ed15b24fc - @mischah, 2014-07-01: Add generic helpers.
- 1cab3901dfe9dbdbd96c012d5768efa95d8ff57d - @mischah, 2014-07-01: Improve docs of base.js
- e46e00c9f4c4b88b3a5a3a89061843db6c1cc857 - @mischah, 2014-07-01: Add To Dos.
- b1be568b78c4d8cc115b47d0825398de44aeca69 - @mischah, 2014-06-30: Add sublime settings to .gitignore
- 60b52298ed1905c774802c43395ac2b2d6bdb4bf - @mischah, 2014-06-30: Add sublime settings to .gitignore
- 9fc7f16941103a50556bce20481acfab86ad50b1 - @mischah, 2014-06-30: Use minified css in production build (instead of minified and cleaned)
- bbf9ed4c9c685015b805f447f0b1b1c123bac60d - @mischah, 2014-06-30: Delete console output from base.js
- 834ed5787a2d58124f81154e08d0b842320b962a - @mischah, 2014-06-29: Add details to bower.json
- ee58d5cf3028443c9ec02dcb85080ff03b78b3d2 - @mischah, 2014-06-29: Recompile minified js.
- 8e8c69a72e0a923fd90a6fe7550f34a174e98e0f - @mischah, 2014-06-29: Additions to package.json
- 0a8dcc00fcd55d559f07bfb9938ba7ceaf33ddf7 - @mischah, 2014-06-29: Drop console output  in production build.
- a73a3434c11fafbc15e9d0bf32e9f3e5df1ae10b - @mischah, 2014-06-29: Add plato task.
- 0c2c3cb6d7e7fd42c99810ad23f56c165c96b1e4 - @mischah, 2014-06-29: Add plato task.
- fb5ce75f75164e85940118e99f34c89dd81bf828 - @mischah, 2014-06-29: Fix module example code.
- 64af2ac52041fe42e2486bfcaba97dad4ba45af9 - @mischah, 2014-06-29: Clean .jshintrc Comments making problems with different tool.
- 515392ee6dc2827af1be641a9da8f98164425fc8 - @mischah, 2014-06-29: Add jsdoc task.
- 264eded7e59351b79913e3efe63c05d44d0739ce - @mischah, 2014-06-29: Add  »grunt-available-tasks«.
- 793b2143360e2ab20410ef9bb000e5e075a39492 - @mischah, 2014-06-29: Add local dev server.
- e18b8963a764b6adb486cfedc221c962f5b0282b - @mischah, 2014-06-29: First draft of build task.
- bde2545859f5ccbe80936270d7f64d0876cde975 - @mischah, 2014-06-29: Fix package name.
- a52123ed478e08254a58190c0ca2202196268da2 - @mischah, 2014-06-29: Install grunt-autoprefixer.
- 6daa1b0fcc39711be0fa8b386ab6f7773568d56f - @mischah, 2014-06-29: Fix banner of minified JS.
- 3d6b30e7b31e88af555ed4e9eb439ebc2c548df3 - @mischah, 2014-06-29: Add "es3" to js.hintrc to prevent problems with trailing commas up to IE8.
- 778091c9abbb13c55d2dfa3d1358f7836c7284e6 - @mischah, 2014-06-29: Run grunt.
- 5d5c2631aa501804deea57ae86b711ebf016c3d4 - @mischah, 2014-06-29: First version of grunt file. Needs work.
- 62d53edf65d8d5ed7bf9837154c481292d8d2728 - @mischah, 2014-06-29: Add "es3" to js.hintrc to prevent problems with trailing commas up to IE8.
- e89e11848ef5b2256f466ba3073d58e8bffdec36 - @mischah, 2014-06-28: Upgrade Bootstrap to new minor release 3.2.
- f1b2eaef6110961775c8548b5caf2ace4e08be5f - @mischah, 2014-06-28: Upgrade Bootstrap to new minor release 3.2.
- 85be37b92209bdc4252feda0ee763c42b6916e69 - @mischah, 2014-06-28: Refactor JavaScript:
	- Wrapping functions with base module
	- Make em pass JS
- bc00182a645c7c6978c9f84fbb8697ee22dfe9bf - @mischah, 2014-06-28: Update .gitignore
- 711d4598a3b56dd4a933bb9074fa2c8a6d35fe98 - @mischah, 2014-06-28: Add time-grunt.
- 737896a5b6f301a9302eacafaaeac71112869985 - @mischah, 2014-06-28: Update dependencies. Finetune package.json
- 4f3cc7bef5de8ef8aa902379956c3449188cc59f - @mischah, 2014-06-28: Prepare to register bower package.
- 5e108e536722b1fa7cbf2dad8c9a63e2d7af08be - @mischah, 2014-06-27: Add package.json to install grunt tasks.
- 7f217bb9c5623042f153b0dcd07079f6f7c49463 - @mischah, 2014-06-27: Update README: - Move changelog to separate file. - Add License - Fix typo


##Version 0.0.3 (2014-06-27)

- 5e7c96031229afa1d3cdc5002c5d5e3aabf7fe79 - @mischah, 2014-06-27: Bump version number.
- caadbba584b4b77a5469fff0fc3cbc2a4ea9aef1 - @mischah, 2014-06-27: Add example javascript module.
- 8721efb2a3735188127f282ef03b9bff5957dcaa - @mischah, 2014-06-26: Documentation: Get slightly more explicit.
- d3fc3245a6ff058769078a6f6724f7c06b0c72d8 - @mischah, 2014-06-26: Replace "no-us" class with "js" when JavaScript is available.
- 7ec67e779a5e721da0701abf00378ce17025f70a - @mischah, 2014-06-26: Update base.js - Add console methods for old IEs
- 56568fb08f4c56ad41ed4446df82593df2ea9bd4 - @mischah, 2014-06-26: Add config.codekit to .gitignore
- e3f978d551cbf911497ef913c3deb2557949a6f6 - @mischah, 2014-06-26: Add viewport fix according to http://getbootstrap.com/getting-started/#suppo
- 8a18da7cff1d673d8cd9b3b42792d8b384731a44 - @mfroehner, 2014-06-26: Piwik Integriert und Google Analytics entfernt

##Version 0.0.2 (2014-06-25)

- 7200f94fddaef78ac6c14718806144b6ec9f9363 - @mischah, 2014-06-25: Bump version number.
- 9804c6c15d3ad2908301551eb9a77434c8f257ca - @mischah, 2014-06-25: Update HTML Boilerplate:
	- User local resources from libs directory
	- Adapt stuff from the »HTML5 Boilerplate«
- 3dc021cb61cbe5383e0d6172088bb467208f5f9c - @mischah, 2014-06-25: Add HTML Boilerplate code from Kai.
- 1682dad62b4f43035100c4cda951e5f97cc1e846 - @mischah, 2014-06-25: Add respond.js
- d9d9a2ac8cf7ebef0fe509f2ba859fff35a13c67 - @mischah, 2014-06-25: Fix typos.
- 4f2ff9408fdb75a79ff1bde7394147ce551a1b74 - @mischah, 2014-06-25: Add html5shiv
- e57b927f46ae2e2e726acebd36e601bc9afa3944 - @mfroehner, 2014-06-25: Doppelpunkt statt Punkt ;)

##Version 0.0.1 (2014-06-25)

- Initial version
