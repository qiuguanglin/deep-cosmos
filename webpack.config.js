var path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './public/index.js'),
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "./public/anotherIndex.html",
      filename: "./index.html"
    }),
    new CopyWebpackPlugin([
      { from: 'public/resource' , to: 'resource' },
      { from: 'public/css' , to: 'css' }
    ])
  ]
}
