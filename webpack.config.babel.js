// const path = require('path');
import path from 'path';
// const webpack = require('webpack');
import  webpack from 'webpack';
// const nodeExternals = require('webpack-node-externals');
import nodeExternals from 'webpack-node-externals';
// const HtmlWebPackPlugin = require('html-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: {
    server: './src/srcServer.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server.js'
    // filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        // test: /\.html$/,
        // use: [{loader: "html-loader"}]
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        // loader: __dirname + "/../../",
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'views', 'partials')
          ]
        }
      }
    ]
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     handlebarsLoader: {}
    //   }
    // }),
    new HtmlWebpackPlugin({
      // template: './src/index.hbs',
      template: path.join(__dirname, 'src', 'index.hbs')
    })
  ]
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: "./index.html",
//       filename: "./index.html",
//       // excludeChunks will exclude a file called server which we
//       // don’t want to be included into our HTML file, since that
//       // is the webserver, and not needed in the app itself
//       excludeChunks: [ 'server' ]
//     })
//   ]
};
