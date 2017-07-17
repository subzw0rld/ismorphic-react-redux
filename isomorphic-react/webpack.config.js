var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry:  [
      'webpack-dev-server/client?http://127.0.0.1:8080/',
      'webpack/hot/only-dev-server',
      './src/client/index.js'
    ],
    // output: {
    //     path: BUILD_DIR,
    //     filename: 'app.bundle.js',
    //     publicPath: '/src'
    // },

    devtool: 'source-map',


    module: {
        loaders: [
          {
            test: /\.js?/,
            include: APP_DIR,
            loaders: ["react-hot-loader", "babel-loader"]
          },
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css-loader!sass-loader')
          }
        ]
    },

    devtool: 'inline-source-map',
    devServer: {
      proxy: {
        '*': 'http://127.0.0.1:' + (process.env.PORT || 3000)
      },
      host: '127.0.0.1'
    },

    plugins: [new ExtractTextPlugin('./src/assets/css/style.css', {
            allChunks: true})
          ]
};

module.exports = config;
