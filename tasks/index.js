/* eslint-disable import/no-extraneous-dependencies */
// const gulp = require('gulp');
// const webpack = require('webpack-stream');
// gulp.task('default', function() {
//   return gulp.src('src/server/srcServer.js')
//     .pipe(webpack({
//       // Any configuration options...
//     }))
//     .pipe(gulp.dest('dist/'));
// });

import { series } from 'gulp';
import lint from './gulpLint';
import startNodemon from './gulpNodemon';
import webpack from './webpackTask';

// // BrowserSync Reload
// // function browserSyncReload(done) {
// //   browserSync.reload({
// //     stream: true
// //   });
// //   done();
// // }

// // Clean assets
// // function clean() {
// //   return del(["./_site/assets/"]);
// // }

const dev = series(lint, webpack, startNodemon);
export default dev;
