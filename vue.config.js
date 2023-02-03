/*
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-01-31 17:15:58
 */
const path = require("path");
const { defineConfig } = require("@vue/cli-service");
const PORT = 9898

module.exports = defineConfig({
  lintOnSave:false,
  devServer: {
    port: PORT,
    open: 'http://localhost:' + PORT,  // 自动打开浏览器
},
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
    .set('~', __dirname)
    .set('@', path.resolve(__dirname, 'src/')),
    // 使用自定义 loader
    config.module
      .rule("md-loader")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("md-loader")
      .loader(path.join(__dirname, "./md-loader/index.js"))
      .end();
  },
  css: {
    loaderOptions: {
      sass:{
        additionalData: `@import "src/assets/css/_var.scss";`
      },
      scss: {
        additionalData: `@import "src/assets/css/_var.scss";`
      },
    }
  },
});
