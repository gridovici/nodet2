import { series, src } from 'gulp';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import browserSyncModule from 'browser-sync';

const browserSync = browserSyncModule.create();
const paths = {
  src: 'src/**/*',
  js: 'src/**/*.js',
  hbs: 'src/views/**/*.hbs',
  dest: 'dist/scripts/'
};

// BrowserSync Reload
// function browserSyncReload(done) {
//   browserSync.reload({
//     stream: true
//   });
//   done();
// }

function lint() {
  return src([paths.js])
    .pipe(eslint())
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
}

// Clean assets
// function clean() {
//   return del(["./_site/assets/"]);
// }

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
        // files: ['src/**/*.js', 'src/**/*.hbs', 'src/assets/scss/**/*.scss'],
        files: ['src/**/*'],
        browser: 'google chrome',
        port: 7000,
        notify: true,
        reloadOnRestart: true
        // open: false
      });
    }
  });
}

// const watchTask = () => {
//   // watch(paths.src, browserSyncReload);
//   // watch(paths.hbs, browserSyncReload);
//   watch(paths.src, browserSyncReload);
//   console.log('WATCH TASK...');
// };

// const dev = gulp.series(clean, scripts, serve, watch);
const dev = series(lint, startNodemon);
export default dev;

// gulp.task('serve', gulp.series('browser-sync', () => {}));
