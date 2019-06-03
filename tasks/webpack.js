/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import process from 'process';

const isProduction = (process.env.NODE_ENV === 'production');

const config = {

//   entry: './js/main.js',
  entry: './src/srcServer.js',

  output: {
    filename: './src/bundle.js',
    path: path.resolve(__dirname, '../build')
  },

  context: path.resolve(__dirname, '../build'),

  plugins: isProduction ? [new webpack.optimize.UglifyJsPlugin()] : []
};


function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err);

    console.log(stats.toString({ /* stats options */ }));

    resolve();
  }));
}

module.exports = { config, scripts };
