const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: common.output.path,
      publicPath: '/',
      watch: true,
    },
    hot: false,
    // open: true,
    host: 'localhost',
    port: 3000,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },
});
