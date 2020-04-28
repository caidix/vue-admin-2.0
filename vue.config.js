const path = require("path");
const name = "cd-admin";
const pages = require('./configs/utils/entry')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pages,
  publicPath: process.env.NODE_ENV === "production"
    ? "/dist"
    : "/"
  ,
  outputDir: "dist",
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        "^": resolve("src/components"),
        "modules": resolve("src/modules")
      },
    },
  },
  chainWebpack(config) {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("cheap-module-eval-source-map");
    });
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.performance.set("hints", false);
      config.devtool("none");
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [{ inline: /runtime\..*\.js$/ }])
        .end();
      config.optimization.splitChunks({
        cacheGroups: {
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          }
        },
      });
    });
  },
  runtimeCompiler: true
};
