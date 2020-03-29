module.exports = ctx => ({
  plugins: {
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? {} : false
  }
});
