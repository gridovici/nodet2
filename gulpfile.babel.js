import { series, watch } from 'gulp';
import nodemon from 'gulp-nodemon';
// import browserSync from 'browser-sync';

const browserSync = require('browser-sync').create();

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
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ],
    watch: ['src/index.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      console.log('STRATING>...');
      browserSync.init({
        proxy: 'http://localhost:3456',
        files: ['src/**/*.js', 'src/**/*.hbs', 'src/assets/scss/**/*.scss'],
        browser: 'google chrome',
        port: 7000,
        notify: true,
        reloadOnRestart: true
        // open: false
      });
    }
  })
  // .on('restart', () => {
  //   setTimeout(() => {
  //     console.log('WATCHING...', Date.now());
  //     browserSync.reload();
  //   }, BROWSER_SYNC_RELOAD_DELAY);
  // });
}

const watchTask = () => {
  watch(paths.scripts.src, browserSyncReload);
  console.log('WATCHING...');
};

// const dev = gulp.series(clean, scripts, serve, watch);
const dev = series(startNodemon);
export default dev;

// gulp.task('serve', gulp.series('browser-sync', () => {}));
