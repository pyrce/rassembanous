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
    mode: 'production',
    outputDir: "./dist",
    publicPath:  '/',
    assetsDir: "assets",
  }