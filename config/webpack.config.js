const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: path.join(process.cwd(), "src", "index.js"),
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },
  devtool: "nosources-source-map",
  target: "web",
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Nginx test",
      inject: "body",
      template: path.join(process.cwd(), "src", "index.html"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};