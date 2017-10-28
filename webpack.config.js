var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebapckPugPlugin = require('html-webpack-pug-plugin');

const config = {
  entry: {
    first: './pages/first/app.js',
    second: './pages/first/app.js',
  },
  output: {
    filename: '[name]/[name].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filetype: 'pug',
      filename: '../views/first.pug',
      template: './pages/first/first.pug',
      excludeChunks: ['first'],
    }),
    new HtmlWebapckPugPlugin(),
  ],
};

module.exports = config;