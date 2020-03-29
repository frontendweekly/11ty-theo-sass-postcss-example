const path = require('path');
const fs = require('fs');

const sass = require('sass');
const theoImporter = require('../../_theo-importer');

const postcss = require('postcss');
const postcssConfig = require('postcss-load-config');
const {plugins} = postcssConfig.sync();

const fileName = {
  sass: 'main.scss',
  css: 'main.css',
};

const rawFilepath = path.join(__dirname, `./${fileName.sass}`);
const prodDistpath = path.join(__dirname, '../_includes/assets/styles/main.css');

const sassResult = sass
  .renderSync({
    file: rawFilepath,
    outputStyle: 'expanded',
    importer: [theoImporter],
  })
  .css.toString();

if (process.env.ELEVENTY_ENV === 'production') {
  console.log(`Writing CSS to ${prodDistpath}...`);
  fs.writeFileSync(prodDistpath, sassResult);
}

module.exports = class {
  data() {
    return {
      permalink: `_css/${fileName.css}`,
    };
  }

  render(data) {
    return postcss(plugins)
      .process(sassResult, {
        from: rawFilepath,
      })
      .then((result) => result.css);
  }
};
