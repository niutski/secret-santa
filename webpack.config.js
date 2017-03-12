const path = require('path');

module.exports = {
  entry: './api/fb/handler.js',
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'handler.js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
