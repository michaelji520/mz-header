const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: path.resolve(__dirname, './src/popup/popup.js'),
  },
  output: {
    filename: 'js/[name]_[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'less-loader',options: {lessOptions: {strictMath: true}}}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // chrome popup
      title: 'popup',
      filename: 'popup.html',
      favicon: path.resolve(__dirname, './src/assets/icon.ico'),
      template: path.resolve(__dirname, './src/popup/popup.html'),
      chunks: ['popup'],
      inject: true,
      minify: { collapseWhitespace: true }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/manifest.json'), to: path.resolve(__dirname, './dist/manifest.json') },
        { from: path.resolve(__dirname, './src/assets/'), to: path.resolve(__dirname, './dist') },
      ]
    }),
    new MiniCssExtractPlugin({filename: 'css/[name]_[contenthash].css'}),
    new CleanWebpackPlugin()
  ]
}
