/* eslint-disable import/no-extraneous-dependencies */
import { series } from 'gulp';
import startNodemon from './gulpNodemon';
import lint from './gulpLint';

const dev = series(lint, startNodemon);
export default dev;
