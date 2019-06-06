import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
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
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
  //   // new webpack.LoaderOptionsPlugin({
  //   //   options: {
  //   //     handlebarsLoader: {}
  //   //   }
  //   // }),
    // new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'src', 'index.hbs'),
  //     // template: '!!handlebars!src/index.hbs',
  //     //       filename: "./index.html",
  //     // excludeChunks will exclude a file called server which we
  //     // don’t want to be included into our HTML file, since that
  //     // is the webserver, and not needed in the app itself
      // excludeChunks: ['server']
    // })
    // new HtmlWebpackPlugin({
    //   // For details on `!!` see https://webpack.github.io/docs/loaders.html#loader-order
    //   // template: '!!handlebars!src/views/index.hbs'
    //   template: path.join(__dirname, 'src', 'views', 'index.hbs'),
    //   filename: 'index.html'
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'src', 'views', 'home.hbs'),
    //   filename: 'home.html'
    // })
  ]
};
