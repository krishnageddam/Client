module.exports = {
  css: {
    extract: {
      filename: 'css/app.css',
      chunkFilename: 'css/chunk-app.css',
    },
  },
  configureWebpack: {
    output: {
      filename: 'js/app.js',
      chunkFilename: 'js/chunk-app.js',
    }
  },
  outputDir:'dist',
};