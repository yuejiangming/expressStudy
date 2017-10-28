let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebapckPugPlugin = require('html-webpack-pug-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let WebpackGenerator = require('./webpack.generator');

let generator = new WebpackGenerator();

generator.pluginSet;


const config = {
  entry: generator.entry,
  output: {
    filename: '[name]/[name].js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    ...generator.pluginSet,
    new HtmlWebapckPugPlugin(),
    new ExtractTextPlugin("[name]/style.css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      axios: 'axios',
    }),
  ],
};

module.exports = config;