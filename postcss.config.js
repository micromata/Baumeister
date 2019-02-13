module.exports = ({ file, options, env }) => ({
  plugins: {
    autoprefixer: options.autoprefixer,
    /**
     * Need to disable minification when using PurifyCSS because using PurifyCSS
     * on minified CSS disn’t work out. PurifyCSS has a minify option wich is
     * used instead.
     */
    cssnano:
      env === 'production' && options.usePurifyCSS === false
        ? options.cssnano
        : false
  }
});
