module.exports = {
  chainWebpack: config => {
    config.module
    .rule('mjs$') // fixes https://github.com/graphql/graphql-js/issues/1272
    .test(/\.mjs$/)
      .include
      .add(/node_modules/)
      .end()
    .type('javascript/auto');
  },
}