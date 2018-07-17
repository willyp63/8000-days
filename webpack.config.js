const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: {
    app: __dirname + '/src/js/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      },
      {
        test: /\.woff$/,
        use: {
          loader: 'file-loader',
          options: { name: 'fonts/[name].[ext]' },
        },
      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader',
          options: { name: 'imgs/[name].[ext]' },
        },
      },
      {
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: { name: 'video/[name].[ext]' },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'source-map',
};
