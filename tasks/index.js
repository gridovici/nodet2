/* eslint-disable import/no-extraneous-dependencies */
// import { series } from 'gulp';
// import startNodemon from './gulpNodemon';

// BrowserSync Reload
// function browserSyncReload(done) {
//   browserSync.reload({
//     stream: true
//   });
//   done();
// }

// Clean assets
// function clean() {
//   return del(["./_site/assets/"]);
// }

/* eslint-disable import/no-extraneous-dependencies */
import nodemon from 'gulp-nodemon';
import browserSyncModule from 'browser-sync';
import gulp, { series } from 'gulp';
import babel from 'gulp-babel';
import chalk from 'chalk';
import lint from './gulpLint';

const browserSync = browserSyncModule.create();

gulp.task('compile', () => {
  const stream = gulp.src('./src/server/**/*.js') // your ES2015 code
  //  .pipe(cache.filter()) // remember files
    .pipe(babel({ presets: ['@babel/env'] })) // compile new ones
  //  .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./dist/server')); // write them
  return stream; // important for gulp-nodemon to wait for completion
});

function compile() {
  const stream = gulp.src('./src/server/**/*.js') // your ES2015 code
  //  .pipe(cache.filter()) // remember files
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    })) // compile new ones
  //  .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./dist/server')); // write them
  return stream; // important for gulp-nodemon to wait for completion
}

function startNodemon(cb) {
  let started = false;

  return nodemon({
    // script: './src/srcServer.js',
    // script: './src/server/server.js',
    script: './dist/server/server.js',
    // tasks: ['compile'], // compile synchronously onChange
    tasks: ['compile'],
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ]
    // watch: ['src/index.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      console.log(chalk.greenBright('STRATING>...'));
      browserSync.init({
        // proxy: 'http://localhost:7777',
        // proxy: 'http://localhost:3456',
        // files: ['src/**/*.js', 'src/**/*.hbs', 'src/assets/scss/**/*.scss'],
        files: ['dist/server/**/*'],
        // files: ['src/server/**/*'],
        // files: ['src/**/*'],
        browser: 'google chrome',
        port: 8080,
        // port: 3456,
        notify: true,
        reloadOnRestart: true
        // open: false
      });
    }
  });
}

const dev = series(lint, compile, startNodemon);
export default dev;
