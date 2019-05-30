/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { config as webpackConfig } from './webpack';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

export default function server() {
  const config = {
    // server: 'site',
    server: 'src/srcServer.js',
    middleware: [
      // enables BrowserSync to process what was defined as entry in webpack.js
      webpackDevMiddleware(bundler, { /* options */ }),
    //   webpackHotMiddleware(bundler)
    ]
  };

  browser.init(config);

  // gulp.watch('site/*.js').on('change', () => browser.reload());
  gulp.watch('src/*.js').on('change', () => browser.reload());
}
