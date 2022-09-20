module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/styles.scss";
        `
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
};
