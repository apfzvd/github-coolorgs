var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var loadCssModules = function (env) {
  if (env !== 'production') {
    return [
      {loader: 'style-loader'},
      {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'},
      {loader: 'postcss-loader', options: {
        plugins: () => [
          require('autoprefixer')()
        ]
      }}
    ]
  } else {
    return ExtractTextPlugin.extract([
      {loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]'},
      {loader: 'postcss-loader', options: {
        plugins: () => [
          require('autoprefixer')()
        ]
      }}
    ])
  }
}

var loadCss = function (env) {
  if (env !== 'production') {
    return [
      {loader: 'style-loader'},
      {loader: 'css-loader'}
    ]
  } else {
    return ExtractTextPlugin.extract('css-loader')
  }
}

module.exports = {
  entry:['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],

  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: loadCssModules(process.env.NODE_ENV)
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/'),
        use: loadCss(process.env.NODE_ENV)
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
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
      pages: path.resolve(__dirname, 'src/js/pages/'),
      utils: path.resolve(__dirname, 'src/js/utils/')
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
