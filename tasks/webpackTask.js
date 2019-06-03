/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import webpack from 'webpack-stream';
import config from '../webpack.server.config.babel';

gulp.task('default', () => {
  return gulp.src('src/server/srcServer.js')
    .pipe(config)
    // .pipe(webpack({
      // Any configuration options...
    // }))
    .pipe(gulp.dest('dist/'));
});
