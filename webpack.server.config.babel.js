import path from 'path';
import  webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

module.exports = (env, argv) => {
  // mode flag from CLI invocation in package.json script
  const SERVER_PATH = (argv.mode === 'production')
    ? './src/server/srcServer-prod.js'
    : './src/server/srcServer-dev.js';

  return ({
    entry: {
      // server: './src/server/srcServer.js'
      server: SERVER_PATH
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: 'server.js'
    // filename: '[name].js'
    },
    target: 'node',
    node: {
    // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
        // Transpiles ES6-8 into ES5
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  });
};
