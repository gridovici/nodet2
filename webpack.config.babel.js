import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: {
    server: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    // filename: 'server.js'
    // filename: '[name].js'
    filename: 'index.js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        // test: /\.html$/,
        // use: [{loader: "html-loader"}]
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [
            path.join(__dirname, 'src', 'views', 'partials')
          ]
        }
      },
      {
        // test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
          // {
            // loader: 'stylus-loader',
            // options: {
            //   use: [stylus_plugin()],
            // },
          // },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     handlebarsLoader: {}
    //   }
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.hbs')
      //       filename: "./index.html",
      //       // excludeChunks will exclude a file called server which we
      //       // don’t want to be included into our HTML file, since that
      //       // is the webserver, and not needed in the app itself
      //       excludeChunks: [ 'server' ]
    })
  ]
};
