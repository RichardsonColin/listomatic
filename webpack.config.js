const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
      app: path.join(__dirname, 'src', 'index.tsx')
  },
  devtool: 'source-map',
  target: 'web',
  resolve: {
      extensions: ['.ts', '.tsx', '.js']
  },
  module: {
      rules: [
          { test: /\.tsx?$/, loader: 'ts-loader', exclude: '/node_modules/' },
          { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      ],
  },
  output: {
      globalObject: 'this',
      filename: '[name].js',
      path: path.resolve(__dirname, 'server/build/')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public/favicon.ico') },
        { from: path.resolve(__dirname, 'public/robots.txt') },
        { from: path.resolve(__dirname, 'public/manifest.json') },
        { from: path.resolve(__dirname, 'public/*.png'), flatten: true },
        { from: path.resolve(__dirname, 'public/.well-known'), to: '.well-known' },
      ],
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        hash: true
    })
  ]
}