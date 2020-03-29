module.exports = function(config) {
  config.addWatchTarget('./src/_sass/');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats : ['njk', 'md', '11ty.js'],
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
