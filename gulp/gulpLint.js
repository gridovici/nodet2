/* eslint-disable import/no-extraneous-dependencies */
import { src } from 'gulp';
import eslint from 'gulp-eslint';

const paths = {
  src: 'src/**/*',
  js: 'src/**/*.js',
  hbs: 'src/views/**/*.hbs',
  dest: 'dist/scripts/'
};

function lint() {
  return src([paths.js])
    .pipe(eslint())
    .pipe(eslint.format());
  // .pipe(eslint.failAfterError());
}

export default lint;
