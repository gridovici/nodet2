/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import process from 'process';

const isProduction = (process.env.NODE_ENV === 'production');

export const config = {

  // entry: './js/main.js',
  //   entry: './srcServer.js',

  entry: {
    main: [
      './srcServer.js',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },

  //   plugins: [
  //     new webpack.HotModuleReplacementPlugin()
  //   ],

  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, '../src')
  },

  // Necessary to set all paths relative to src folder, otherwise it would
  // start from tasks folder which would lead to confusion
  context: path.resolve(__dirname, '../src'),

  plugins: isProduction
    ? [new webpack.optimize.UglifyJsPlugin()]
    : [new webpack.HotModuleReplacementPlugin()]
};

export function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err);

    console.log(stats.toString({ /* stats options */ }));

    resolve();
  }));
}

// module.exports = { config, scripts };
