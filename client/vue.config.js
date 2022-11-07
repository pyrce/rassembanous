const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
module.exports = {
    transpileDependencies: [
      'vuetify'
    ],
    lintOnSave: false,
    devServer: {
      allowedHosts: 'all',
      proxy: '',
      port:"3000"
    } ,
    outputDir: "./dist",
    publicPath:  '/',
    assetsDir: "assets",
  }