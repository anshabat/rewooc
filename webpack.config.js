const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
  },
  stats: {
    entrypoints: false,
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'fonts/', name: '[name].[ext]' },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    // TODO fix autoprefixer 10-th version compile bug
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyPlugin({ patterns: [{ from: './src/.htaccess' }] }),
    new Dotenv(),
    new BundleAnalyzerPlugin({
      analyzerPort: 8887,
      openAnalyzer: false
    }),
  ],
  resolve: {
    modules: [ path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
}
