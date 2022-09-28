module.exports = {
    transpileDependencies: [
      'vuetify'
    ],
    lintOnSave: false,
    devServer: {

      proxy: '',
      port:"3000"
    },
    configureWebpack: {
      optimization: {
        splitChunks: {
          minSize: 10000, // la taille minimum par paquet
          maxSize: 200000, // la taille maximum ... 
        }
      }
    }
  }