/* eslint-disable import/no-extraneous-dependencies */
import { series } from 'gulp';
import lint from './gulpLint';
import startNodemon from './gulpNodemon';

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
