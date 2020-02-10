var path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 12000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/resource/icon/d-icon.png"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js$/,
      exclude: /node_modules/
    })],
  }
}
