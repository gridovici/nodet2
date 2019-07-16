/* eslint-disable import/no-extraneous-dependencies */
import nodemon from 'gulp-nodemon';
import browserSyncModule from 'browser-sync';
import chalk from 'chalk';

const browserSync = browserSyncModule.create();

function startNodemon(cb) {
  let started = false;

  return nodemon({
    // script: './src/srcServer.js',
    script: './src/server/server.js',
    // script: './dist/server/server.js',
    // tasks: ['compile'], // compile synchronously onChange
    // tasks: ['compile'],
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ],
    // watch: ['src/index.js']
    watch: ['src/server/**/*.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      console.log(chalk.greenBright('STRATING>...'));
      browserSync.init({
        // proxy: 'http://localhost:7777',
        // proxy: 'http://localhost:3456',
        // files: ['src/**/*.js', 'src/**/*.hbs', 'src/assets/scss/**/*.scss'],
        // files: ['dist/server/**/*'],
        files: ['src/server/**/*'],
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
