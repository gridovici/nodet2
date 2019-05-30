/* eslint-disable import/no-extraneous-dependencies */
import { series } from 'gulp';
import lint from './gulpLint';
import { scripts } from './webpack';
import server from './server';

export const dev = series(lint, server);
export const build = series(scripts);

export default dev;

// import { series } from 'gulp';
// import lint from './gulpLint';
// import startNodemon from './gulpNodemon';

// // BrowserSync Reload
// // function browserSyncReload(done) {
// //   browserSync.reload({
// //     stream: true
// //   });
// //   done();
// // }

// // Clean assets
// // function clean() {
// //   return del(["./_site/assets/"]);
// // }

// const dev = series(lint, startNodemon);
// export default dev;
