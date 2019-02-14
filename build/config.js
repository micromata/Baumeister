import path from 'path';
import cosmiconfig from 'cosmiconfig';

const explorer = cosmiconfig('baumeister', {
  searchPlaces: ['package.json', '.baumeister.json', 'baumeister.json']
});

export const userSettings = explorer.searchSync(path.resolve(__dirname, '../'));

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
