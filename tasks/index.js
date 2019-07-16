/* eslint-disable import/no-extraneous-dependencies */
import { series } from 'gulp';
import startNodemon from './gulpNodemon';
import lint from './gulpLint';

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

const dev = series(lint, startNodemon);
export default dev;
