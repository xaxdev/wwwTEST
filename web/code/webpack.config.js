const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'plugins/http/src'),
  public: path.join(__dirname, 'plugins/http/public/js')
}

module.exports =  {
  entry: {
    app: PATHS.src,
    // vendors: ['react']  // แยก react ออกมาเป็น vendors
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: PATHS.public,
    publicPath: '/js/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        include: [ path.resolve(__dirname, 'plugins/http/src') ],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
        // loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.scss$/, // ถ้าเจอไฟล์ .scss
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] // ให้ load ไฟล์นั้นด้วย style-loader, css-loader และ sass-loader
      },
      { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: require.resolve('file-loader') + '?name=[path][name].[ext]' },
    ]
  },
  // plugins: [
  //   // เซฟ vendors ออกมาเป็นไฟล์ vendors.js
  //   new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity)
  // ]
};
