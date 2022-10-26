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
    } ,pages:{
      index:{
        entry: 'src/main.js',
        // the source template
        template: 'public/index.html',
      }
    }
    ,    configureWebpack: {
      plugins: [new BundleAnalyzerPlugin()]
  }
  }