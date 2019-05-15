/* eslint-disable prefer-arrow-callback */
import { series, watch } from 'gulp';
import browserSync from 'browser-sync';
// var browserSync = require('browser-sync').create();
import nodemon from 'gulp-nodemon';

const paths = {
  scripts: {
    src: 'src/**/*',
    js: 'src/**/*.js',
    dest: 'dist/scripts/'
  }
};

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload({
    stream: true
  });
  done();
}

// Clean assets
// function clean() {
//   return del(["./_site/assets/"]);
// }
const BROWSER_SYNC_RELOAD_DELAY = 1000;

function startNodemon(cb) {
  let started = false;

  return nodemon({
    script: 'src/index.js',
    watch: ['src/index.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      browserSync.init({
        proxy: 'http://localhost:3456',
        browser: 'google chrome',
        port: 7000,
        open: false
      });
    }
  }).on('restart', function onRestart() {
    setTimeout(() => {
      console.log('WATCHING...');
      browserSync.reload();
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
}

const watchTask = () => {
  watch(paths.scripts.src, browserSyncReload);
  console.log('WATCHING...');
};

// const dev = gulp.series(clean, scripts, serve, watch);
const dev = series(startNodemon);
export default dev;

// gulp.task('serve', gulp.series('browser-sync', () => {}));
