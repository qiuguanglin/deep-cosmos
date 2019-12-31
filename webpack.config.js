var path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'index': path.resolve(__dirname, './public/index.js'),
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      chunks: ['index']
    }),
    new CopyWebpackPlugin([
      { from: 'public/resource' , to: 'resource' },
      { from: 'public/css' , to: 'css' }
    ])
  ]
}
