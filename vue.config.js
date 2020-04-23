const path = require("path");
const name = "cd-admin";
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "",
  assetsDir: "static",
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
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          elementUI: {
            name: "chunk-elementUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
  runtimeCompiler: true,
};
