/* eslint-disable import/no-extraneous-dependencies */
import nodemon from 'gulp-nodemon';
import browserSyncModule from 'browser-sync';
import chalk from 'chalk';

const browserSync = browserSyncModule.create();

function startNodemon(cb) {
  let started = false;

  return nodemon({
    script: './src/server/server.js',
    ignore: [
      'node_modules/'
    ],
    watch: ['src/server/**/*.js']
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
      console.log(chalk.greenBright('STRATING>...'));
      browserSync.init({
        files: ['src/server/**/*'],
        browser: 'google chrome',
        port: 8080,
        notify: true,
        reloadOnRestart: true
      });
    }
  });
}

export default startNodemon;
