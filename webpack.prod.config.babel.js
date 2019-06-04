/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

module.exports = {
  entry: {
    // main.js to be in build folder as key main
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    // TODO: check
    // filename: '[name].js'
    filename: 'index.js'
  },
  target: 'web',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
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
        // Loads images into CSS and Javascript files
        test: /\.jpg$/,
        use: [{ loader: 'url-loader' }]
      },
      // TODO: move to styl
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        // test: /\.css$/,
        // use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        // test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        test: /\.(styl|css)$/,
        use: [
          // Mini CSS Extract Plugin to externalise the CSS when doing a production build
          // MiniCssExtractPlugin.loader,
          // style-loader to be appended to the DOM
          'style-loader',
          // css-loader to process @import(), url()
          'css-loader',
          // convert styl to css
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
      template: path.join(__dirname, 'src', 'index.hbs'),
      //       filename: "./index.html",
      // excludeChunks will exclude a file called server which we
      // don’t want to be included into our HTML file, since that
      // is the webserver, and not needed in the app itself
      excludeChunks: ['server']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
