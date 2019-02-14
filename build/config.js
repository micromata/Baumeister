import path from 'path';
import cosmiconfig from 'cosmiconfig';
import logSymbols from 'log-symbols';
import chalk from 'chalk';

const explorer = cosmiconfig('baumeister', {
  searchPlaces: ['package.json', '.baumeister.json', 'baumeister.json']
});

export const userSettings = explorer.searchSync(path.resolve(__dirname, '../'));

if (userSettings === null) {
  console.log(
    logSymbols.error,
    `${chalk.red.bold('error')} – No Baumeister config found`,
    '\n\n',
    chalk.yellow(
      'Please see the <https://github.com/micromata/Baumeister> for info regarding the configuration file.'
    )
  );
  process.exit(1);
}

export const mainDirectories = {
  dev: '../server/',
  prod: '../dist/',
  src: '../src'
};

export const settings = {
  sources: {
    handlebars: './src/handlebars/',
    app: './src/app/',
    appTemplates: {
      directory: './src/app',
      files: '**/*.html'
    },
    assets: './src/assets'
  },
  destinations: {
    handlebars: './.metalsmith-build',
    assets: 'assets',
    appTemplates: 'app',
    vendorFiles: 'assets/vendor'
  }
};
