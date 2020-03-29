/* Stolen from https://basalt.io/blog/theo-design-tokens-using-node-sass-importer-for-any-build-method */
const { resolve, parse } = require('path');
const theo = require('theo');

/**
 * Theo Design Token Sass Importer
 * Import scss variables from Yaml files directly
 * @param {string} url - path to the file passed into import statement, i.e. `@import "design-tokens.yml";`
 * @param {string} prev - path to the file the import statement is located at, useful for calculating relative paths
 * @link <https://www.npmjs.com/package/theo>
 */
function theoImporter(url, prev) {
  // If the imported file doesn't end in `.yml` or `.yaml`, then `return null` early to tell node-sass that we're not going to do anything. It'll go on to the next function or just try to handle the import itself.

  if (!/\.ya?ml$/.test(url)) return null;

  // `prev` is the where it was imported from, we just want the directory it is in
  const prevDirectory = parse(prev).dir;
  // imports are almost always relative, so let's figure out how to get to there from here so we end up with an absolute url
  const designTokenFilePath = resolve(prevDirectory, url);

  const theoConverted = theo
    .convertSync({
      transform: {
        type: 'web',
        file: designTokenFilePath,
      },
      format: {
        // This can be any format Theo supports (or your own custom one!) <https://www.npmjs.com/package/theo#formats>
        // I'm choosing map.scss
        type: 'map.scss'
      }
    });

  return {
    contents: theoConverted
  }
}

module.exports = theoImporter;
