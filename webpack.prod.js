const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  // Show warning in console if the bundle size is bigger than
  performance: {
    maxEntrypointSize: 512000, // 512kb .js
    maxAssetSize: 512000, // 512kb
  },
});
