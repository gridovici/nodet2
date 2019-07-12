/* eslint-disable import/no-extraneous-dependencies */
import nodemon from 'gulp-nodemon';
import browserSyncModule from 'browser-sync';
import gulp from 'gulp';
import babel from 'gulp-babel';

const browserSync = browserSyncModule.create();

gulp.task('compile', () => {
  const stream = gulp.src('./src/server/**/*.js') // your ES2015 code
  //  .pipe(cache.filter()) // remember files
    .pipe(babel({ presets: ['@babel/env'] })) // compile new ones
  //  .pipe(cache.cache()) // cache them
    .pipe(gulp.dest('./dist/server')); // write them
  return stream; // important for gulp-nodemon to wait for completion
});

function startNodemon(cb) {
  let started = false;

  return nodemon({
    // script: './src/srcServer.js',
    // script: './src/server/server.js',
    script: './dist/server/server.js',
    tasks: ['compile'], // compile synchronously onChange
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ]
    // env: {
    //   NODE_ENV: 'dev',
    //   PORT: 9080
    // }
    // watch: ['src/index.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      console.log('STRATING>...');
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

export default startNodemon;
