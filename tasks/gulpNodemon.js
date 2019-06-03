/* eslint-disable import/no-extraneous-dependencies */
import nodemon from 'gulp-nodemon';
import browserSyncModule from 'browser-sync';

const browserSync = browserSyncModule.create();

function startNodemon(cb) {
  let started = false;

  return nodemon({
    // script: './src/srcServer.js',
    script: './src/serve.js',
    ignore: [
      // 'gulpfile.js',
      'node_modules/'
    ],
    watch: ['src/index.js', 'src/serve.js']
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

export default startNodemon;
