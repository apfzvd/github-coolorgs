var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', { loader: 'stylus-loader' }]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/', 'templates', 'index.html')
    }),
    new ExtractTextPlugin('app.css')
  ],

  devServer: {
    contentBase: path.join(__dirname, '/build')
  }
}
