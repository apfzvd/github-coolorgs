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
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract([
          {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'},
        ])
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/'),
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      js: path.resolve(__dirname, 'src/js/'),
      common: path.resolve(__dirname, 'src/js/common/'),
      pages: path.resolve(__dirname, 'src/js/pages/')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/templates/index.html')
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, '/build')
  }
}
