const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      //全局加载scss
      patterns: [
        path.resolve(__dirname, "./src/styles/_keyframes.scss"),
        path.resolve(__dirname, "./src/styles/_variables.scss"),
        path.resolve(__dirname, "./src/styles/_transitions.scss"),
      ],
    },
  },
  configureWebpack() {
    return {
      resolve: {
        //路径别名，可以在import中直接用
        alias: {
          "@": path.join(__dirname, "src"),
        },
      },
    };
  },
});
