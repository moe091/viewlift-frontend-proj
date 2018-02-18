const path = require('path');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      //es6
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      //jsx
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    hot: true,
    port: 3001
  }
}