// const gulp = require('gulp');
// const browserSync = require('browser-sync');
import nodemon from 'gulp-nodemon';

function startNodemon(cb) {
  let started = false;

  return nodemon({
    script: 'src/index.js',
    tasks: ['browser-sync'],
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
}

exports.default = startNodemon;

// gulp.task(
//   'browser-sync',
//   () => {
//     browserSync.init(null, {
//       proxy: 'http://localhost:7000',
//       files: ['public/**/*.*'],
//       port: 9000,
//     });
//   },
// );

// gulp.task(
//   'browser-sync',
//   gulp.series('nodemon', () => {
//     browserSync.init(null, {
//       proxy: 'http://localhost:7000',
//       files: ['public/**/*.*'],
//       port: 9000,
//     });
//   }),
// );

// gulp.task('serve', gulp.series('browser-sync', () => {}));

/*
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], () => {});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
    files: ['src/**  /*.*'],
    browser: 'google chrome',
    port: 3456,
  });
});

gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: 'index.js',
  }).on('start', () => {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
*/
